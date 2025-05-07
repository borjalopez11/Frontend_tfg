import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-admin-ingredients',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-ingredients.component.html',
  styleUrl: './admin-ingredients.component.css'
})
export class AdminIngredientsComponent {

  restaurantId = 1;

  newIngredient = { name: '', categoryId: '' };
  ingredientCategoryList: any[] = [];

  selectedIngredientCategoryId: string = '';
  selectedCategory: any = null;
  searchQuery: string = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadIngredientCategories();
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  loadIngredientCategories() {
    this.http.get(`http://localhost:5001/api/admin/ingredients/restaurant/${this.restaurantId}/category`, {
      headers: this.getAuthHeaders()
    }).subscribe((data: any) => {
      this.ingredientCategoryList = data;
      if (data.length > 0) {
        this.selectedIngredientCategoryId = data[0].id.toString();
        this.selectedCategory = data[0];
      }
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
        this.loadIngredientCategories();
      },
      error: () => alert('Error al crear ingrediente')
    });
  }

  onSelectCategoria(id: string) {
    this.selectedIngredientCategoryId = id;
    this.selectedCategory = this.ingredientCategoryList.find(cat => cat.id === +id);
  }

  getFilteredIngredients(): any[] {
    if (!this.selectedCategory) return [];
    const query = this.searchQuery.toLowerCase();
    return this.selectedCategory.ingredients.filter((ing: any) =>
      ing.name.toLowerCase().includes(query)
    );
  }
}
