import { Component, OnInit } from "@angular/core";
import { OrderService } from "../../services/order.service";
import { Order } from "../../models/Order";
import { OrderStatus } from "../../enum/OrderStatus";
import { UserService } from "../../services/user.service";
import { JwtResponse } from "../../response/JwtResponse";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Role } from "../../enum/Role";
import { ExcelService } from "src/app/services/excel.service";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"],
})
export class OrderComponent implements OnInit {
  page: any;
  OrderStatus = OrderStatus;
  currentUser: JwtResponse;
  Role = Role;
  querySub: Subscription;

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private route: ActivatedRoute,
    private excelService: ExcelService

  ) {}

  
    search: string;
    searchText: string;
    response: any;
    order = [];
    data: any[];
    shortLink: string = "";
    loading: boolean = false;
    file: File = null;
  
  ngOnInit() {
    this.currentUser = this.userService.currentUserValue;
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
    this.orderService
      .getPage(nextPage, size)
      .subscribe((page) => (this.page = page));
  }

  cancel(order: Order) {
    this.orderService.cancel(order.orderId).subscribe((res) => {
      if (res) {
        order.orderStatus = res.orderStatus;
      }
    });
  }

  finish(order: Order) {
    this.orderService.finish(order.orderId).subscribe((res) => {
      if (res) {
        order.orderStatus = res.orderStatus;
      }
    });
  }

  exportAsXLSX(): void {
    this.orderService
      .getReport()
      .subscribe((response) => (this.order = response));
    this.excelService.exportAsExcelFile(this.order, "Report1");
  }
  
}
