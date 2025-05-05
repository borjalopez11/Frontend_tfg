import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { CommonModule, NgClass } from "@angular/common";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    CommonModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  form = {
    name: '',
    address: '',
    email: '',
    restaurantName: '',
    comment: ''
  };

  termsAccepted = false;
  toastMessage = '';
  showToast = false;
  toastSuccess = true;
  mostrarCondiciones = false;

  constructor(private http: HttpClient) {}

  enviarFormulario(formulario: any) {
    if (!this.termsAccepted) {
      this.mostrarToast('Debes aceptar la política de privacidad para continuar', false);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      this.mostrarToast('No se encontró token de autenticación', false);
      return;
    }

    this.http.post<MessageResponse>('http://localhost:5001/api/users/contact-form', this.form, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: (response) => {
        this.mostrarToast(response.message || 'Formulario enviado correctamente', true);
        this.form = { name: '', address: '', email: '', restaurantName: '', comment: '' };
        this.termsAccepted = false;
        formulario.resetForm();
      },
      error: (err) => {
        console.error('Error al enviar el formulario: ', err);
        this.mostrarToast('Error al enviar el formulario', false);
      }
    });
  }


  abrirCondiciones(event: Event) {
    event.preventDefault();
    this.mostrarCondiciones = true;
  }

  cerrarCondiciones() {
    this.mostrarCondiciones = false;
  }

  mostrarToast(msg: string, success: boolean = true) {
    this.toastMessage = msg;
    this.toastSuccess = success;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }
}

interface MessageResponse {
  message: string;
}
