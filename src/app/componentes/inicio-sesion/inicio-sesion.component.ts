import { Component } from '@angular/core';
import {AuthService} from "../../servicios/auth.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.isLoading = true;
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.authService.saveToken(response.jwt);
        this.router.navigate(['/']);
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Correo o contraseña incorrectos.';
        this.isLoading = false;
        },
    });
  }
}


