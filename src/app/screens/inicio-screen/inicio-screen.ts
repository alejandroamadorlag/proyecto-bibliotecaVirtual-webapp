import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FacadeService } from '../../services/facade';
import { DashboardService } from '../../services/api/dashboard';

@Component({
  selector: 'app-inicio-screen',
  imports: [CommonModule],
  templateUrl: './inicio-screen.html',
  styleUrl: './inicio-screen.scss'
})
export class InicioScreen implements OnInit {

  public token = "";
  public rol = "";
  public nombre = "";
  public saludo = "";
  public fecha = "";

  public contadores: any = {
    total_libros: 0,
    prestamos_proceso: 0,
    clientes_registrados: 0,
    bibliotecarios_registrados: 0,
    generos_registrados: 0,
    autores_registrados: 0
  };

  constructor(
    private facadeService: FacadeService,
    private dashboardService: DashboardService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.token = this.facadeService.getSessionToken();
    if (this.token == "") { this.router.navigate([""]); return; }

    this.rol = this.facadeService.getUserGroup();

    const completo = this.facadeService.getUserCompleteName() || "";
    this.nombre = completo.split(' ')[0];

    const hoy = new Date();
    this.fecha = hoy.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' }).toUpperCase();
    const h = hoy.getHours();
    this.saludo = h < 12 ? 'Buenos días' : (h < 19 ? 'Buenas tardes' : 'Buenas noches');

    this.obtenerContadores();
  }

  public obtenerContadores(): void {
    this.dashboardService.obtenerContadores().subscribe({
      next: (r) => {
        this.contadores = r;
        this.cdr.detectChanges(); },
      error: (e) => { console.error("Error al obtener contadores", e); }
    });
  }
}
