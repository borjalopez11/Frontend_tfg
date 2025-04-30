import {Component, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../servicios/auth.service";

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
  public readonly authService: AuthService = inject(AuthService);

  formSignup: FormGroup = this.formBuilder.group({
    name: [''],
    secondName: [''],
    email: [''],
    number: [''],
    password: [''],
    passwordConfirmation: ['']
  })

  get nombre(): any{
    return this.formSignup.get('nombre');
  }

  onSubmit() {
    if(this.formSignup.invalid){
      this.formSignup.markAllAsTouched();
      return;
    }
    console.log(this.formSignup.getRawValue());

    this.authService.signIn(this.formSignup.getRawValue()).subscribe(
      {
        next: (response) => {
          console.log(response)
          console.log("usuario añadido correctamente.");
        },
        error: (error) => {
          console.error(error);
        }
      }
    )
  }
}

export interface SignInForm {
  name: string,
  secondName: string,
  email: string,
  number: string,
  password: number,
  passwordConfirmation: string
}

