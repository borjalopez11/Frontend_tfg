import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent {

  admins = [
    { name: 'Juan Pérez', role: 0, createdAt: new Date('2021-01-15') },
    { name: 'Carlos García', role: 0, createdAt: new Date('2020-09-05') },
    { name: 'Pedro Sánchez', role: 0, createdAt: new Date('2022-03-12') }
  ];

  users = [
    { name: 'Ana López', role: 1, createdAt: new Date('2023-02-18') },
    { name: 'Luisa Martínez', role: 1, createdAt: new Date('2022-07-23') },
    { name: 'Maria González', role: 1, createdAt: new Date('2021-12-11') },
    { name: 'David Rodríguez', role: 1, createdAt: new Date('2020-11-09') },
    { name: 'Elena Díaz', role: 1, createdAt: new Date('2023-01-25') },
    { name: 'José Martínez', role: 1, createdAt: new Date('2021-05-17') },
    { name: 'Laura Pérez', role: 1, createdAt: new Date('2022-08-30') },
    { name: 'Miguel Fernández', role: 1, createdAt: new Date('2021-03-19') },
    { name: 'Julia Moreno', role: 1, createdAt: new Date('2023-04-02') },
    { name: 'José García', role: 1, createdAt: new Date('2020-07-15') }
  ];
  searchTerm: string = '';
  adminSortDirection = true;
  userSortDirection = true;

  get sortedAdmins() {
    return this.admins
      .filter(u => u.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
      .sort((a, b) => {
        const dateA = a.createdAt.getTime();
        const dateB = b.createdAt.getTime();
        return this.adminSortDirection ? dateA - dateB : dateB - dateA;
      });
  }
  
  get sortedUsers() {
    return this.users
      .filter(u => u.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
      .sort((a, b) => {
        const dateA = a.createdAt.getTime();
        const dateB = b.createdAt.getTime();
        return this.userSortDirection ? dateA - dateB : dateB - dateA;
      });
  }
  

  toggleAdminSortOrder() {
    this.adminSortDirection = !this.adminSortDirection;
  }

  toggleUserSortOrder() {
    this.userSortDirection = !this.userSortDirection;
  }

  getRoleText(role: number): string {
    return role === 0 ? 'Admin' : 'Customer';
  }

  formatDate(date: Date): string {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
}
