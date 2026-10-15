import { Routes } from '@angular/router';
import { LoginScreen } from './screens/login-screen/login-screen';
import { HomeScreen } from './screens/home-screen/home-screen';
import { RegistroScreen } from './screens/registro-screen/registro-screen';
import { AutoresScreen } from './screens/autores-screen/autores-screen';
import { GenerosScreen } from './screens/generos-screen/generos-screen';
import { LibrosScreen } from './screens/libros-screen/libros-screen';
import { ClientesScreen } from './screens/clientes-screen/clientes-screen';
import { PrestamosScreen } from './screens/prestamos-screen/prestamos-screen';
import { UsuariosScreen } from './screens/usuarios-screen/usuarios-screen';
import { ActividadScreen } from './screens/actividad-screen/actividad-screen';
import { InicioScreen } from './screens/inicio-screen/inicio-screen';

export const routes: Routes = [
  { path: '', component: LoginScreen },
  { path: 'registro', component: RegistroScreen },
  { path: 'registro/:id', component: RegistroScreen },
  {
  path: 'home',
  component: HomeScreen,          // el layout (sidebar + topbar + outlet)
  children: [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },  // al entrar a /home carga inicio
    { path: 'inicio', component: InicioScreen },
    { path: 'autores', component: AutoresScreen },
    { path: 'generos', component: GenerosScreen },
    { path: 'libros', component: LibrosScreen },
    { path: 'clientes', component: ClientesScreen },
    { path: 'prestamos', component: PrestamosScreen },
    { path: 'usuarios', component: UsuariosScreen },
    { path: 'actividad', component: ActividadScreen },
  ]
},
];
