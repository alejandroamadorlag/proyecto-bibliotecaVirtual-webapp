import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FacadeService } from '../../services/facade';
import { LibrosService } from '../../services/api/libros';
import { AutoresService } from '../../services/api/autores';
import { GenerosService } from '../../services/api/generos';

@Component({
  selector: 'app-registro-libro',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule],
  templateUrl: './registro-libro.html',
  styleUrl: './registro-libro.scss'
})
export class RegistroLibro implements OnInit {

  public libro: any = {};
  public errors: any = {};
  public editar: boolean = false;

  public lista_autores: any[] = [];
  public lista_generos: any[] = [];
  public autoresFiltrados: any[] = [];
  public generosFiltrados: any[] = [];

  // Lo que se muestra/escribe en cada input
  public autorSeleccionado: any = '';
  public generoSeleccionado: any = '';

  constructor(
    private facadeService: FacadeService,
    private librosService: LibrosService,
    private autoresService: AutoresService,
    private generosService: GenerosService,
    private dialogRef: MatDialogRef<RegistroLibro>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.libro = this.librosService.esquemaLibro();

    if (this.data?.libro) {
      this.editar = true;
      this.libro = { ...this.data.libro };
    }

    this.obtenerAutores();
    this.obtenerGeneros();
  }

  public obtenerAutores(): void {
    this.autoresService.obtenerListaAutores().subscribe({
      next: (r) => {
        this.lista_autores = r;
        this.autoresFiltrados = r;
        // Preseleccionar en modo edición
        if (this.editar) {
          const a = this.lista_autores.find(x => x.id == this.libro.id_autor);
          if (a) this.autorSeleccionado = a;
        }
      },
      error: (e) => { console.error("Error al obtener autores", e); }
    });
  }

  public obtenerGeneros(): void {
    this.generosService.obtenerListaGeneros().subscribe({
      next: (r) => {
        this.lista_generos = r;
        this.generosFiltrados = r;
        if (this.editar) {
          const g = this.lista_generos.find(x => x.id == this.libro.id_genero);
          if (g) this.generoSeleccionado = g;
        }
      },
      error: (e) => { console.error("Error al obtener géneros", e); }
    });
  }

  // Filtrado al escribir
  public filtrarAutores(valor: any): void {
    const texto = typeof valor === 'string' ? valor.toLowerCase() : '';
    this.autoresFiltrados = this.lista_autores.filter(a =>
      `${a.first_name} ${a.last_name}`.toLowerCase().includes(texto)
    );
  }

  public filtrarGeneros(valor: any): void {
    const texto = typeof valor === 'string' ? valor.toLowerCase() : '';
    this.generosFiltrados = this.lista_generos.filter(g =>
      (g.nombre_genero || '').toLowerCase().includes(texto)
    );
  }

  // Cómo se muestra el valor seleccionado en el input
  public mostrarAutor(a: any): string {
    return a ? `${a.first_name} ${a.last_name}` : '';
  }
  public mostrarGenero(g: any): string {
    return g ? g.nombre_genero : '';
  }

  // Guardar el ID al seleccionar (sigue guardando el id, solo muestra el nombre)
  public seleccionarAutor(event: MatAutocompleteSelectedEvent): void {
    this.libro.id_autor = event.option.value.id;
  }
  public seleccionarGenero(event: MatAutocompleteSelectedEvent): void {
    this.libro.id_genero = event.option.value.id;
  }

  public registrar(): void {
  // La fecha de registro es la fecha actual (cuándo se registra el libro), formato YYYY-MM-DD
  this.libro.fecha_registro = new Date().toISOString().split('T')[0];

  this.errors = this.librosService.validarLibro(this.libro, this.editar);
  if (Object.keys(this.errors).length > 0) return;

  this.librosService.registrarLibro(this.libro).subscribe({
    next: () => { this.dialogRef.close({ recargar: true }); },
    error: (e) => { console.error("Error al registrar libro", e); }
  });
}

  public actualizar(): void {
  this.errors = this.librosService.validarLibro(this.libro, this.editar);
  if (Object.keys(this.errors).length > 0) return;

  this.librosService.editarLibro(this.libro).subscribe({
    next: () => { this.dialogRef.close({ recargar: true }); },
    error: (e) => { console.error("Error al actualizar libro", e); }
  });
}

  public cerrar(): void {
    this.dialogRef.close();
  }
}
