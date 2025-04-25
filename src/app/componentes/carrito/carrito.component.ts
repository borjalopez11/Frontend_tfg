import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgForOf } from "@angular/common";

interface Producto {
  nombre: string;
  precio: number;
  cantidad: number;
  alergenos: string;
  imagen: string;
}

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  productos: Producto[] = [
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

  descuento: number = 0; // Descuento dinámico basado en el código
  promoCode: string = '';
  subtotal: number = 0;
  total: number = 0;

  ngOnInit() {
    this.calcularTotales();
  }

  // Calcular el subtotal y el total con descuento
  calcularTotales() {
    this.subtotal = this.productos.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    this.calcularDescuento();
    this.total = parseFloat((this.subtotal - this.descuento).toFixed(2));
  }

  // Calcular el descuento según el código promocional
  calcularDescuento() {
    if (this.promoCode === 'DESCUENTO10') {
      // Aplicar 10% de descuento sobre el subtotal
      this.descuento = parseFloat((this.subtotal * 0.10).toFixed(2));
    } else if (this.promoCode === 'DESCUENTO5') {
      // Aplicar 5% de descuento sobre el subtotal
      this.descuento = parseFloat((this.subtotal * 0.05).toFixed(2));
    } else {
      // Si no hay código, no hay descuento
      this.descuento = 0;
    }
  }

  // Cambiar la cantidad de un producto
  cambiarCantidad(producto: Producto, cantidad: number) {
    // Asegurarse de que la cantidad no sea menor que 1
    if (cantidad < 0) {
      producto.cantidad = 0; // Si la cantidad es menor que 1, la fijamos en 1
    } else {
      producto.cantidad = cantidad;
    }
    this.calcularTotales();
  }

  // Aplicar el código promocional
  aplicarPromo() {
    this.calcularDescuento();
    this.calcularTotales();
  }
}
