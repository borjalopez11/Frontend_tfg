import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { AdminNavbarComponent } from './components/admin/admin-navbar/admin-navbar.component';
import { NgIf } from '@angular/common';
import { filter } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, AdminNavbarComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend2';

  isLoginOrRegister: boolean = false;
  isAdminRoute: boolean = false;
  isRestaurantOwner: boolean = false;
  isUserSpaceRoute: boolean = false;


  constructor(private router: Router, private authService: AuthService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });
  }


  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentRoute = this.router.url;
      this.isUserSpaceRoute = currentRoute.startsWith('/user-space');
      this.isLoginOrRegister = currentRoute.includes('signIn') || currentRoute.includes('login');
      this.isAdminRoute = currentRoute.startsWith('/admin');
      this.isRestaurantOwner = this.authService.getRole() === 'ROLE_RESTAURANT_OWNER';
    });
  }
}
