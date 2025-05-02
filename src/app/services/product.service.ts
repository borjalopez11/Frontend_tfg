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

  // Método para obtener los productos
  getProducts(): Observable<Product[]> {
    const token = localStorage.getItem('token'); // Obtener token del almacenamiento local

    // Configurar los headers para incluir el token Bearer
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Realizar la llamada GET a la API y devolver la lista de productos
    return this.http.get<Product[]>(this.apiUrl, { headers });
  }
}
