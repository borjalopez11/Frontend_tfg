import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {NavbarComponent} from "./components/shared/navbar/navbar.component";
import {FooterComponent} from "./components/shared/footer/footer.component";
import {NgIf} from "@angular/common";
import {filter} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend2';

  isLoginOrRegister: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentRoute = this.router.url;
      this.isLoginOrRegister = currentRoute.includes('signIn') || currentRoute.includes('login');
    });
  }



}
