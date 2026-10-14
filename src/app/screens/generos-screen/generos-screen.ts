import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { FacadeService } from '../../services/facade';
import { GenerosService } from '../../services/api/generos';
import { RegistroGenero } from '../../modals/registro-genero/registro-genero';

@Component({
  selector: 'app-generos-screen',
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './generos-screen.html',
  styleUrl: './generos-screen.scss'
})
export class GenerosScreen implements OnInit, AfterViewInit {

  public name_user: string = "";
  public rol: string = "";
  public lista_generos: any[] = [];
  public token: string = "";

  public displayedColumns: string[] = ['id', 'nombre', 'editar', 'eliminar'];
  public dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private facadeService: FacadeService,
    private generosService: GenerosService,
    public dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.name_user = this.facadeService.getUserCompleteName();
    this.rol = this.facadeService.getUserGroup();
    this.token = this.facadeService.getSessionToken();
    if (this.token == "") {
      this.router.navigate([""]);
    }
    this.obtenerGeneros();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public obtenerGeneros(): void {
    this.generosService.obtenerListaGeneros().subscribe({
      next: (response) => {
        this.lista_generos = response;
        this.dataSource.data = this.lista_generos;
      },
      error: (error) => {
        console.error("Error al obtener géneros", error);
      }
    });
  }

  public registrarGenero(): void {
    const dialogRef = this.dialog.open(RegistroGenero, {
      width: '480px',
      panelClass: 'modal-autor-panel',   // reutiliza el estilo de modal redondeado
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.recargar) { this.obtenerGeneros(); }
    });
  }

  public goEditar(id: number): void {
    const genero = this.lista_generos.find(g => g.id === id);
    const dialogRef = this.dialog.open(RegistroGenero, {
      width: '480px',
      panelClass: 'modal-autor-panel',
      disableClose: true,
      data: { genero }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.recargar) { this.obtenerGeneros(); }
    });
  }

  public delete(id: number): void {
    // Pendiente: confirmación + llamada a eliminarGenero
  }
}
