import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { UserService } from "../../services/user.service";
import { JwtResponse } from "../../response/JwtResponse";
import { ActivatedRoute } from "@angular/router";
import { ProductInfo } from "src/app/models/productInfo";
import { WishListService } from "src/app/services/wish-list.service";

@Component({
  selector: "app-wish-list",
  templateUrl: "./wish-list.component.html",
  styleUrls: ["./wish-list.component.css"],
})
export class WishListComponent implements OnInit {
  page: any;

  currentUser: JwtResponse;
  userSubscription: Subscription;
  querySub: Subscription;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private wishListService: WishListService
  ) {
    this.userSubscription = this.userService.currentUser.subscribe(
      (user) => (this.currentUser = user)
    );
  }

  ngOnInit() {
    this.querySub = this.route.queryParams.subscribe(() => {
      this.update();
    });
  }

  update() {
    let nextPage = 1;
    let size = 10;
    if (this.route.snapshot.queryParamMap.get("page")) {
      nextPage = +this.route.snapshot.queryParamMap.get("page");
      size = +this.route.snapshot.queryParamMap.get("size");
    }

    this.wishListService
      .getPage(nextPage, size)
      .subscribe((page) => (this.page = page));
  }

  handleRemoveFromWishList(productId: string) {
    this.wishListService.removeFromWishList(productId).subscribe(() => {
      this.update();
    });
  }
}
