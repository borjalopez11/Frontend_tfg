import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import {CommonModule, NgForOf} from "@angular/common";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    CommonModule
  ],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent implements OnInit {

  restaurantId = 1;

  newIngredientCategory = { name: '' };
  newMainCategory = { name: '' };
  newIngredient = { name: '', categoryId: '', restaurantId: this.restaurantId };

  ingredientCategoryList: any[] = [];
  selectedIngredientCategory: any = null;
  selectedIngredientCategoryId: string = '';


  mainCategories: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.cargarCategoriasIngredientes();
    this.cargarCategoriasPrincipales();
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  cargarCategoriasIngredientes() {
    this.http.get(`http://localhost:5001/api/admin/ingredients/restaurant/${this.restaurantId}/category`, {
      headers: this.getAuthHeaders()
    }).subscribe((data: any) => {
      this.ingredientCategoryList = data;
      if (data.length > 0) {
        this.selectedIngredientCategoryId = data[0].id.toString();
        this.selectedIngredientCategory = data[0];
      }
    });
  }


  cargarCategoriasPrincipales() {
    this.http.get(`http://localhost:5001/api/admin/category?restaurantId=${this.restaurantId}`, {
      headers: this.getAuthHeaders()
    }).subscribe((data: any) => {
      this.mainCategories = data;
    });
  }

  crearCategoriaIngredientes() {
    this.http.post('http://localhost:5001/api/admin/ingredients/category', {
      name: this.newIngredientCategory.name,
      restaurantId: this.restaurantId
    }, {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: () => {
        this.newIngredientCategory.name = '';
        this.cargarCategoriasIngredientes();
      },
      error: () => alert('Error al crear categoría de ingredientes')
    });
  }

  crearCategoriaPrincipal() {
    this.http.post('http://localhost:5001/api/admin/category', {
      name: this.newMainCategory.name,
      restaurant: this.restaurantId
    }, {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: () => {
        this.newMainCategory.name = '';
        this.cargarCategoriasPrincipales();
      },
      error: () => alert('Error al crear categoría principal')
    });
  }

  crearIngrediente() {
    this.http.post('http://localhost:5001/api/admin/ingredients', {
      name: this.newIngredient.name,
      categoryId: this.newIngredient.categoryId,
      restaurantId: this.restaurantId
    }, {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: () => {
        this.newIngredient.name = '';
        this.newIngredient.categoryId = '';
        this.cargarCategoriasIngredientes();
      },
      error: () => alert('Error al crear ingrediente')
    });
  }

  onSelectCategoria(id: string) {
    this.selectedIngredientCategoryId = id;
    this.selectedIngredientCategory = this.ingredientCategoryList.find(c => c.id === +id);
  }

}
