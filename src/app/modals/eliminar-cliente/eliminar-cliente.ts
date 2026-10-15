import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientesService } from '../../services/api/clientes';

@Component({
  selector: 'app-eliminar-cliente',
  imports: [],
  templateUrl: './eliminar-cliente.html',
  styleUrl: './eliminar-cliente.scss'
})
export class EliminarCliente {

  constructor(
    private clientesService: ClientesService,
    private dialogRef: MatDialogRef<EliminarCliente>,
    @Inject(MAT_DIALOG_DATA) public data: any   // recibe { id } = id del USUARIO
  ) {}

  public eliminar(): void {
    // Soft-delete: el backend marca is_active = 0 en el usuario
    this.clientesService.eliminarCliente(this.data.id).subscribe({
      next: () => { this.dialogRef.close({ isDelete: true }); },
      error: (e) => {
        console.error("Error al eliminar cliente", e);
        this.dialogRef.close({ isDelete: false });
      }
    });
  }

  public cerrar(): void {
    this.dialogRef.close({ isDelete: false });
  }
}
