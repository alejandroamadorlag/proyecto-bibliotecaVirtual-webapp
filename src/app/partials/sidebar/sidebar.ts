import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FacadeService } from '../../services/facade';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar implements OnInit {
  @Input() rol: string = "";

  public token: string = "";

  constructor(
    private facadeService: FacadeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.rol = this.facadeService.getUserGroup();
    console.log("Rol user: ", this.rol);
    //Validar que haya inicio de sesión
    //Obtengo el token del login
    this.token = this.facadeService.getSessionToken();
  }

  //Cerrar sesión
  public logout() {
    this.facadeService.logout().subscribe({
      next: (response) => {
        console.log("Entró");
        this.facadeService.destroyUser();
        //Navega al login
        this.router.navigate(["/"]);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
