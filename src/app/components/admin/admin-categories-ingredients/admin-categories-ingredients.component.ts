import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AuthService} from "../../../services/auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-admin-categories-ingredients',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-categories-ingredients.component.html',
  styleUrl: './admin-categories-ingredients.component.css'
})
export class AdminCategoriesIngredientsComponent {
  restaurantId = 1;
  newIngredientCategory = { name: '' };
  ingredientCategories: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  cargarCategorias() {
    this.http.get(`http://localhost:5001/api/admin/ingredients/restaurant/${this.restaurantId}/category`, {
      headers: this.getAuthHeaders()
    }).subscribe((data: any) => {
      this.ingredientCategories = data;
    });
  }

  filtro: string = '';

  categoriaFiltrada(): any[] {
    if (!this.filtro.trim()) return this.ingredientCategories;
    return this.ingredientCategories.filter(cat =>
      cat.name.toLowerCase().includes(this.filtro.toLowerCase())
    );
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
        this.cargarCategorias();
      },
      error: () => alert('Error al crear categoría de ingredientes')
    });
  }
}
