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
import {ProductDetailComponent} from "./components/products/product-detail/product-detail.component";
import {AdminComponent} from "./components/admin/admin/admin.component";
import {authGuard} from "./guards/auth.guards";
import {adminGuard} from "./guards/admin.guards";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: "full"
  },
  {
    path: 'home',
    component: LandingPageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'products-cart',
    component: ProductsCartComponent,
    canActivate: [authGuard]
  },
  {
    path: 'contact',
    component: ContactComponent,
    canActivate: [authGuard]
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [authGuard]
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
    component: ProductDetailComponent,
    canActivate: [authGuard]
  },
  {
    path: 'user-space',
    component: UserSpaceComponent,
    canActivate: [authGuard]
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
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard],
    children: [
      {
        path: 'admin-products',
        loadComponent: () => import('./components/admin/admin-products/admin-products.component')
          .then(m => m.AdminProductsComponent)
      },
      {
        path: 'admin-users',
        loadComponent: () => import('./components/admin/admin-users/admin-users.component')
          .then(m => m.AdminUsersComponent)
      },
      {
        path: 'admin-forms',
        loadComponent: () => import('./components/admin/admin-forms/admin-forms.component')
          .then(m => m.AdminFormsComponent)
      },
      {
        path: 'admin-categories-ingredients',
        loadComponent: () => import('./components/admin/admin-categories-ingredients/admin-categories-ingredients.component')
          .then(m => m.AdminCategoriesIngredientsComponent)
      },
      {
        path: 'admin-categories',
        loadComponent: () => import('./components/admin/admin-categories/admin-categories.component')
          .then(m => m.AdminCategoriesComponent)
      },
      {
        path: 'admin-ingredients',
        loadComponent: () => import('./components/admin/admin-ingredients/admin-ingredients.component')
          .then(m => m.AdminIngredientsComponent)
      },
      {
        path: 'admin-allergens',
        loadComponent: () => import('./components/admin/admin-allergens/admin-allergens.component')
          .then(m => m.AdminAllergensComponent)
      },

      {
        path: '',
        redirectTo: 'admin-products',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: "full"
  }
];
