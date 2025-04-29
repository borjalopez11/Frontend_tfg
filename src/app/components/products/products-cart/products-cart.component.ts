import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-cart.component.html',
  styleUrl: './products-cart.component.css'
})
export class ProductsCartComponent {

  productos = [
    {
      nombre: 'Alitas',
      precio: 4.80,
      puntuacion: 4.9,
      imagen: 'assets/img/nuggets.png',
      categoria: 'entrantes'
    },
    {
      nombre: 'Alitas',
      precio: 4.80,
      puntuacion: 4.9,
      imagen: 'https://media.istockphoto.com/id/453780395/es/foto/chow-mein-de-pollo.jpg?s=612x612&w=0&k=20&c=SZhR_09oLtHG35Sq8571h6xMze8lJD2tOhlg7O-JZpo=',
      categoria: 'entrantes'
    },
    {
      nombre: 'Alitas',
      precio: 4.80,
      puntuacion: 4.9,
      imagen: 'https://media.istockphoto.com/id/1407895827/es/foto/sopa-de-ramen-con-vista-superior-de-pato-fideos-y-huevo-en-una-mesa-de-piedra-oscura.jpg?s=612x612&w=0&k=20&c=C08AsfWLXqFB2_yzvtapP4G7CH5fRrm-Zi-T2tL6cx4=',
      categoria: 'entrantes'
    },
    {
      nombre: 'Alitas',
      precio: 4.80,
      puntuacion: 4.9,
      imagen: 'https://media.istockphoto.com/id/1459147088/es/foto/receta-de-curry-de-camarones-camarones-cocinados-en-una-rica-salsa-de-curry-salsa-salada-con.jpg?s=612x612&w=0&k=20&c=Dh0e7pvF5KlT5rLvgQYLqI2171wcQMFjgGjkLcNw_0M=',
      categoria: 'entrantes'
    },
    {
      nombre: 'Alitas',
      precio: 4.80,
      puntuacion: 4.9,
      imagen: 'https://media.istockphoto.com/id/838234118/es/foto/comida-asi%C3%A1tica-en-un-recipiente-aislado-en-fondo-blanco.jpg?s=612x612&w=0&k=20&c=AOMa-SDq90a289689cMHStOC-boGAxtnvF1h2RngJnE=',
      categoria: 'entrantes'
    },
    {
      nombre: 'Alitas',
      precio: 4.80,
      puntuacion: 4.9,
      imagen: 'https://media.istockphoto.com/id/1069146316/es/foto/bollos-al-vapor-chino-aislado-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=8h17weKtpiw-VWB2Au8Ct53Url7J63XAzDLNiVWVV24=',
      categoria: 'entrantes'
    },
    {
      nombre: 'patatas',
      precio: 4.80,
      puntuacion: 4.9,
      imagen: 'https://media.istockphoto.com/id/177096343/es/foto/rollos-de-sushi-y.jpg?s=612x612&w=0&k=20&c=o3zoytIMrNrRvtSm3j1VdYEEbuWns05d6az60He0Bww=',
      categoria: 'principales'
    },
    // más productos...
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
