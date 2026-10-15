import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { FacadeService } from '../../services/facade';
import { ClientesService } from '../../services/api/clientes';
import { EliminarCliente } from '../../modals/eliminar-cliente/eliminar-cliente';

@Component({
  selector: 'app-clientes-screen',
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './clientes-screen.html',
  styleUrl: './clientes-screen.scss'
})
export class ClientesScreen implements OnInit, AfterViewInit {

  public rol: string = "";
  public token: string = "";
  public lista_clientes: any[] = [];

  public displayedColumns: string[] = ['id', 'nombre', 'email', 'telefono', 'editar', 'eliminar'];
  public dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private facadeService: FacadeService,
    private clientesService: ClientesService,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.rol = this.facadeService.getUserGroup();
    this.token = this.facadeService.getSessionToken();
    if (this.token == "") { this.router.navigate([""]); }
    this.obtenerClientes();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public obtenerClientes(): void {
  this.clientesService.obtenerListaClientes().subscribe({
    next: (r) => {
      this.lista_clientes = r;
      this.lista_clientes.forEach(c => {
        c.first_name = c.user?.first_name;
        c.last_name  = c.user?.last_name;
        c.email      = c.user?.email;
        c.user_id    = c.user?.id;      // ← id del usuario, para eliminar
      });
      this.dataSource.data = this.lista_clientes;
    },
    error: (e) => { console.error("Error al obtener clientes", e); }
  });
}

  // El botón de registro NO abre modal: navega a la pantalla de registro
  public registrarCliente(): void {
    this.router.navigate(['registro']);
  }

  public goEditar(id: number): void {
    this.router.navigate(['registro', id]);   // ← requiere una ruta registro/:id (ver nota)
  }

  public delete(idUsuario: number): void {
  const dialogRef = this.dialog.open(EliminarCliente, {
    width: '390px',
    panelClass: 'modal-autor-panel',
    data: { id: idUsuario }
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result?.isDelete) {
      this.obtenerClientes();
    }
  });
}

  public applyFilter(event: Event): void {
  const valor = (event.target as HTMLInputElement).value;
  this.dataSource.filter = valor.trim().toLowerCase();
  }

}
