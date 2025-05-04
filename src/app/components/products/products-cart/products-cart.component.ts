import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from "../../../interface/interface";
import { ProductService } from "../../../services/product.service";
import { environment } from "../../../../enviroments/enviroment";


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
  backendUrl = environment.backendUrl;

  constructor(private productService: ProductService) {}

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

  handleAddToCart(product: any): void {
    this.productService.addToCart(product.id, 1).subscribe({
      next: () => {
        alert('Producto añadido al carrito');
        this.closePopup();
      },
      error: (err) => {
        console.error('Error al añadir al carrito:', err);
        alert('Error al añadir al carrito');
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
}
