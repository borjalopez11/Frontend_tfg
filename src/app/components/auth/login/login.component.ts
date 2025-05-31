import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
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
        this.authService.saveRole(response.role)
        this.router.navigate(['/home']);
        this.isLoading = false;

        if (response.role === 'ROLE_RESTAURANT_OWNER'){
          this.router.navigate(['/admin']);
        }else {
          this.router.navigate(['/products-cart']);
        }
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Correo o contraseña incorrectos.';
        this.isLoading = false;
      },
    });
  }

  toastMessage: string = '';
  showToast: boolean = false;


  ngOnInit(): void {
    if (history.state.emailChanged) {
      this.mostrarToast('Correo actualizado correctamente. Inicia sesión de nuevo.');
    }
  }

  mostrarToast(msg: string) {
    this.toastMessage = msg;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }

}
