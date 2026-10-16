import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { FacadeService } from '../../services/facade';
import { PrestamosService } from '../../services/api/prestamos';
import { RegistrarPrestamo } from '../../modals/registrar-prestamo/registrar-prestamo';
import { EliminarPrestamo } from '../../modals/eliminar-prestamo/eliminar-prestamo';

@Component({
  selector: 'app-prestamos-screen',
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './prestamos-screen.html',
  styleUrl: './prestamos-screen.scss'
})
export class PrestamosScreen implements OnInit, AfterViewInit {

  public rol: string = "";
  public token: string = "";
  public lista_prestamos: any[] = [];

  public displayedColumns: string[] = [
    'titulo', 'fecha_inicio', 'fecha_esperada', 'fecha_real',
    'cliente', 'estado', 'bibliotecario', 'editar', 'eliminar'
  ];
  public dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private facadeService: FacadeService,
    private prestamosService: PrestamosService,
    public dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.rol = this.facadeService.getUserGroup();
    this.token = this.facadeService.getSessionToken();
    if (this.token == "") { this.router.navigate([""]); }
    this.obtenerPrestamos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public obtenerPrestamos(): void {
    this.prestamosService.obtenerListaPrestamosTodos().subscribe({
      next: (r) => { this.lista_prestamos = r; this.dataSource.data = r; },
      error: (e) => { console.error("Error al obtener préstamos", e); }
    });
  }

  public registrarPrestamo(): void {
    const dialogRef = this.dialog.open(RegistrarPrestamo, {
      width: '590px',
      panelClass: 'modal-autor-panel',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((res) => { if (res?.recargar) this.obtenerPrestamos(); });
  }

  public goEditar(id: number): void {
    const prestamo = this.lista_prestamos.find(p => p.id === id);
    const dialogRef = this.dialog.open(RegistrarPrestamo, {
      width: '590px',
      panelClass: 'modal-autor-panel',
      disableClose: true,
      data: { prestamo }
    });
    dialogRef.afterClosed().subscribe((res) => { if (res?.recargar) this.obtenerPrestamos(); });
  }

  public delete(id: number): void {
    const dialogRef = this.dialog.open(EliminarPrestamo, {
      width: '390px',
      panelClass: 'modal-autor-panel',
      data: { id }
    });
    dialogRef.afterClosed().subscribe((result) => { if (result?.isDelete) this.obtenerPrestamos(); });
  }

  public applyFilter(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }
}
