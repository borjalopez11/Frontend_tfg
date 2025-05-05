import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormsModule} from "@angular/forms";
import {CommonModule, NgClass} from "@angular/common";

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

  constructor(private http: HttpClient) {}

  enviarFormulario() {
    if (!this.aceptaCondiciones) {
      this.mostrarToast('Debes aceptar la política de privacidad para continuar', false);
      return;
    }

    const body = {
      name: this.form.name,
      address: this.form.address,
      email: this.form.email,
      comment: this.form.comment,
      restaurantName: this.form.restaurantName
    };

    const token = localStorage.getItem('token');

    this.http.post<MessageResponse>('http://localhost:5001/api/users/contact-form', body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: (response) => {
        this.mostrarToast(response.message || 'Formulario enviado correctamente', true);
      },
      error: (err) => {
        console.error('Error al enviar el formulario: ', err);
        this.mostrarToast('Error al enviar el formulario', false);
      }
    });
  }


  aceptaCondiciones = false;
  toastMessage = '';
  showToast = false;
  toastSuccess = true;
  mostrarCondiciones = false;

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

