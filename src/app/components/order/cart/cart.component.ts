import { Component, OnInit } from '@angular/core';
import { Product } from '../../../interface/interface';
import { CommonModule, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, NgForOf],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  productos= [
    {
      nombre: 'Fideos wook',
      precio: 8.99,
      cantidad: 1,
      alergenos: 'Sulfitos / Lácteos / Gluten',
      imagen: 'https://media.istockphoto.com/id/453780395/es/foto/chow-mein-de-pollo.jpg?s=612x612&w=0&k=20&c=SZhR_09oLtHG35Sq8571h6xMze8lJD2tOhlg7O-JZpo=',
    },
    {
      nombre: 'Fideos wook',
      precio: 8.99,
      cantidad: 1,
      alergenos: 'Sulfitos / Lácteos / Gluten',
      imagen: 'https://media.istockphoto.com/id/453780395/es/foto/chow-mein-de-pollo.jpg?s=612x612&w=0&k=20&c=SZhR_09oLtHG35Sq8571h6xMze8lJD2tOhlg7O-JZpo=',
    },
    {
      nombre: 'Fideos wook',
      precio: 8.99,
      cantidad: 1,
      alergenos: 'Sulfitos / Lácteos / Gluten',
      imagen: 'https://media.istockphoto.com/id/453780395/es/foto/chow-mein-de-pollo.jpg?s=612x612&w=0&k=20&c=SZhR_09oLtHG35Sq8571h6xMze8lJD2tOhlg7O-JZpo=',
    },
    {
      nombre: 'Fideos wook',
      precio: 8.99,
      cantidad: 1,
      alergenos: 'Sulfitos / Lácteos / Gluten',
      imagen: 'https://media.istockphoto.com/id/453780395/es/foto/chow-mein-de-pollo.jpg?s=612x612&w=0&k=20&c=SZhR_09oLtHG35Sq8571h6xMze8lJD2tOhlg7O-JZpo=',
    }
  ];

  descuento: number = 0;
  promoCode: string = '';
  subtotal: number = 0;
  total: number = 0;

  ngOnInit() {
    this.calcularTotales();
  }

  calcularTotales() {
    this.subtotal = this.productos.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    this.calcularDescuento();
    this.total = parseFloat((this.subtotal - this.descuento).toFixed(2));
  }

  calcularDescuento() {
    if (this.promoCode === 'DESCUENTO10') {
      this.descuento = parseFloat((this.subtotal * 0.10).toFixed(2));
    } else if (this.promoCode === 'DESCUENTO5') {
      this.descuento = parseFloat((this.subtotal * 0.05).toFixed(2));
    } else {
      this.descuento = 0;
    }
  }

  cambiarCantidad(producto: any, cantidad: number) {
    if (cantidad < 0) {
      producto.cantidad = 0;
    } else {
      producto.cantidad = cantidad;
    }
    this.calcularTotales();
  }

  aplicarPromo() {
    this.calcularDescuento();
    this.calcularTotales();
  }
}
