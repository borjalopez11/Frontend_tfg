import {Routes} from '@angular/router';
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {ProductsCartComponent} from "./components/products/products-cart/products-cart.component";
import {ContactComponent} from "./components/contact/contact.component";
import {SignInComponent} from "./components/auth/sign-in/sign-in.component";
import {CartComponent} from "./components/order/cart/cart.component";
import {UserSpaceComponent} from "./components/user-space/user-space.component";
import {TermsConditionsComponent} from "./components/legal/terms-conditions/terms-conditions.component";
import {DataProtectionComponent} from "./components/legal/data-protection/data-protection.component";
import {LegalNoticeComponent} from "./components/legal/legal-notice/legal-notice.component";
import {PrivacityPolicyComponent} from "./components/legal/privacity-policy/privacity-policy.component";


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: "full"
  },
  {
    path: 'home',
    component: LandingPageComponent
  },
  {
    path: 'products-cart',
    component: ProductsCartComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'signIn',
    component: SignInComponent
  },
  {
    path: 'login',
    loadComponent: () => import('./components/auth/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: 'product-detail',
    component: ProductsCartComponent
  },
  {
    path: 'user-space',
    component: UserSpaceComponent
  },
  {
    path: 'terms',
    component: TermsConditionsComponent
  },
  {
    path: 'data-protection',
    component: DataProtectionComponent
  },
  {
    path: 'legal-notice',
    component: LegalNoticeComponent
  },
  {
    path: 'privacity-policy',
    component: PrivacityPolicyComponent
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: "full"
  }
];

