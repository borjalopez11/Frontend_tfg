import { Component, OnInit } from '@angular/core';
import { Product } from '../../../interface/interface';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CartService} from "../../../services/cart.service";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  productos: any[] = [];
  descuento: number = 0;
  promoCode: string = '';
  subtotal: number = 0;
  total: number = 0;
  mesaNumero: number | null = null;


  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCart();
    const mesa = localStorage.getItem('mesaNumero');
    this.mesaNumero = mesa ? +mesa : null;
  }

  loadCart() {
    this.cartService.getCart().subscribe({
      next: (data) => {
        if (!data || !data.item) {
          console.warn("El carrito está vacío o la estructura no es la esperada:", data);
          this.productos = [];
          return;
        }

        this.productos = data.item.map((item: any) => ({
          id: item.id,
          nombre: item.food.name,
          descripcion: item.food.description,
          precio: item.totalPrice / item.quantity,
          cantidad: item.quantity,
          imagen: item.food.image ? `http://localhost:5001/uploads/${item.food.image}` : 'assets/imgNotFound.png',
        }));

        this.calcularTotales();
      },
      error: (err) => {
        console.error("Error al cargar el carrito:", err);
      }
    });
  }

  eliminarProducto(itemId: number) {
    this.cartService.removeItem(itemId).subscribe({
      next: () => {
        this.productos = this.productos.filter(p => p.id !== itemId);
        this.calcularTotales();
      },
      error: (err) => {
        console.error('Error al eliminar el producto del carrito:', err);
      }
    });
  }

  cambiarCantidad(producto: any, cantidad: number) {
    if (cantidad < 1) return;

    producto.cantidad = cantidad;
    producto.totalPrice = producto.precio * cantidad;

    this.calcularTotales();

    this.cartService.updateItemQuantity(producto.id, cantidad).subscribe({
      error: (err) => {
        console.error("Error al actualizar cantidad:", err);
      }
    }
    );
  }

  calcularTotales() {
    this.subtotal = this.productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    //this.calcularDescuento();
    this.total = parseFloat((this.subtotal - this.descuento).toFixed(2));
  }

  /*calcularDescuento() {
    if (this.promoCode === 'DESCUENTO10') {
      this.descuento = parseFloat((this.subtotal * 0.10).toFixed(2));
    } else if (this.promoCode === 'DESCUENTO5') {
      this.descuento = parseFloat((this.subtotal * 0.05).toFixed(2));
    } else {
      this.descuento = 0;
    }
  }

  aplicarPromo() {
    this.calcularDescuento();
    this.calcularTotales();
  }*/

  procederAlPago() {
    const restaurantId = 1;
    const mesaNumero = localStorage.getItem('mesaNumero');

    if (!mesaNumero) {
      console.error('No hay número de mesa en localStorage');
      return;
    }

    const payload = {
      restaurantId: restaurantId,
      tableNumber: +mesaNumero
    };

    this.cartService.createOrderWithMesa(payload).subscribe({
      next: (response) => {
        if (response.payment_url) {
          window.location.href = response.payment_url; // Solo redirige
        }
        else {
          console.error('No se recibió una URL de pago válida');
        }
      },
      error: (err) => {
        console.error('Error al crear la orden:', err);
      }
    });
  }

}
