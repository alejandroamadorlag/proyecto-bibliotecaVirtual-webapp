import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidatorService } from '../tools/validator';
import { ErrorsService } from '../tools/errors';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FacadeService } from '../facade';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private facadeService: FacadeService
  ) { }

  public esquemaPrestamo() {
    return {
      'fecha_prestamo': '',
      'fecha_devol_esperada': '',
      'fecha_devol_real': '',
      'id_libro': '',
      'id_cliente': '',
      'id_bibliotecario': ''
    }
  }

  // Validación del formulario
  public validarPrestamo(data: any, editar: boolean) {
    let error: any = [];

    if (!this.validatorService.required(data["fecha_devol_esperada"])) {
      error["fecha_devol_esperada"] = this.errorService.required;
    }
    if (!this.validatorService.required(data["id_libro"])) {
      error["id_libro"] = this.errorService.required;
    }
    if (!this.validatorService.required(data["id_cliente"])) {
      error["id_cliente"] = this.errorService.required;
    }
    // La fecha de devolución real solo se exige al actualizar (al devolver el libro)
    if (editar && !this.validatorService.required(data["fecha_devol_real"])) {
      error["fecha_devol_real"] = this.errorService.required;
    }

    return error;
  }

  // ---- Servicios HTTP ----

  // Registrar préstamo (POST)
  public registrarPrestamo(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url_api}/prestamos/`, data, httpOptions);
  }

  // Lista con TODOS los préstamos (en proceso + terminados)
  public obtenerListaPrestamosTodos(): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.get<any>(`${environment.url_api}/lista-prestamos-todos/`, { headers: headers });
  }

  // Actualizar préstamo = marcar devolución (PUT). El backend pone estado=terminado, is_active=0
  public editarPrestamo(data: any): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.put<any>(`${environment.url_api}/prestamos-edit/`, data, { headers: headers });
  }

  // Eliminar préstamo (DELETE). Ojo: aquí SÍ es borrado real (ver nota al final)
  public eliminarPrestamo(idPrestamo: any): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.delete<any>(`${environment.url_api}/prestamos-edit/?id=${idPrestamo}`, { headers: headers });
  }

  // Al prestar, el libro deja de estar disponible (is_active=0 y suma veces_prestado)
  public libroInactivo(idLibro: any): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.put<any>(`${environment.url_api}/libro-inactivo/`, { id_libro: idLibro }, { headers: headers });
  }

  // Al devolver, el libro vuelve a estar disponible (is_active=1)
  public libroActivo(idLibro: any): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.put<any>(`${environment.url_api}/libro-activo/`, { id_libro: idLibro }, { headers: headers });
  }

  // Suma 1 a los préstamos solicitados del cliente (id = Clientes.id)
  public incrementarPrestamosCliente(idCliente: any): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.put<any>(`${environment.url_api}/cliente-prestamos/`, { id: idCliente }, { headers: headers });
  }
}
