import { Routes } from '@angular/router';
import { LoginScreen } from './screens/login-screen/login-screen';
import { HomeScreen } from './screens/home-screen/home-screen';
import { RegistroScreen } from './screens/registro-screen/registro-screen';

export const routes: Routes = [
  { path: '', component: LoginScreen },
  { path: 'home', component: HomeScreen },
  { path: ' registro', component: RegistroScreen },
];
