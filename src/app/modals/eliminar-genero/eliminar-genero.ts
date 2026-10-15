import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenerosService } from '../../services/api/generos';

@Component({
  selector: 'app-eliminar-genero',
  imports: [],
  templateUrl: './eliminar-genero.html',
  styleUrl: './eliminar-genero.scss'
})
export class EliminarGenero {

  constructor(
    private generosService: GenerosService,
    private dialogRef: MatDialogRef<EliminarGenero>,
    @Inject(MAT_DIALOG_DATA) public data: any   // recibe { id }
  ) {}

  public eliminar(): void {
    // Soft-delete: el backend solo marca is_active = 0
    this.generosService.eliminarGenero(this.data.id).subscribe({
      next: () => { this.dialogRef.close({ isDelete: true }); },
      error: (e) => {
        console.error("Error al eliminar género", e);
        this.dialogRef.close({ isDelete: false });
      }
    });
  }

  public cerrar(): void {
    this.dialogRef.close({ isDelete: false });
  }
}
