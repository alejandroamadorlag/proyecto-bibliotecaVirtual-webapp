import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AutoresService } from '../../services/api/autores';

@Component({
  selector: 'app-eliminar-autor',
  imports: [],
  templateUrl: './eliminar-autor.html',
  styleUrl: './eliminar-autor.scss'
})
export class EliminarAutor {

  constructor(
    private autoresService: AutoresService,
    private dialogRef: MatDialogRef<EliminarAutor>,
    @Inject(MAT_DIALOG_DATA) public data: any   // recibe { id }
  ) {}

  public eliminar(): void {
    // Soft-delete: el backend solo marca is_active = 0
    this.autoresService.eliminarAutor(this.data.id).subscribe({
      next: () => { this.dialogRef.close({ isDelete: true }); },
      error: (e) => {
        console.error("Error al eliminar autor", e);
        this.dialogRef.close({ isDelete: false });
      }
    });
  }

  public cerrar(): void {
    this.dialogRef.close({ isDelete: false });
  }
}
