import { Routes } from '@angular/router';
import {LandingPageComponent} from "./componentes/INICIO/landing-page/landing-page.component";
import {RegistrarseComponent} from "./componentes/registrarse/registrarse.component";
import {IndentificarseComponent} from "./componentes/indentificarse/indentificarse.component";
import {FormularioComponent} from "./componentes/CONTACTO/formulario/formulario.component";

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
    component: RegistrarseComponent
  },
  {
    path: 'identificarse',
    component: IndentificarseComponent
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
