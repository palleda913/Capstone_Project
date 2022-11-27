import { Component, OnDestroy, OnInit } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { JwtResponse } from "../../response/JwtResponse";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent implements OnInit, OnDestroy {
  title: string;
  price: string;
  search: string;
  searchText: string;
  page: any;

  private paramSub: Subscription;
  private querySub: Subscription;

  currentUser: JwtResponse;
  userSubscription: Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.userSubscription = this.userService.currentUser.subscribe(
      (user) => (this.currentUser = user)
    );
  }

  ngOnInit() {
    this.querySub = this.route.queryParams.subscribe(() => {
      this.update();
    });
    this.paramSub = this.route.params.subscribe(() => {
      this.update();
    });
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
    this.paramSub.unsubscribe();
  }

  update() {
    if (this.route.snapshot.queryParamMap.get("page")) {
      const currentPage = +this.route.snapshot.queryParamMap.get("page");
      const size = +this.route.snapshot.queryParamMap.get("size");
      this.getProds(currentPage, size);
    } else {
      this.getProds();
    }
  }

  getProds(page: number = 1, size: number = 9) {
    if (this.route.snapshot.url.length == 1) {
      this.productService.getAllInPage(+page, +size).subscribe((page) => {
        this.page = page;
        this.title = "Get Whatever You Want!";
      });
    } else {
      const type = this.route.snapshot.url[1].path;
      this.productService
        .getCategoryInPage(+type, page, size)
        .subscribe((categoryPage) => {
          this.title = categoryPage.category;
          this.page = categoryPage.page;
        });
    }
  }
}
