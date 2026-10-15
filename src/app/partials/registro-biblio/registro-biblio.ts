import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective } from 'ngx-mask';
import { Router } from '@angular/router';
import { BibliotecariosService } from '../../services/api/bibliotecarios';
import { Location } from '@angular/common';


@Component({
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgxMaskDirective,
  ],
  selector: 'app-registro-biblio',
  styleUrl: './registro-biblio.scss',
  templateUrl: './registro-biblio.html',
})
export class RegistroBiblio implements OnInit{

  @Input() rol: string = "";
  @Input() datos_user: any = {};

  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  public bibliotecario:any = {};
  public errors:any={};
  public editar:boolean = false;
  public token:string = "";

  constructor(
    private bibliotecariosService: BibliotecariosService,
    private router: Router,
    private location : Location
  ){}

  ngOnInit(): void {
    this.bibliotecario = this.bibliotecariosService.esquemaBibliotecario();

    this.bibliotecario.rol = this.rol;

    console.log("Datos del bibliotecario: ", this.bibliotecario);

    if (this.datos_user && this.datos_user.id) {
    this.editar = true;
    this.bibliotecario = { ...this.datos_user };
    this.bibliotecario.rol = this.rol;
  } else {
    this.bibliotecario = this.bibliotecariosService.esquemaBibliotecario();
    this.bibliotecario.rol = this.rol;
  }

  }

  //Funciones para password
  showPassword()
  {
    if(this.inputType_1 == 'password'){
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else{
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  showPwdConfirmar()
  {
    if(this.inputType_2 == 'password'){
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }
    else{
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }

  public regresar(){
    this.location.back();
  }

  public registrar(){
     //Validar
    this.errors = [];

    this.errors = this.bibliotecariosService.validarAdmin(this.bibliotecario, this.editar);
    if(Object.keys(this.errors).length > 0){
      return;
    }

    //Validar la contraseña
    if(this.bibliotecario.password == this.bibliotecario.confirmar_password){
      //Entra a registrar
      this.bibliotecariosService.registrarBibliotecario(this.bibliotecario).subscribe(
        (response)=>{
          //Aquí va la ejecución del servicio si todo es correcto
          alert("Usuario registrado correctamente");
          console.log("Usuario registrado: ", response);
          if(this.token != ""){
            this.router.navigate(["home"]);
          }else{
            this.router.navigate(["/"]);
          }
        }, (error)=>{
          //Aquí se ejecuta el error
          alert("No se pudo registrar usuario");
        }
      );
    }else{
      alert("Las contraseñas no coinciden");
      this.bibliotecario.password="";
      this.bibliotecario.confirmar_password="";
    }
  }

  public actualizar(): void {
  this.errors = this.bibliotecariosService.validarAdmin(this.bibliotecario, this.editar);
  if (Object.keys(this.errors).length > 0) return;

  this.bibliotecariosService.editarBibliotecario(this.bibliotecario).subscribe({
    next: () => {
      alert("Bibliotecario actualizado correctamente");
      this.router.navigate(['/home/usuarios']);
    },
    error: (e) => {
      alert("No se pudo actualizar el bibliotecario");
      console.error("Error al actualizar bibliotecario", e);
    }
  });
}

  public soloLetras(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    // Permitir solo letras (mayúsculas y minúsculas) y espacio
    if (
      !(charCode >= 65 && charCode <= 90) &&  // Letras mayúsculas
      !(charCode >= 97 && charCode <= 122) && // Letras minúsculas
      charCode !== 32                         // Espacio
    ) {
      event.preventDefault();
    }
  }

    //Función para detectar el cambio de fecha
  //Para la fecha
  public changeFecha(event :any){
    console.log(event);
    console.log(event.value.toISOString());

    this.bibliotecario.fecha_nacimiento = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.bibliotecario.fecha_nacimiento);
  }
}
