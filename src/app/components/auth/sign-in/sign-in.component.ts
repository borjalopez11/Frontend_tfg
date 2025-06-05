import { Component, inject } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import {CommonModule} from "@angular/common";
import {ModalTermsConditionsComponent} from "../../legal/modal-terms-conditions/modal-terms-conditions.component";
import {ModalPrivacityPolicyComponent} from "../../legal/modal-privacity-policy/modal-privacity-policy.component";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    ModalTermsConditionsComponent,
    ModalPrivacityPolicyComponent
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);





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
        Validators.pattern(/^[0-9]{9}$/)
      ]
    ],
    password: ['', Validators.required],
    passwordConfirmation: ['', Validators.required]
  });


  termsAccepted = false;
  privacyAccepted = false;
  onSubmit(): void {
    if (this.formSignup.invalid) {
      this.formSignup.markAllAsTouched();
      return;
    }

    if (!this.termsAccepted || !this.privacyAccepted) {
      this.mostrarToast('Debes aceptar las condiciones y la política de privacidad', false);
      return;
    }

    this.authService.signIn(this.formSignup.getRawValue()).subscribe({
      next: (response) => {
        if (response.jwt) {
          this.authService.saveToken(response.jwt);
        }
        this.router.navigate(['/home']);
      },
      error: (error) => {
        if (error?.error?.message?.includes('Email already used')) {
          this.formSignup.get('email')?.setErrors({ emailInUse: true });
        }
        this.mostrarToast('Error al registrar. Intenta de nuevo', false);
      }
    });
  }



  showTermsModal: boolean = false;
  showPrivacyModal: boolean = false;

  openTerms() {
    this.showTermsModal = true;
  }

  openPrivacy() {
    this.showPrivacyModal = true;
  }

  closeModal() {
    this.showTermsModal = false;
    this.showPrivacyModal = false;
  }

  toastMessage = '';
  showToast = false;
  toastSuccess = true;

  mostrarToast(mensaje: string, success: boolean = true) {
    this.toastMessage = mensaje;
    this.toastSuccess = success;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
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

