import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  public formSignup: FormGroup = this.fb.group({
    name: ['', Validators.required],
    secondName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    number: [
      '',
      [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.pattern(/^[0-9]{9}$/) // ✅ solo 9 dígitos numéricos exactos
      ]
    ],
    password: ['', Validators.required],
    passwordConfirmation: ['', Validators.required]
  });

  onSubmit(): void {
    if (this.formSignup.invalid) {
      this.formSignup.markAllAsTouched();
      return;
    }

    this.authService.signIn(this.formSignup.getRawValue()).subscribe({
      next: (response) => {
        console.log("Usuario añadido correctamente:", response);
      },
      error: (error) => {
        console.error("Error al registrar:", error);
      }
    });
  }
}
export interface SignInForm {
  name: string;
  secondName: string;
  email: string;
  number: string;
  password: string;
  passwordConfirmation: string;
}
