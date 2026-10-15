import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FacadeService } from '../../services/facade';
import { AutoresService } from '../../services/api/autores';
import { MatDialog } from '@angular/material/dialog';
import { RegistroAutor } from '../../modals/registro-autor/registro-autor';
import { EliminarAutor } from '../../modals/eliminar-autor/eliminar-autor';

@Component({
  selector: 'app-autores-screen',
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './autores-screen.html',
  styleUrl: './autores-screen.scss'
})
export class AutoresScreen implements OnInit, AfterViewInit {

  public name_user: string = "";
  public rol: string = "";
  public lista_autores: any[] = [];
  public token : string = "";

  public displayedColumns: string[] = ['id', 'nombre', 'nacionalidad', 'editar', 'eliminar'];
  public dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private facadeService: FacadeService,
    private autoresService: AutoresService,
    public dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.name_user = this.facadeService.getUserCompleteName();
    this.rol = this.facadeService.getUserGroup();
    //Validar que haya inicio de sesión
    //Obtengo el token del login
    this.token = this.facadeService.getSessionToken();
    console.log("Token: ", this.token);
    if(this.token == ""){
      this.router.navigate([""]);
    }
    //Obtener Autores
    this.obtenerAutores();
  }

  // El paginador se asigna aquí porque hasta este momento ya existe en el DOM
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public obtenerAutores(): void {
    this.autoresService.obtenerListaAutores().subscribe({
      next: (response) => {
        this.lista_autores = response;
        this.dataSource.data = this.lista_autores;   // alimenta la tabla
      },
      error: (error) => {
        console.error("Error al obtener autores", error);
      }
    });
  }



  public goEditar(id: number): void {
    const autor = this.lista_autores.find(a => a.id === id);
    const dialogRef = this.dialog.open(RegistroAutor, {
      width: '590px',
      panelClass: 'modal-autor-panel',
      disableClose: true,
      data: { autor }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.recargar) { this.obtenerAutores(); }
    });
  }

  public delete(id: number): void {
  const dialogRef = this.dialog.open(EliminarAutor, {
    width: '390px',
    panelClass: 'modal-autor-panel',   // reutiliza el modal redondeado
    data: { id }
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result?.isDelete) {
      this.obtenerAutores();   // recarga la tabla
    }
  });
  }

  public registrarAutor(): void {
  const dialogRef = this.dialog.open(RegistroAutor, {
    width: '590px',
    panelClass: 'modal-autor-panel',   // ← ESTA línea es la que falta
    disableClose: true
  });

  // Se ejecuta DESPUÉS de cerrar el modal
  dialogRef.afterClosed().subscribe((result) => {
    if (result?.recargar) {
      this.obtenerAutores();     // recarga la tabla con los datos nuevos
    }
  });
}

public applyFilter(event: Event): void {
  const valor = (event.target as HTMLInputElement).value;
  this.dataSource.filter = valor.trim().toLowerCase();
}

}
