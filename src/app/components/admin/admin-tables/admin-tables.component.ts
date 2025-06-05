import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-admin-tables',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-tables.component.html',
  styleUrl: './admin-tables.component.css'
})
export class AdminTablesComponent {
  tables: any[] = [];
  newTableNumber: number | null = null;


  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadTables();
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  toggleActivation(table: any): void {
    const url = `http://localhost:5001/api/admin/tables/${table.tableNumber}/${table.active ? 'disable' : 'activate'}`;
    this.http.put(url, {}, { headers: this.getAuthHeaders() }).subscribe({
      next: () => this.loadTables(),
      error: () => console.error('Error al cambiar el estado de la mesa')
    });
  }

  unassignTable(table: any): void {
    const url = `http://localhost:5001/tables/${table.tableNumber}/unassign`;
    this.http.put(url, {}, { headers: this.getAuthHeaders() }).subscribe({
      next: () => this.loadTables(),
      error: () => console.error('Error al desocupar la mesa')
    });
  }



  loadTables(): void {
    this.http.get<any>('http://localhost:5001/tables', {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: (data) => {
        this.tables = (data || []).reverse();
      },
      error: () => {
        console.error('Error al cargar las mesas');
      }
    });
  }

  crearMesa(): void {
    if (!this.newTableNumber) return;

    const payload = { tableNumber: this.newTableNumber };

    this.http.post('http://localhost:5001/tables', payload, {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: () => {
        this.newTableNumber = null;
        this.loadTables();
      },
      error: () => alert('Error al crear la mesa')
    });
  }
}
