import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LibrosService } from '../../services/api/libros';

@Component({
  selector: 'app-eliminar-libro',
  imports: [],
  templateUrl: './eliminar-libro.html',
  styleUrl: './eliminar-libro.scss'
})
export class EliminarLibro {

  constructor(
    private librosService: LibrosService,
    private dialogRef: MatDialogRef<EliminarLibro>,
    @Inject(MAT_DIALOG_DATA) public data: any   // recibe { id }
  ) {}

  public eliminar(): void {
    // Soft-delete: el backend solo marca is_active = 0
    this.librosService.eliminarLibro(this.data.id).subscribe({
      next: () => { this.dialogRef.close({ isDelete: true }); },
      error: (e) => {
        console.error("Error al eliminar libro", e);
        this.dialogRef.close({ isDelete: false });
      }
    });
  }

  public cerrar(): void {
    this.dialogRef.close({ isDelete: false });
  }
}
