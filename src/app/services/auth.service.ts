import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SignInForm} from "../components/auth/sign-in/sign-in.component";
import {AuthResponse, User} from "../interface/interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5001/auth';

  constructor(private http: HttpClient) {
  }

  getProfile(): Observable<User> {
    const token = this.getToken();
    return this.http.get<User>('http://localhost:5001/api/users/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  signIn(signin: SignInForm): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(this.apiUrl + "/singup", signin)
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {email, password});
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  saveRole(role: string): void {
    localStorage.setItem('role', role);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
