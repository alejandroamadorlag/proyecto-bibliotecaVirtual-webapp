import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective } from 'ngx-mask';
import { ClientesService } from '../../services/api/clientes';   // ajusta la ruta/clase a la tuya

@Component({
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    NgxMaskDirective,
  ],
  selector: 'app-registro-cliente',
  styleUrl: './registro-cliente.scss',
  templateUrl: './registro-cliente.html',
})
export class RegistroCliente implements OnInit {

  @Input() rol: string = '';
  @Input() datos_user: any = {};

  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  public cliente: any = {};
  public errors: any = {};
  public editar: boolean = false;
  public token: string = "";

  //Para el select
  public areas: any[] = [
    { value: 'cliente', viewValue: 'Cliente' },
  ];

  constructor(
    private clientesService : ClientesService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
  this.cliente = this.clientesService.esquemaCliente();   // ← del servicio, no de cliente
  this.cliente.rol = this.rol;

  if (this.datos_user && this.datos_user.id) {   // ← solo es edición si trae un id
    this.editar = true;
    this.cliente = { ...this.datos_user };
    this.cliente.rol = this.rol;
  } else {
    this.cliente = this.clientesService.esquemaCliente();
    this.cliente.rol = this.rol;
  }
  console.log("Datos del cliente: ", this.cliente);
  }


  //Funciones para password
  showPassword() {
    if (this.inputType_1 == 'password') {
      this.inputType_1 = 'text';
      this.hide_1 = true;
    } else {
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  showPwdConfirmar() {
    if (this.inputType_2 == 'password') {
      this.inputType_2 = 'text';
      this.hide_2 = true;
    } else {
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }

  public regresar() {
    this.location.back();
  }

  public registrar() {
    //Validar
    this.errors = {};
    this.errors = this.clientesService.validarCliente(this.cliente, this.editar);
    if (Object.keys(this.errors).length > 0) {
      return;
    }

    //Validar la contraseña
    if (this.cliente.password == this.cliente.confirmar_password) {
      this.clientesService.registrarCliente(this.cliente).subscribe({
        next: (response) => {
          alert("Usuario registrado correctamente");
          console.log("Usuario registrado: ", response);
          if (this.token != "") {
            this.router.navigate(["home"]);
          } else {
            this.router.navigate(["/"]);
          }
        },
        error: (error) => {
          alert("No se pudo registrar usuario");
        }
      });
    } else {
      alert("Las contraseñas no coinciden");
      this.cliente.password = "";
      this.cliente.confirmar_password = "";
    }
  }

  public actualizar() {

  }

  public soloLetras(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    // Permitir solo letras (mayúsculas y minúsculas) y espacio
    if (
      !(charCode >= 65 && charCode <= 90) &&
      !(charCode >= 97 && charCode <= 122) &&
      charCode !== 32
    ) {
      event.preventDefault();
    }
  }

  //Función para detectar el cambio de fecha
  public changeFecha(event: any) {
    this.cliente.fecha_nacimiento = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.cliente.fecha_nacimiento);
  }
}
