import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { FacadeService } from '../../services/facade';
import { LibrosService } from '../../services/api/libros';
import { RegistroLibro } from '../../modals/registro-libro/registro-libro';
import { EliminarLibro } from '../../modals/eliminar-libro/eliminar-libro';

@Component({
  selector: 'app-libros-screen',
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './libros-screen.html',
  styleUrl: './libros-screen.scss'
})
export class LibrosScreen implements OnInit, AfterViewInit {

  public rol: string = "";
  public token: string = "";
  public lista_libros: any[] = [];

  public displayedColumns: string[] = ['id_libro', 'titulo', 'autor', 'genero', 'estado', 'editar', 'eliminar'];
  public dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private facadeService: FacadeService,
    private librosService: LibrosService,
    public dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.rol = this.facadeService.getUserGroup();
    this.token = this.facadeService.getSessionToken();
    if (this.token == "") { this.router.navigate([""]); }
    this.obtenerLibros();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public obtenerLibros(): void {
  this.librosService.obtenerListaLibrosTodos().subscribe({
    next: (r) => { this.lista_libros = r; this.dataSource.data = r; },
    error: (e) => { console.error("Error al obtener libros", e); }
  });
}

  public registrarLibro(): void {
    const dialogRef = this.dialog.open(RegistroLibro, {
      width: '590px',
      panelClass: 'modal-autor-panel',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((res) => { if (res?.recargar) this.obtenerLibros(); });
  }

  public goEditar(id: number): void {
    const libro = this.lista_libros.find(l => l.id_libro === id);
    const dialogRef = this.dialog.open(RegistroLibro, {
      width: '590px',
      panelClass: 'modal-autor-panel',
      disableClose: true,
      data: { libro }
    });
    dialogRef.afterClosed().subscribe((res) => { if (res?.recargar) this.obtenerLibros(); });
  }

  public delete(id: number): void {
  const dialogRef = this.dialog.open(EliminarLibro, {
    width: '390px',
    panelClass: 'modal-autor-panel',
    data: { id }
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result?.isDelete) {
      this.obtenerLibros();   // recarga la tabla
    }
  });
}

  public applyFilter(event: Event): void {
  const valor = (event.target as HTMLInputElement).value;
  this.dataSource.filter = valor.trim().toLowerCase();
  }

}
