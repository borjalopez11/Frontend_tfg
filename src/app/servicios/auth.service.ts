import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5001/auth'; // URL de tu backend

  constructor(private http: HttpClient) {}

  // Método de login (inicio de sesión)
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  // Método de registro (sign-up)
  signUp(name: string, secondName: string, email: string, number: string, password: string, passwordConfirmation: string): Observable<any> {
    console.log("ha llegado")
    return this.http.post(`${this.apiUrl}/singup`, {
      name,
      secondName,
      email,
      number,
      password,
      passwordConfirmation,
      role: "ROLE_CUSTOMER"
    });
  }

  // Guardar el token JWT en el almacenamiento local
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Obtener el token JWT de localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Eliminar el token JWT de localStorage
  logout(): void {
    localStorage.removeItem('token');
  }

  // Verificar si el usuario está autenticado (si hay un token válido)
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
