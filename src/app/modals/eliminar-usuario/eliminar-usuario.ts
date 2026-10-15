import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BibliotecariosService } from '../../services/api/bibliotecarios';

@Component({
  selector: 'app-eliminar-usuario',
  imports: [],
  templateUrl: './eliminar-usuario.html',
  styleUrl: './eliminar-usuario.scss'
})
export class EliminarUsuario {

  constructor(
    private bibliotecariosService: BibliotecariosService,
    private dialogRef: MatDialogRef<EliminarUsuario>,
    @Inject(MAT_DIALOG_DATA) public data: any   // recibe { id } = id del usuario
  ) {}

  public eliminar(): void {
    // Soft-delete: el backend marca is_active = 0 en el usuario
    this.bibliotecariosService.eliminarBiblio(this.data.id).subscribe({
      next: () => { this.dialogRef.close({ isDelete: true }); },
      error: (e) => {
        console.error("Error al eliminar usuario", e);
        this.dialogRef.close({ isDelete: false });
      }
    });
  }

  public cerrar(): void {
    this.dialogRef.close({ isDelete: false });
  }
}
