import {Component, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  public readonly formBuilder: FormBuilder = inject(FormBuilder);

  formSignup: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  })

  get nombre(): any{
    return this.formSignup.get('nombre');
  }
}

export interface SignInForm {
  nombre: string,
  email: string,
  password: string,
  lastName: string,
  phone: number,
  confirmPassword: string
}

