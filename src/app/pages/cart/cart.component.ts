import {
  AfterContentChecked,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { CartService } from "../../services/cart.service";
import { Subject, Subscription } from "rxjs";
import { UserService } from "../../services/user.service";
import { JwtResponse } from "../../response/JwtResponse";
import { ProductInOrder } from "../../models/ProductInOrder";
import { debounceTime, switchMap } from "rxjs/operators";
import { Router } from "@angular/router";
import { Role } from "../../enum/Role";
import { OrderService } from "src/app/services/order.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit, OnDestroy, AfterContentChecked {
  productInOrders = [];
  total = 0;
  selectedCoupon: string;
  currentUser: JwtResponse;
  userSubscription: Subscription;
  private updateTerms = new Subject<ProductInOrder>();
  sub: Subscription;
  coupon: any;

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private router: Router,
    private orderService: OrderService
  ) {
    this.userSubscription = this.userService.currentUser.subscribe(
      (user) => (this.currentUser = user)
    );
  }

  static validateCount(productInOrder) {
    const max = productInOrder.productStock;
    if (productInOrder.count > max) {
      productInOrder.count = max;
    } else if (productInOrder.count < 1) {
      productInOrder.count = 1;
    }
  }

  ngOnInit() {
    this.cartService.getCart().subscribe((prods) => {
      this.productInOrders = prods;
    });

    this.sub = this.updateTerms
      .pipe(
        debounceTime(300),
        switchMap((productInOrder: ProductInOrder) =>
          this.cartService.update(productInOrder)
        )
      )
      .subscribe();

    this.orderService.getCoupon().subscribe((prods) => {
      this.coupon = prods;
    });
  }

  ngOnDestroy() {
    if (!this.currentUser) {
      this.cartService.storeLocalCart();
    }
    this.userSubscription.unsubscribe();
  }

  ngAfterContentChecked() {
    this.total = this.productInOrders.reduce(
      (prev, cur) => prev + cur.count * cur.productPrice,
      0
    );
  }

  selected(val: any) {
    this.total = this.total - this.total * 0.2;
    console.log(this.total);
  }

  addOne(productInOrder) {
    productInOrder.count++;
    CartComponent.validateCount(productInOrder);
    if (this.currentUser) {
      this.updateTerms.next(productInOrder);
    }
  }

  minusOne(productInOrder) {
    productInOrder.count--;
    CartComponent.validateCount(productInOrder);
    if (this.currentUser) {
      this.updateTerms.next(productInOrder);
    }
  }

  onChange(productInOrder) {
    CartComponent.validateCount(productInOrder);
    if (this.currentUser) {
      this.updateTerms.next(productInOrder);
    }
  }

  remove(productInOrder: ProductInOrder) {
    this.cartService.remove(productInOrder).subscribe(() => {
      this.productInOrders = this.productInOrders.filter(
        (e) => e.productId !== productInOrder.productId
      );
    });
  }

  checkout() {
    if (!this.currentUser) {
      this.router.navigate(["/login"], {
        queryParams: { returnUrl: this.router.url },
      });
    } else if (this.currentUser.role !== Role.Customer) {
      this.router.navigate(["/seller"]);
    } else {
      this.cartService.checkout().subscribe(() => {
        this.productInOrders = [];
      });
      this.router.navigate(["/"]);
    }
  }

  getCoupon() {
    this.orderService.getCoupon().subscribe((prods) => {
      this.coupon = prods;
    });
  }
}
