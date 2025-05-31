import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from "../../../interface/interface";
import { ProductService } from "../../../services/product.service";
import { environment } from "../../../../enviroments/enviroment";
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-products-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.css']
})
export class ProductsCartComponent implements OnInit {

  products: Product[] = [];
  entrantes: Product[] = [];
  principales: Product[] = [];
  postres: Product[] = [];
  bebidas: Product[] = [];
  isLoading = true;
  backendUrl = environment.backendUrl;
  mesaNumero: number | null = null;
  mesaAsignada: boolean = false;
  errorMensajeMesa: string = '';
  mostrarToast = false;
  mensajeToast = '';



  constructor(private productService: ProductService,  private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe(
      (data) => {

        this.products = data.map(product => ({
          ...product,
          image : product.image ? this.backendUrl + 'uploads/' + product.image : 'assets/imgNotFound.png',
        }));

        console.log(this.products);
        this.entrantes = this.products.filter(p => p.foodCategory.name === 'Entrantes');
        this.principales = this.products.filter(p => p.foodCategory.name === 'Principales');
        this.postres = this.products.filter(p => p.foodCategory.name === 'Postres');
        this.bebidas = this.products.filter(p => p.foodCategory.name === 'Bebidas');

        this.isLoading = false;
      },
      (error) => {
        console.error("Error al cargar los productos: ", error);
        this.isLoading = false;
      }
    );
  }

  handleAddToCart(product: any): void {
    this.productService.addToCart(product.id, 1).subscribe({
      next: () => {
        this.closePopup();
        this.mensajeToast = 'Producto añadido al carrito';
        this.mostrarToast = true;
        setTimeout(() => this.mostrarToast = false, 3000);
      },
      error: (err) => {
        console.error('Error al añadir al carrito:', err);
        this.mensajeToast = 'Error al añadir al carrito';
        this.mostrarToast = true;
        setTimeout(() => this.mostrarToast = false, 3000);
      }
    });
  }

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

  asignarMesa(): void {
    this.errorMensajeMesa = ''; // limpiar mensaje anterior

    if (!this.mesaNumero) {
      this.errorMensajeMesa = 'Por favor introduce un número de mesa válido';
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMensajeMesa = 'No se encontró el token de autenticación.';
      return;
    }

    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const activateUrl = `http://localhost:5001/tables/${this.mesaNumero}/activate`;
    const assignUrl = `http://localhost:5001/tables/${this.mesaNumero}/assign`;

    this.http.put(activateUrl, {}, headers).subscribe({
      next: () => {
        this.http.put(assignUrl, {}, headers).subscribe({
          next: () => {
            this.mesaAsignada = true;
            this.errorMensajeMesa = '';
            this.mensajeToast = 'Mesa asignada correctamente';
            this.mostrarToast = true;
            setTimeout(() => this.mostrarToast = false, 3000);

          },
          error: (err) => {
            console.error('Error al asignar la mesa', err);
            this.errorMensajeMesa = err.error?.message || 'Error al asignar la mesa';
          }
        });
      },
      error: (err) => {
        console.error('Error al activar la mesa', err);
        this.errorMensajeMesa = err.error?.message || 'Error al activar la mesa';
      }
    });
  }

  cerrarPopupMesa(): void {
    if (!this.mesaAsignada) return;
  }
}
