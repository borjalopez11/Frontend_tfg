import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-forms',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './admin-forms.component.html',
  styleUrl: './admin-forms.component.css'
})
export class AdminFormsComponent {
  forms = [
    {
      id: 1,
      user: { id: 201, name: 'Matías Romero' },
      comentario: 'Me gustaría reservar una mesa para dos el viernes por la noche.',
      createdAt: '2025-05-03T18:30:00'
    },
    {
      id: 2,
      user: { id: 202, name: 'Lucía Pérez' },
      comentario: '¿Tienen menú vegetariano?',
      createdAt: '2025-05-05T13:15:00'
    },
    {
      id: 3,
      user: { id: 203, name: 'Carlos Díaz' },
      comentario: 'Me gustaría celebrar un cumpleaños, ¿ofrecen algún pack?',
      createdAt: '2025-05-04T10:45:00'
    },
    {
      id: 4,
      user: { id: 204, name: 'Sofía Herrera' },
      comentario: '¿Tienen opciones sin gluten?',
      createdAt: '2025-05-02T21:00:00'
    },
    {
      id: 5,
      user: { id: 205, name: 'Iván Morales' },
      comentario: '¿Puedo reservar para un grupo de 10 personas?',
      createdAt: '2025-05-06T16:20:00'
    },
    {
      id: 6,
      user: { id: 206, name: 'Elena Gómez' },
      comentario: 'Quiero hacer una reserva para un almuerzo de negocios.',
      createdAt: '2025-05-07T12:00:00'
    }
  ];

  searchName: string = '';
  startDate: string = '';
  endDate: string = '';

  get filteredForms() {
    return this.forms.filter(form => {
      const matchesName = form.user.name.toLowerCase().includes(this.searchName.toLowerCase());

      const date = new Date(form.createdAt).getTime();
      const start = this.startDate ? new Date(this.startDate).getTime() : null;
      const end = this.endDate ? new Date(this.endDate).getTime() : null;

      const inRange = (!start || date >= start) && (!end || date <= end);
      return matchesName && inRange;
    });
  }

  formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
}
