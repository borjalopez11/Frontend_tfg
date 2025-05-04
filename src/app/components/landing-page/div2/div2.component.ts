import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-div2',
  templateUrl: './div2.component.html',
  styleUrls: ['./div2.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class Div2Component {
  cards = [
    {
      nombre: 'Card 1',
      descripcion: 'Descripción de la tarjeta 1',
      imagen: './assets/img/foto1.jpg'
    },
    {
      nombre: 'Card 2',
      descripcion: 'Descripción de la tarjeta 2',
      imagen: './assets/img/foto2.jpg'
    },
    {
      nombre: 'Card 3',
      descripcion: 'Descripción de la tarjeta 3',
      imagen: './assets/img/foto3.jpg'
    }
  ];
  currentIndex = 0;

  get prevIndex(): number {
    return (this.currentIndex - 1 + this.cards.length) % this.cards.length;
  }

  get nextIndex(): number {
    return (this.currentIndex + 1) % this.cards.length;
  }

  onCardClick(index: number): void {
    this.currentIndex = index;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      this.currentIndex =
        (this.currentIndex - 1 + this.cards.length) % this.cards.length;
    } else if (event.key === 'ArrowRight') {
      this.currentIndex = (this.currentIndex + 1) % this.cards.length;
    }
  }
}

