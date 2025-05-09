import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {timeout} from "rxjs";

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent {
  private readonly router: Router = inject(Router);


  constructor() {
    setTimeout(() => {
      this.router.navigateByUrl("/home");
    }, 3000);
  }

}
