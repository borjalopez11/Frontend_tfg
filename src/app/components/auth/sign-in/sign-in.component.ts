import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../../servicios/auth.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  templateUrl: './sign-in.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  name: string = '';
  secondName: string = '';
  email: string = '';
  number: string = '';
  password: string = '';
  passwordConfirmation: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.isLoading = true;
    // Verificar que las contraseñas coincidan
    if (this.password !== this.passwordConfirmation) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      this.isLoading = false;
      return;
    }

    // Llamada al servicio de autenticación para registrar al usuario
    this.authService.signUp(this.name, this.secondName, this.email, this.number, this.password, this.passwordConfirmation).subscribe({
      next: (response) => {
        // Guardar el token JWT en el almacenamiento local
        this.authService.saveToken(response.jwt);
        // Redirigir al usuario a la página principal
        this.router.navigate(['/']);
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = error.error.message || 'Error al registrar la cuenta.';
        this.isLoading = false;
      }
    });
  }
}
