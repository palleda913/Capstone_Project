import { Component, OnInit } from "@angular/core";
import { ProductInfo } from "../../models/productInfo";
import { ProductService } from "../../services/product.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-product-edit",
  templateUrl: "./product-edit.component.html",
  styleUrls: ["./product-edit.component.css"],
})
export class ProductEditComponent implements OnInit {
  product = new ProductInfo();
  productId: string;
  isEdit = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get("id");
    if (this.productId) {
      this.isEdit = true;
      this.productService
        .getDetail(this.productId)
        .subscribe((prod) => (this.product = prod));
    }
  }

  onSubmit() {
    if (this.productId) {
      this.update();
    } else {
      this.add();
    }
  }

  update() {
    this.productService.update(this.product).subscribe(() => {
      this.router.navigate(["/seller"]);
    });
  }

  add() {
    this.productService.create(this.product).subscribe(() => {
      this.router.navigate(["/seller"]);
    });
  }
}
