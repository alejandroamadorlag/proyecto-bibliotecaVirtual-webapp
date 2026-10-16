import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { Router } from '@angular/router';
import { FacadeService } from '../../services/facade';
import { ClientesService } from '../../services/api/clientes';
import { LibrosService } from '../../services/api/libros';

@Component({
  selector: 'app-actividad-screen',
  imports: [BaseChartDirective],
  templateUrl: './actividad-screen.html',
  styleUrl: './actividad-screen.scss'
})
export class ActividadScreen implements OnInit {

  public token = "";

  // ----- Barras: clientes más activos -----
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Préstamos solicitados',
        backgroundColor: ['#0092b8', '#f2a93b', '#7c5cda', '#2f9e6e', '#e0607e'],
        borderRadius: 6  }
    ]
  };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      datalabels: { color: '#17242d', anchor: 'end', align: 'top', font: { weight: 'bold' } }
    },
    scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
  };
  public barChartPlugins = [ DatalabelsPlugin ];

  // ----- Pastel: top 5 libros más prestados -----
  public pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      { data: [], backgroundColor: ['#e62b2b', '#f2a93b', '#7c5cda', '#2f9e6e', '#e0607e'] }
    ]
  };
  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
      datalabels: { color: '#fff', font: { weight: 'bold' } }
    }
  };
  public pieChartPlugins = [ DatalabelsPlugin ];

  constructor(
    private facadeService: FacadeService,
    private clientesService: ClientesService,
    private librosService: LibrosService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.token = this.facadeService.getSessionToken();
    if (this.token == "") { this.router.navigate([""]); return; }

    this.obtenerClientesActivos();
    this.obtenerLibrosPopulares();
  }

  public obtenerClientesActivos(): void {
    this.clientesService.obtenerListaClientesMasActivos().subscribe({
      next: (r) => {
        this.barChartData.labels = r.map((c: any) => `${c.user?.first_name ?? ''} ${c.user?.last_name ?? ''}`.trim());
        this.barChartData.datasets[0].data = r.map((c: any) => c.prestamos_solicitados || 0);
        this.barChartData = { ...this.barChartData };   // dispara el repintado de la gráfica
        this.cdr.detectChanges();
      },
      error: (e) => { console.error("Error al obtener clientes más activos", e); }
    });
  }

  public obtenerLibrosPopulares(): void {
    this.librosService.obtenerListaLibrosPopulares().subscribe({
      next: (r) => {
        this.pieChartData.labels = r.map((l: any) => l.titulo);
        this.pieChartData.datasets[0].data = r.map((l: any) => l.veces_prestado || 0);
        this.pieChartData = { ...this.pieChartData };
        this.cdr.detectChanges();
      },
      error: (e) => { console.error("Error al obtener libros populares", e); }
    });
  }
}
