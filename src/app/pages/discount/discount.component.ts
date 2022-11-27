import { Component, OnInit } from "@angular/core";
import { OrderService } from "src/app/services/order.service";
import { Subscription } from "rxjs";
import { Discount } from "src/app/models/discount";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-discount",
  templateUrl: "./discount.component.html",
  styleUrls: ["./discount.component.css"],
})
export class DiscountComponent implements OnInit {
  price: string;
  search: string;
  searchText: string;
  page: any;
  querySub: Subscription;
  coupon: any;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.querySub = this.route.queryParams.subscribe(() => {
      this.getCouponList();
    });
  }

  getCouponList() {
    let nextPage = 1;
    let size = 10;
    if (this.route.snapshot.queryParamMap.get("page")) {
      nextPage = +this.route.snapshot.queryParamMap.get("page");
      size = +this.route.snapshot.queryParamMap.get("size");
    }
    this.orderService
      .getCouponPage(nextPage, size)
      .subscribe((page) => (this.page = page));
  }

  addCoupon(code: string) {
    this.orderService.addCoupon(code).subscribe(() => this.getCouponList());
  }

  deleteCoupon(code: string) {
    this.orderService.deleteCoupon(code).subscribe(() => this.getCouponList());
  }
}
