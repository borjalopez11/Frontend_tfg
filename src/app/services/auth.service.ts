import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SignInForm} from "../components/auth/sign-in/sign-in.component";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5001/auth';

  constructor(private http: HttpClient) {
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  signIn(signin: SignInForm): Observable<SignInForm>{
    return this.http.post<SignInForm>(this.apiUrl + "/singup", signin)
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {email, password});
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
