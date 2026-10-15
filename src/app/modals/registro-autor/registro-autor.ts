import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FacadeService } from '../../services/facade';
import { AutoresService } from '../../services/api/autores';

@Component({
  selector: 'app-registro-autor',
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './registro-autor.html',
  styleUrl: './registro-autor.scss'
})
export class RegistroAutor implements OnInit {

  public autor: any = {};
  public errors: any = {};
  public editar: boolean = false;

  constructor(
    private facadeService: FacadeService,
    private autoresService: AutoresService,
    private dialogRef: MatDialogRef<RegistroAutor>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.autor = this.autoresService.esquemaAutor();   // estructura vacía: {first_name, last_name, nacionalidad}

    // Si el padre abrió el modal con un autor, es edición
    if (this.data?.autor) {
      this.editar = true;
      this.autor = { ...this.data.autor };
    }
  }

  // Bloquea números/símbolos en nombre y apellidos
  public soloLetras(event: KeyboardEvent): void {
    const patron = /[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/;
    if (!patron.test(event.key)) {
      event.preventDefault();
    }
  }

  public registrar(): void {
    this.errors = this.autoresService.validarAutor(this.autor, this.editar);
    if (Object.keys(this.errors).length > 0) return;

    this.autoresService.registrarAutor(this.autor).subscribe({
      next: () => { this.dialogRef.close({ recargar: true }); },   // cierra y avisa a la tabla
      error: (error) => { console.error("Error al registrar autor", error); }
    });
  }

  public actualizar(): void {
  this.errors = this.autoresService.validarAutor(this.autor, this.editar);
  if (Object.keys(this.errors).length > 0) return;

  this.autoresService.editarAutor(this.autor).subscribe({
    next: () => { this.dialogRef.close({ recargar: true }); },
    error: (e) => { console.error("Error al actualizar autor", e); }
  });
}



  public cerrar(): void {
    this.dialogRef.close();   // cierra sin recargar (Cancelar)
  }
}
