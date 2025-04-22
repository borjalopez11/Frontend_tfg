import { Routes } from '@angular/router';
import {LandingPageComponent} from "./componentes/INICIO/landing-page/landing-page.component";
import {FormularioComponent} from "./componentes/CONTACTO/formulario/formulario.component";
import {RegistroSesionComponent} from "./componentes/registro-sesion/registro-sesion.component";
import {CartaComponent} from "./componentes/carta/carta.component";

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
    path: '**',
    redirectTo: 'inicio',
    pathMatch: "full"
  }
];
