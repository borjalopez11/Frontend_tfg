import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {CommonModule, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    CommonModule
  ],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css'
})
export class AdminOrdersComponent {
  orders: any[] = [];
  pendingOrders: any[] = [];
  completedOrders: any[] = [];


  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  loadOrders(): void {
    this.http.get<any>('http://localhost:5001/api/admin/restaurants/user', {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: (data) => {
        const orders = (data.orders || []).reverse();
        this.orders = orders;
        this.pendingOrders = orders.filter(
          (o: any) => o.orderStatus === 'PAGADO' || o.orderStatus === 'PREPARACION'
        );
        this.completedOrders = orders.filter(
          (o: any) => o.orderStatus === 'SERVIDO'
        );
      },
      error: () => {
        console.error('Error al cargar las órdenes');
      }
    });
  }

  updateOrderStatus(orderId: number, status: string): void {
    const url = `http://localhost:5001/api/admin/order/${orderId}/${status}`;
    this.http.put(url, {}, { headers: this.getAuthHeaders() }).subscribe({
      next: () => this.loadOrders(),
      error: () => console.error('Error al actualizar el estado de la orden')
    });
  }


}
