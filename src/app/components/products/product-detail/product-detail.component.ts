import { Component } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  productos = [
    {
      nombre: 'Alitas',
      precio: 4.80,
      puntuacion: 4.9,
      imagen: 'assets/img/nuggets.png',
      categoria: 'entrantes',
      descripcion: ' asdf as  sfas  af aadf asdfasdafdf asdf asf afaf asdf dfa df affadfa adfasdadfa f adf  asdfa asdf asdfasf afd asdf dfsasf asf asf asdf as sd asfasf d sdfasd  dfasdfjientes ',
      alergenos: ['Gluten', 'Sulfito', 'Lácteos']
    }
  ];


  entrantes = this.productos.filter(p => p.categoria === 'entrantes');
  principales = this.productos.filter(p => p.categoria === 'principales');
  postres = this.productos.filter(p => p.categoria === 'postres');
  bebidas = this.productos.filter(p => p.categoria === 'bebidas');

  selectedProduct: any = null;

  openPopup(product: any) {
    this.selectedProduct = product;
  }

  closePopup() {
    this.selectedProduct = null;
  }

  scrollTo(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
