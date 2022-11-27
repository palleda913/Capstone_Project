import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { apiUrl } from "../../environments/environment";
import { Item } from "../models/Item";
import { BehaviorSubject, Observable, of } from "rxjs";
import { JwtResponse } from "../response/JwtResponse";
import { UserService } from "./user.service";
import { WishList } from "../models/wish-list";

@Injectable({
  providedIn: "root",
})
export class WishListService {
  private wishListUrl = `${apiUrl}/wishlist`;

  private itemsSubject: BehaviorSubject<Item[]>;
  private totalSubject: BehaviorSubject<number>;
  public items: Observable<Item[]>;
  public total: Observable<number>;
  private currentUser: JwtResponse;

  constructor(private http: HttpClient, private userService: UserService) {
    this.itemsSubject = new BehaviorSubject<Item[]>(null);
    this.items = this.itemsSubject.asObservable();
    this.totalSubject = new BehaviorSubject<number>(null);
    this.total = this.totalSubject.asObservable();
    this.userService.currentUser.subscribe((user) => (this.currentUser = user));
  }

  getPage(page = 1, size = 10): Observable<any> {
    const url = this.wishListUrl + "/list?page=" + page + "&size=" + size;
    return this.http.get(url);
  }

  addToWishList(productId): Observable<WishList> {
    const url = this.wishListUrl + "/add/" + productId;
    if (this.currentUser) {
      if (productId) {
        return this.http.post<WishList>(url, null);
      }
    }
  }

  removeFromWishList(productId: string): Observable<Boolean> {
    const url = this.wishListUrl + "/delete/" + productId;
    if (this.currentUser) {
      return this.http.delete<Boolean>(url);
    } else {
      return of(false);
    }
  }
}
