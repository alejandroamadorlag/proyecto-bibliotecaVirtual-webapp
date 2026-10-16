import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FacadeService } from '../../services/facade';
import { PrestamosService } from '../../services/api/prestamos';
import { LibrosService } from '../../services/api/libros';
import { ClientesService } from '../../services/api/clientes';

@Component({
  selector: 'app-registrar-prestamo',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule],
  templateUrl: './registrar-prestamo.html',
  styleUrl: './registrar-prestamo.scss'
})
export class RegistrarPrestamo implements OnInit {

  public prestamo: any = {};
  public errors: any = {};
  public editar: boolean = false;

  public lista_libros: any[] = [];
  public lista_clientes: any[] = [];
  public librosFiltrados: any[] = [];
  public clientesFiltrados: any[] = [];

  public libroSeleccionado: any = '';
  public clienteSeleccionado: any = '';

  constructor(
    private facadeService: FacadeService,
    private prestamosService: PrestamosService,
    private librosService: LibrosService,
    private clientesService: ClientesService,
    private dialogRef: MatDialogRef<RegistrarPrestamo>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.prestamo = this.prestamosService.esquemaPrestamo();

    // Modo edición (devolver libro): llega el préstamo por data
    if (this.data?.prestamo) {
      this.editar = true;
      this.prestamo = { ...this.data.prestamo };
      // Prellenamos el texto de los inputs con lo que ya trae el préstamo
      this.libroSeleccionado   = { id_libro: this.prestamo.id_libro, titulo: this.data.prestamo.nombre_libro };
      this.clienteSeleccionado = { id: this.prestamo.id_cliente,
                                   user: { first_name: '', last_name: this.data.prestamo.apellido_cliente } };
    }

    this.obtenerLibros();
    this.obtenerClientes();
  }

  // Solo libros disponibles (is_active=1)
  public obtenerLibros(): void {
    this.librosService.obtenerListaLibros().subscribe({
      next: (r) => { this.lista_libros = r; this.librosFiltrados = r; },
      error: (e) => { console.error("Error al obtener libros", e); }
    });
  }

  // Solo clientes activos (lista-clientes ya filtra user__is_active=1)
  public obtenerClientes(): void {
    this.clientesService.obtenerListaClientes().subscribe({
      next: (r) => { this.lista_clientes = r; this.clientesFiltrados = r; },
      error: (e) => { console.error("Error al obtener clientes", e); }
    });
  }

  public filtrarLibros(valor: any): void {
    const texto = typeof valor === 'string' ? valor.toLowerCase() : '';
    this.librosFiltrados = this.lista_libros.filter(l =>
      (l.titulo || '').toLowerCase().includes(texto)
    );
  }

  public filtrarClientes(valor: any): void {
    const texto = typeof valor === 'string' ? valor.toLowerCase() : '';
    this.clientesFiltrados = this.lista_clientes.filter(c =>
      `${c.user?.first_name} ${c.user?.last_name}`.toLowerCase().includes(texto)
    );
  }

  public mostrarLibro(l: any): string {
    return l ? (l.titulo || '') : '';
  }
  public mostrarCliente(c: any): string {
    return c ? `${c.user?.first_name || ''} ${c.user?.last_name || ''}`.trim() : '';
  }

  // Guardamos el ID (no el nombre)
  public seleccionarLibro(event: MatAutocompleteSelectedEvent): void {
    this.prestamo.id_libro = event.option.value.id_libro;
  }
  public seleccionarCliente(event: MatAutocompleteSelectedEvent): void {
    this.prestamo.id_cliente = event.option.value.id;
  }

  public registrar(): void {
    // Fecha de registro = hoy (sin input), formato YYYY-MM-DD
    this.prestamo.fecha_prestamo = new Date().toISOString().split('T')[0];
    // Bibliotecario con sesión iniciada (User.id en la cookie)
    this.prestamo.id_bibliotecario = this.facadeService.getUserId();

    this.errors = this.prestamosService.validarPrestamo(this.prestamo, false);
    if (Object.keys(this.errors).length > 0) return;

    this.prestamosService.registrarPrestamo(this.prestamo).subscribe({
      next: () => {
        // Al prestarse, el libro deja de estar disponible y sube el contador del cliente
        this.prestamosService.incrementarPrestamosCliente(this.prestamo.id_cliente).subscribe();
        this.prestamosService.libroInactivo(this.prestamo.id_libro).subscribe({
          next: () => this.dialogRef.close({ recargar: true }),
          error: () => this.dialogRef.close({ recargar: true })
        });
      },
      error: (e) => { console.error("Error al registrar préstamo", e); }
    });
  }

  public actualizar(): void {
    this.errors = this.prestamosService.validarPrestamo(this.prestamo, true);
    if (Object.keys(this.errors).length > 0) return;

    // El backend necesita todos estos campos y él solito pone estado=terminado, is_active=0
    this.prestamosService.editarPrestamo(this.prestamo).subscribe({
      next: () => {
        // El libro devuelto vuelve a estar disponible
        this.prestamosService.libroActivo(this.prestamo.id_libro).subscribe({
          next: () => this.dialogRef.close({ recargar: true }),
          error: () => this.dialogRef.close({ recargar: true })
        });
      },
      error: (e) => { console.error("Error al actualizar préstamo", e); }
    });
  }

  public cerrar(): void {
    this.dialogRef.close();
  }
}
