import {RouterModule, Routes} from '@angular/router';
import {RegistroSesionComponent} from "./componentes/registro-sesion/registro-sesion.component";
import {CartaComponent} from "./componentes/carta/carta.component";
import { PruebaComponent } from './componentes/prueba/prueba.component';
import { LandingPageComponent } from './componentes/inicio/landing-page/landing-page.component';
import { FormularioComponent } from './componentes/contacto/formulario/formulario.component';
import {CarritoComponent} from "./componentes/carrito/carrito.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: "full"
  },
  {
    path: 'inicio',
    component: LandingPageComponent
  },
  {
    path: 'carta',
    component: CartaComponent
  },
  {
    path: 'signIn',
    component: RegistroSesionComponent
  },
  {
    path: 'login',
    loadComponent: () => import('./componentes/inicio-sesion/inicio-sesion.component')
      .then(m => m.InicioSesionComponent)
  },
  {
    path: 'contacto',
    component: FormularioComponent
  },
  {
    path: 'prueba',
    component: PruebaComponent
  },
  {
    path: 'carrito',
    component: CarritoComponent
  },
  {
    path: '**',
    redirectTo: 'inicio',
    pathMatch: "full"
  }
];

