import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { User } from "../../interface/interface";
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-user-space',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './user-space.component.html',
  styleUrl: './user-space.component.css'
})
export class UserSpaceComponent implements OnInit {

  mostrarToast = false;
  mensajeToast = '';


  productos = [
    {
      nombre: 'Alitas',
      precio: 4.80,
      puntuacion: 4.9,
      imagen: 'assets/img/nuggets.png',
      categoria: 'entrantes'
    },
    {
      nombre: 'Alitas',
      precio: 4.80,
      puntuacion: 4.9,
      imagen: 'https://media.istockphoto.com/id/453780395/es/foto/chow-mein-de-pollo.jpg?s=612x612&w=0&k=20&c=SZhR_09oLtHG35Sq8571h6xMze8lJD2tOhlg7O-JZpo=',
      categoria: 'entrantes'
    },
    {
      nombre: 'Alitas',
      precio: 4.80,
      puntuacion: 4.9,
      imagen: 'https://media.istockphoto.com/id/1407895827/es/foto/sopa-de-ramen-con-vista-superior-de-pato-fideos-y-huevo-en-una-mesa-de-piedra-oscura.jpg?s=612x612&w=0&k=20&c=C08AsfWLXqFB2_yzvtapP4G7CH5fRrm-Zi-T2tL6cx4=',
      categoria: 'entrantes'
    }
  ];

  user?: User;

  editando = {
    name: false,
    secondName: false,
    number: false,
    email: false
  };

  tempValues = {
    name: '',
    secondName: '',
    number: '',
    email: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (data) => {
        this.user = data;
        this.tempValues = {
          name: data.name,
          secondName: data.secondName,
          number: data.number,
          email: data.email
        };
      },
      error: (err) => {
        console.error('Error cargando perfil:', err);
      }
    });
  }

  activarEdicion(campo: keyof typeof this.tempValues) {
    this.editando[campo] = true;
  }

  cancelarEdicion(campo: keyof typeof this.tempValues) {
    if (this.user) {
      this.tempValues[campo] = this.user[campo];
    }
    this.editando[campo] = false;
  }


  guardarEdicion(campo: keyof typeof this.tempValues) {
    const body = { ...this.user, [campo]: this.tempValues[campo] };

    this.authService.updateProfile(body).subscribe({
      next: () => {
        if (this.user) {
          this.user[campo] = this.tempValues[campo];
        }
        this.editando[campo] = false;

        if (campo === 'email') {
          this.authService.logout();
          this.router.navigate(['/login'], { state: { emailChanged: true } });
        }


        this.mensajeToast = 'Datos actualizados correctamente';
        this.mostrarToast = true;
        setTimeout(() => this.mostrarToast = false, 3000);
      },
      error: (err) => {
        console.error('Error al guardar el cambio:', err);
      }
    });
  }



  mostrarPopupContrasena = false;
  passwordData = {
    oldPassword: '',
    newPassword: ''
  };
  passwordError = '';

  abrirPopup() {
    this.mostrarPopupContrasena = true;
    this.passwordData = { oldPassword: '', newPassword: '' };
    this.passwordError = '';
  }

  cerrarPopup() {
    this.mostrarPopupContrasena = false;
  }

  confirmarCambioPassword() {
    if (!this.passwordData.oldPassword || !this.passwordData.newPassword) {
      this.passwordError = 'Ambas contraseñas son obligatorias';
      return;
    }

    this.authService.changePassword(this.passwordData).subscribe({
      next: (res) => {
        if (res.message === 'Contraseña actualizada correctamente') {
          this.cerrarPopup();
          this.passwordError = '';
          this.mensajeToast = 'Contraseña actualizada correctamente';
          this.mostrarToast = true;
          setTimeout(() => this.mostrarToast = false, 3000);
        }
      },
      error: (err) => {
        this.passwordError = err.error?.message || 'Error al cambiar la contraseña';
        console.error(err);
      }
    });
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }



}
