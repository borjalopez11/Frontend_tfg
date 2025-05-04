import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../interface/interface";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5001/api/food/restaurant/2'; // Endpoint

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    const token = localStorage.getItem('token'); // Obtener token del almacenamiento local

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Product[]>(this.apiUrl, { headers });
  }
}
