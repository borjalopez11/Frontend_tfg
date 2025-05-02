import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from "../../../interface/interface";
import { ProductService } from "../../../services/product.service";

@Component({
  selector: 'app-products-cart',
  standalone: true,
  imports: [CommonModule],
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

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Método para cargar los productos desde el servicio
  private loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.entrantes = this.products.filter(p => p.foodCategory.name === 'Secundarios');
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
