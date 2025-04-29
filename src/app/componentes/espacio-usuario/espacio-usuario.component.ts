import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-espacio-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './espacio-usuario.component.html',
  styleUrl: './espacio-usuario.component.css'
})
export class EspacioUsuarioComponent {

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
  ]
}
