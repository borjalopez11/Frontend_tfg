import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-admin-allergens',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './admin-allergens.component.html',
  styleUrl: './admin-allergens.component.css'
})
export class AdminAllergensComponent {
  newAllergen = { name: '', description: '' };
  allergens: any[] = [];
  filtro: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAllergens();
  }

  loadAllergens() {
    this.http.get<any[]>('http://localhost:5001/api/admin/allergen/all')
      .subscribe(data => this.allergens = data);
  }

  crearAlergeno() {
    this.http.post('http://localhost:5001/api/admin/allergen/create', this.newAllergen)
      .subscribe({
        next: () => {
          this.newAllergen = { name: '', description: '' };
          this.loadAllergens();
        },
        error: () => alert('Error al crear alérgeno')
      });
  }

  alergenoFiltrado(): any[] {
    if (!this.filtro.trim()) return this.allergens;
    return this.allergens.filter(a =>
      a.name.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  eliminarAlergeno(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este alérgeno?')) {
      this.http.delete(`http://localhost:5001/api/admin/allergen/${id}`)
        .subscribe({
          next: () => this.loadAllergens(),
          error: () => alert('Error al eliminar alérgeno')
        });
    }
  }

}
