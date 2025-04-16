import { Routes } from '@angular/router';
import {LandingPageComponent} from "./componentes/INICIO/landing-page/landing-page.component";
import {FormularioComponent} from "./componentes/CONTACTO/formulario/formulario.component";
import {RegistroSesionComponent} from "./componentes/registro-sesion/registro-sesion.component";
import {InicioSesionComponent} from "./componentes/inicio-sesion/inicio-sesion.component";

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
    path: 'registrarse',
    component: RegistroSesionComponent
  },
  {
    path: 'identificarse',
    component: InicioSesionComponent
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
