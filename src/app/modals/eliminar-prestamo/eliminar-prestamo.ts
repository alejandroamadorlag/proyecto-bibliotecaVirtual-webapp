import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrestamosService } from '../../services/api/prestamos';

@Component({
  selector: 'app-eliminar-prestamo',
  imports: [],
  templateUrl: './eliminar-prestamo.html',
  styleUrl: './eliminar-prestamo.scss'
})
export class EliminarPrestamo {

  constructor(
    private prestamosService: PrestamosService,
    private dialogRef: MatDialogRef<EliminarPrestamo>,
    @Inject(MAT_DIALOG_DATA) public data: any   // recibe { id }
  ) {}

  public eliminar(): void {
    this.prestamosService.eliminarPrestamo(this.data.id).subscribe({
      next: () => { this.dialogRef.close({ isDelete: true }); },
      error: (e) => {
        console.error("Error al eliminar préstamo", e);
        this.dialogRef.close({ isDelete: false });
      }
    });
  }

  public cerrar(): void {
    this.dialogRef.close({ isDelete: false });
  }
}
