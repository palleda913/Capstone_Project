import { Component, Injectable, OnInit } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { JwtResponse } from "../../response/JwtResponse";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { CategoryType } from "../../enum/CategoryType";
import { ProductStatus } from "../../enum/ProductStatus";
import { Role } from "../../enum/Role";
import { ExcelService } from "../../services/excel.service";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root",
})
@Component({
  selector: "app-product.list",
  templateUrl: "./product.list.component.html",
  styleUrls: ["./product.list.component.css"],
})
export class ProductListComponent implements OnInit {
  search: string;
  searchText: string;
  Role = Role;
  currentUser: JwtResponse;
  page: any;
  CategoryType = CategoryType;
  ProductStatus = ProductStatus;
  querySub: Subscription;
  response: any;
  productInfo = [];
  data: any[];
  shortLink: string = "";
  loading: boolean = false;
  file: File = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private excelService: ExcelService,
    private router: Router
  ) {}

  ngOnInit() {
    this.querySub = this.route.queryParams.subscribe(() => {
      this.update();
    });
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

  getProds(page: number = 1, size: number = 10) {
    this.productService.getAllInPage(+page, +size).subscribe((page) => {
      console.log(page);
      this.page = page;
    });
  }

  remove(productId: any) {
    this.productService.delelte(productId).subscribe(() => {
      this.update();
    });
  }

  exportAsXLSX(): void {
    this.productService
      .getReport()
      .subscribe((response) => (this.productInfo = response));
    this.excelService.exportAsExcelFile(this.productInfo, "Report");
  }

  onChange(event: { target: { files: File[] } }) {
    this.file = event.target.files[0];
  }

  onUpload() {
    this.loading = !this.loading;
    this.productService.upload(this.file).subscribe((event: any) => {
      if (typeof event === "object") {
        this.shortLink = event.link;
        this.loading = false;
      }
    });
  }

  onSubmit() {
    this.router.navigate(["/email"]);
  }
}
