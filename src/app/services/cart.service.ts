import { Injectable } from '@angular/core';
import {environment} from "../../enviroments/enviroment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = `${environment.backendUrl}api/`;

  constructor(private http: HttpClient) {}

  getCart(): Observable<any> {
    return this.http.get(`${this.baseUrl}cart`);
  }

  updateItemQuantity(cartItemId: number, quantity: number) {
    const body = {
      cartItemId,
      quantity
    };
    return this.http.put(`${this.baseUrl}cart-item/update`, body);
  }

  removeItem(itemId: number) {
    return this.http.delete(`${this.baseUrl}cart-item/${itemId}/remove`);
  }

  createOrderWithMesa(payload: { restaurantId: number, tableNumber: number }) {
    return this.http.post<any>('http://localhost:5001/tables/order', payload);
  }

  clearCart() {
    return this.http.put('http://localhost:5001/api/cart/clear', {});
  }






}
