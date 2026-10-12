import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-registro-biblio',
  styleUrl: './registro-biblio.scss',
  templateUrl: './registro-biblio.html',
})
export class RegistroBiblio {
  @Input() rol: string = '';
  @Input() datos_user: any;
}
