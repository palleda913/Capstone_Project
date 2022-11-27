import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { ProductInfo } from "../models/productInfo";
import { apiUrl, repoUrl } from "../../environments/environment";
import { catchError, map, tap } from "rxjs/operators";
import { ProductListResponse } from "../response/ProductListResponse";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private productUrl = `${apiUrl}/product`;
  private reportUrl = `${repoUrl}/report`;
  private categoryUrl = `${apiUrl}/category`;

  constructor(private http: HttpClient) {}

  getAllInPage(page: number, size: number): Observable<any> {
    const url = `${this.productUrl}?page=${page}&size=${size}`;
    return this.http.get(url);
  }

  getCategoryInPage(
    categoryType: number,
    page: number,
    size: number
  ): Observable<any> {
    const url = `${this.categoryUrl}/${categoryType}?page=${page}&size=${size}`;
    return this.http.get(url);
  }

  getReport(): Observable<ProductInfo[]> {
    return this.http.get<ProductListResponse>(this.reportUrl).pipe(
      tap((_) => {}),
      map((cart) => cart.productList),
      catchError((_) => of([]))
    );
  }

  getDetail(id: String): Observable<ProductInfo> {
    const url = `${this.productUrl}/${id}`;
    return this.http.get<ProductInfo>(url).pipe(
      catchError(() => {
        return of(new ProductInfo());
      })
    );
  }

  update(productInfo: ProductInfo): Observable<ProductInfo> {
    const url = `${apiUrl}/seller/product/${productInfo.productId}/edit`;
    return this.http.put<ProductInfo>(url, productInfo);
  }

  create(productInfo: ProductInfo): Observable<ProductInfo> {
    const url = `${apiUrl}/seller/product/new`;
    return this.http.post<ProductInfo>(url, productInfo);
  }

  delelte(productId): Observable<any> {
    const url = `${apiUrl}/seller/product/${productId}/delete`;
    return this.http.delete(url);
  }

  upload(file: File): any {
    const formData = new FormData();
    formData.append("file", file, file.name);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8081/api/csv/upload", true);
    xhr.send(formData);
    return xhr;
  }
}
