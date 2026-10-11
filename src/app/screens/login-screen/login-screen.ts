import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  imports: [
    FormsModule,
  ],
  selector: 'app-login-screen',
  styleUrl: './login-screen.scss',
  templateUrl: './login-screen.html',
})
export class LoginScreen implements OnInit{

  public type: string = "password";
  public username:string = "";
  public password:string = "";

  public errors:any = {};

  ngOnInit(): void {
    // tu lógica de inicialización
  }

  constructor(
    private router: Router,

  ){}

  public login(){
  }

  public registrar(){
    this.router.navigate(["registro"]);
  }

  public showPassword(){
    this.type = this.type === "password" ? "text" : "password";
  }
}
