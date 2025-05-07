import { Component } from '@angular/core';
import {formatDate, NgFor, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-admin-forms',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './admin-forms.component.html',
  styleUrl: './admin-forms.component.css'
})
export class AdminFormsComponent {
  forms: any[] = [];
  filteredForms: any[] = [];

  searchName: string = '';
  startDate: string = '';
  endDate: string = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadForms();
  }

  loadForms() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get<any[]>('http://localhost:5001/api/admin/restaurants/contact-form', { headers })
      .subscribe({
        next: (data) => {
          this.forms = data;
          this.applyFilters();
        },
        error: () => {
          console.error('Error al cargar formularios');
        }
      });
  }

  applyFilters() {
    const query = this.searchName.toLowerCase();
    const start = this.startDate ? new Date(this.startDate) : null;
    const end = this.endDate ? new Date(this.endDate) : null;

    this.filteredForms = this.forms.filter(form => {
      const nameMatch = form.user?.name?.toLowerCase().includes(query);
      const createdAt = new Date(form.createdAt);
      const afterStart = !start || createdAt >= start;
      const beforeEnd = !end || createdAt <= end;

      return nameMatch && afterStart && beforeEnd;
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }

}
