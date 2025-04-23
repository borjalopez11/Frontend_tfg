import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.css'
})
export class PruebaComponent {
  productos = [
    {
      nombre: 'Alitas',
      precio: 4.80,
      puntuacion: 4.9,
      imagen: 'assets/img/nuggets.png',
      categoria: 'entrantes',
      descripcion: ' asdf as  sfas  af af sd asfasf d sdfasd  dfasdfjientes ',
      alergenos: ['Gluten', 'Sulfito', 'Lácteos']
    }
  ];
  

  entrantes = this.productos.filter(p => p.categoria === 'entrantes');
  principales = this.productos.filter(p => p.categoria === 'principales');
  postres = this.productos.filter(p => p.categoria === 'postres');
  bebidas = this.productos.filter(p => p.categoria === 'bebidas');

  // Producto seleccionado para el pop-up
  selectedProduct: any = null;

  // Abre el pop-up con el producto seleccionado
  openPopup(product: any) {
    this.selectedProduct = product;
  }

  // Cierra el pop-up
  closePopup() {
    this.selectedProduct = null;
  }

  // Método para hacer scroll hacia las secciones
  scrollTo(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
