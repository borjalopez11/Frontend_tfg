import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-carta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carta.component.html',
  styleUrl: './carta.component.css'
})
export class CartaComponent {

  
  productos = [
    { nombre: 'Alitas', precio: 4.80, puntuacion: 4.9 },
    { nombre: 'Alitas', precio: 4.80, puntuacion: 4.9 },
    { nombre: 'Alitas', precio: 4.80, puntuacion: 4.9 },
    { nombre: 'Alitas', precio: 4.80, puntuacion: 4.9 },
    { nombre: 'Alitas', precio: 4.80, puntuacion: 4.9 },
    { nombre: 'Alitas', precio: 4.80, puntuacion: 4.9 }
  ];
}
