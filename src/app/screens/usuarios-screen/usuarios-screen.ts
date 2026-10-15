import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { FacadeService } from '../../services/facade';
import { BibliotecariosService } from '../../services/api/bibliotecarios';
import { EliminarUsuario } from '../../modals/eliminar-usuario/eliminar-usuario';

@Component({
  selector: 'app-usuarios-screen',
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './usuarios-screen.html',
  styleUrl: './usuarios-screen.scss'
})
export class UsuariosScreen implements OnInit, AfterViewInit {

  public rol: string = "";
  public token: string = "";
  public lista_usuarios: any[] = [];

  public displayedColumns: string[] = ['id', 'nombre', 'email', 'rol', 'editar', 'eliminar'];
  public dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private facadeService: FacadeService,
    private bibliotecariosService: BibliotecariosService,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.rol = this.facadeService.getUserGroup();
    this.token = this.facadeService.getSessionToken();
    if (this.token == "") { this.router.navigate([""]); }
    this.obtenerUsuarios();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public obtenerUsuarios(): void {
    this.bibliotecariosService.obtenerListaUsers().subscribe({
      next: (r) => { this.lista_usuarios = r; this.dataSource.data = r; },
      error: (e) => { console.error("Error al obtener usuarios", e); }
    });
  }

  // No abre modal: navega a la pantalla de registro
  public registrarUsuario(): void {
    this.router.navigate(['registro']);
  }

  public goEditar(element: any): void {
  if (element.rol === 'bibliotecario') {
    this.router.navigate(['registro', element.bibliotecario_id], { queryParams: { tipo: 'bibliotecario' } });
  } else {
    this.router.navigate(['registro', element.cliente_id], { queryParams: { tipo: 'cliente' } });
  }
}

  public delete(id: number): void {
  const dialogRef = this.dialog.open(EliminarUsuario, {
    width: '390px',
    panelClass: 'modal-autor-panel',
    data: { id }
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result?.isDelete) {
      this.obtenerUsuarios();
    }
  });
}

  public applyFilter(event: Event): void {
  const valor = (event.target as HTMLInputElement).value;
  this.dataSource.filter = valor.trim().toLowerCase();
  }

}
