import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { Order } from "../models/Order";
import { apiUrl, disUrl, repoUrl } from "../../environments/environment";
import { catchError, map, tap } from "rxjs/operators";
import { Discount } from "../models/discount";

import { ProductListResponse } from "../response/ProductListResponse";
import { ProductInfo } from "../models/productInfo";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  private orderUrl = `${apiUrl}/order`;
  
  private reportUrl = `${repoUrl}/report1`;
  private categoryUrl = `${apiUrl}/category`;

  
  constructor(private http: HttpClient) {}

  getPage(page = 1, size = 10): Observable<any> {
    const url = `${this.orderUrl}?page=${page}&size=${size}`;
    return this.http.get(url);
  }

  show(id: string): Observable<Order> {
    const url = `${this.orderUrl}/${id}`;
    return this.http.get<Order>(url).pipe(catchError(() => of(null)));
  }

  cancel(id: number): Observable<Order> {
    const url = `${this.orderUrl}/cancel/${id}`;
    return this.http.patch<Order>(url, null).pipe(catchError(() => of(null)));
  }

  finish(id: number): Observable<Order> {
    const url = `${this.orderUrl}/finish/${id}`;
    return this.http.patch<Order>(url, null).pipe(catchError(() => of(null)));
  }

  getCouponPage(page = 1, size = 10): Observable<any> {
    const url = `${disUrl}/coupon/list?page=${page}&size=${size}`;
    return this.http.get(url);
  }

  getCoupon(): Observable<any> {
    const url = `${disUrl}/coupon/alllist`;
    return this.http.get(url);
  }

  addCoupon(code: string): Observable<Discount> {
    const url = `${disUrl}/add/coupon/${code}`;
    return this.http.post<Discount>(url, null);
  }

  deleteCoupon(code: string): Observable<any> {
    const url = `${disUrl}/delete/coupon/${code}`;
    return this.http.delete(url);
  }
  getReport(): Observable<ProductInfo[]> {
    return this.http.get<ProductListResponse>(this.reportUrl).pipe(
      tap((_) => {}),
      map((cart) => cart.productList),
      catchError((_) => of([]))
    );
  }
 

}
