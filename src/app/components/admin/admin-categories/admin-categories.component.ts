import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-categories.component.html',
  styleUrl: './admin-categories.component.css'
})
export class AdminCategoriesComponent {
  restaurantId = 1;
  newCategory = { name: '' };
  categories: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  cargarCategorias() {
    this.http.get(`http://localhost:5001/api/category/restaurant?restaurantId=${this.restaurantId}`, {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: (data: any) => {
        this.categories = Array.isArray(data) ? data.map(c => ({ id: c.id, name: c.name })) : [];
      },
      error: () => alert('Error al cargar categorías')
    });

  }
  filtro: string = '';

  categoriasFiltradas(): any[] {
    if (!this.filtro.trim()) return this.categories;
    return this.categories.filter(cat =>
      cat.name.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }


  crearCategoria() {
    this.http.post(`http://localhost:5001/api/admin/category`, {
      name: this.newCategory.name,
      restaurantId: this.restaurantId
    }, {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: () => {
        this.newCategory.name = '';
        this.cargarCategorias();
      },
      error: () => alert('Error al crear categoría')
    });
  }
}
