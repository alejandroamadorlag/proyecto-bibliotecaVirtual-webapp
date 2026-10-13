import { Component, Input, OnInit } from '@angular/core';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';   // ← agrega MatRadioModule
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FacadeService } from '../../services/facade';
import { BibliotecariosService } from '../../services/api/bibliotecarios';
import { RegistroBiblio } from '../../partials/registro-biblio/registro-biblio';
import { RegistroCliente } from '../../partials/registro-cliente/registro-cliente';

@Component({
  imports: [
    MatRadioModule,     // ← para <mat-radio-group> y <mat-radio-button>
    FormsModule,
    RegistroBiblio,
    RegistroCliente,        // ← para [(ngModel)]
  ],
  selector: 'app-registro-screen',
  styleUrl: './registro-screen.scss',
  templateUrl: './registro-screen.html',
})
export class RegistroScreen implements OnInit{

  public tipo:string = "registro-usuarios";
  public user:any = {};

  //Banderas para el tipo de usuario
  public isBiblio:boolean = false;
  public isCliente:boolean = false;
  public editar: boolean = false;
  public tipo_user:string = "";
  //Info del usuario
  public idUser: Number = 0;
  public rol: string = "";

  constructor(
    private location : Location,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private facadeService: FacadeService,
    private bibliotecariosService: BibliotecariosService
  ){}

  ngOnInit(): void {
  // Obtener el rol de quien accede (vacío si no hay sesión)
  this.rol = this.facadeService.getUserGroup();

  // Si NO es bibliotecario (= cliente o usuario sin registrar):
  // selecciona cliente automáticamente, sin que tenga que elegir
  if (this.rol !== 'cliente') {
    this.rol = 'bibliotecario';
    this.isBiblio = true;
    this.tipo_user = 'bibliotecario';
    this.user.tipo_usuario = 'bibliotecario';
  }
}

 public regresar() {
    this.location.back();
  }

  public radioChange(event: MatRadioChange) {
    if(event.value == "bibliotecario"){
      this.isBiblio = true;
      this.tipo_user = "bibliotecario"
      this.isCliente = false;
    }else if(event.value == "cliente"){
      this.isBiblio = false;
      this.isCliente = true;
      this.tipo_user = "cliente"
    }
  }
}
