import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/User";
import { UserService } from "src/app/services/user.service";

import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-adminuser",
  templateUrl: "./adminuser.component.html",
  styleUrls: ["./adminuser.component.css"],
})
export class AdminuserComponent implements OnInit {
  search: string;
  searchText: string;
  page: any;
  querySub: Subscription;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.querySub = this.route.queryParams.subscribe(() => {
      this.getUserList();
    });
  }

  getUserList() {
    let nextPage = 1;
    let size = 10;
    if (this.route.snapshot.queryParamMap.get("page")) {
      nextPage = +this.route.snapshot.queryParamMap.get("page");
      size = +this.route.snapshot.queryParamMap.get("size");
    }
    this.userService
      .getPage(nextPage, size)
      .subscribe((page) => (this.page = page));
  }

  addAdmin(email: string) {
    this.userService.addAdmin(email).subscribe(() => this.getUserList());
  }

  removeAdmin(email: string) {
    this.userService.removeAdmin(email).subscribe(() => this.getUserList());
  }

  removeUser(email: string) {
    this.userService.removeUser(email).subscribe(() => this.getUserList());
  }
}
