import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FacadeService } from '../../services/facade';
import { GenerosService } from '../../services/api/generos';

@Component({
  selector: 'app-registro-genero',
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './registro-genero.html',
  styleUrl: './registro-genero.scss'
})
export class RegistroGenero implements OnInit {

  public genero: any = {};
  public errors: any = {};
  public editar: boolean = false;

  constructor(
    private facadeService: FacadeService,
    private generosService: GenerosService,
    private dialogRef: MatDialogRef<RegistroGenero>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.genero = this.generosService.esquemaGenero();   // { nombre_genero: '' }

    if (this.data?.genero) {
      this.editar = true;
      this.genero = { ...this.data.genero };
    }
  }

  public registrar(): void {
    this.errors = this.generosService.validarGenero(this.genero, this.editar);
    if (Object.keys(this.errors).length > 0) return;

    this.generosService.registrarGenero(this.genero).subscribe({
      next: () => { this.dialogRef.close({ recargar: true }); },
      error: (error) => { console.error("Error al registrar género", error); }
    });
  }

  public actualizar(): void {
    this.errors = this.generosService.validarGenero(this.genero, this.editar);
    if (Object.keys(this.errors).length > 0) return;

    // Pendiente: tu servicio aún no tiene editarGenero(); cuando lo agregues va aquí
  }

  public cerrar(): void {
    this.dialogRef.close();
  }
}
