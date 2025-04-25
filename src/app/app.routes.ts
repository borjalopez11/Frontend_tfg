import {RouterModule, Routes} from '@angular/router';
import {RegistroSesionComponent} from "./componentes/registro-sesion/registro-sesion.component";
import {CartaComponent} from "./componentes/carta/carta.component";
import { PruebaComponent } from './componentes/prueba/prueba.component';
<<<<<<< HEAD
import { LandingPageComponent } from './componentes/INICIO/landing-page/landing-page.component';
import { FormularioComponent } from './componentes/CONTACTO/formulario/formulario.component';
import { TerminosComponent } from './componentes/terminos/terminos.component';
import { ProteccionDatosComponent } from './componentes/proteccion-datos/proteccion-datos.component';
import { AvisoLegalComponent } from './componentes/aviso-legal/aviso-legal.component';
import { PoliticaPrivacidadComponent } from './componentes/politica-privacidad/politica-privacidad.component';
=======
import { LandingPageComponent } from './componentes/inicio/landing-page/landing-page.component';
import { FormularioComponent } from './componentes/contacto/formulario/formulario.component';
import {CarritoComponent} from "./componentes/carrito/carrito.component";
>>>>>>> facc24ed6239a13d5ee8adb55caf63bc3a4a35ea

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
    path: 'terminos',
    component: TerminosComponent
  },
  {
    path: 'proteccion-datos',
    component: ProteccionDatosComponent
  },
  {
    path: 'aviso-legal',
    component: AvisoLegalComponent
  },
  {
    path: 'politica-privacidad',
    component: PoliticaPrivacidadComponent
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

