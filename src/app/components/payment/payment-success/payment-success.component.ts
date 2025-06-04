import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {timeout} from "rxjs";
import {CartService} from "../../../services/cart.service";

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent {
  constructor(private cartService: CartService, private router: Router) {
    this.clearCartAndRedirect();
  }

  clearCartAndRedirect(): void {
    this.cartService.clearCart().subscribe();

    setTimeout(() => {
      this.router.navigateByUrl("/home");
    }, 3000);
  }

}
