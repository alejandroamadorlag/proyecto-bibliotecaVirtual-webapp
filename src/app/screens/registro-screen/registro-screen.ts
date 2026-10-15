import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';   // ← agrega MatRadioModule
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FacadeService } from '../../services/facade';
import { BibliotecariosService } from '../../services/api/bibliotecarios';
import { RegistroBiblio } from '../../partials/registro-biblio/registro-biblio';
import { RegistroCliente } from '../../partials/registro-cliente/registro-cliente';
import { ClientesService } from '../../services/api/clientes';

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
    private bibliotecariosService: BibliotecariosService,
    private clientesService: ClientesService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
  this.rol = this.facadeService.getUserGroup();

  // Modo edición de cliente (viene id en la URL)
  if (this.activatedRoute.snapshot.params['id'] != undefined) {
    this.editar = true;
    this.idUser = this.activatedRoute.snapshot.params['id'];
    this.obtenerClienteByID();
    return;
  }

  // Alta nueva
  if (this.rol === 'bibliotecario') {
    // Bibliotecario: puede registrar ambos → muestra radios, por defecto bibliotecario
    this.isBiblio = true;
    this.tipo_user = 'bibliotecario';
    this.user.tipo_usuario = 'bibliotecario';
  } else {
    // Sin sesión o cliente: solo cliente (sin radios)
    this.rol = 'cliente';
    this.isCliente = true;
    this.tipo_user = 'cliente';
    this.user.tipo_usuario = 'cliente';
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

  public obtenerClienteByID(): void {
  this.clientesService.getClienteByID(this.idUser).subscribe({
    next: (response) => {
      console.log("Cliente recibido del backend:", response);   // ← debug
      this.user = {
        id: response.id,
        first_name: response.user?.first_name,
        last_name:  response.user?.last_name,
        email:      response.user?.email,
        telefono:   response.telefono,
        direccion:  response.direccion,
        tipo_usuario: 'cliente'
      };
      this.tipo_user = 'cliente';
      this.isCliente = true;
      this.cdr.detectChanges();
    },
    error: (e) => { console.error("ERROR al traer cliente:", e); }   // ← debug
  });
}

}
