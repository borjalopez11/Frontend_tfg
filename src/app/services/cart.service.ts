import { Injectable } from '@angular/core';
import {environment} from "../../enviroments/enviroment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = `${environment.backendUrl}api/cart`;

  constructor(private http: HttpClient) {}

  getCart(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  updateItemQuantity(cartItemId: number, quantity: number) {
    const body = {
      cartItemId,
      quantity
    };
    return this.http.put(`${this.baseUrl}-item/update`, body);
  }


  removeItem(itemId: number) {
    return this.http.delete(`${this.baseUrl}-item/${itemId}/remove`);
  }


}
