import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../models/proyecto';


const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  proyectoURL = 'https://backportfoliofinal.herokuapp.com/api/proyecto';
  //proyectoURL = 'https://backportfoliofrancisco.herokuapp.com/api/proyecto';

 // proyectoURL = 'http://localhost:8080/api/proyecto';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Proyecto[]> {
    return this.httpClient.get<Proyecto[]>(`${this.proyectoURL}/todos`, cabecera);
  }

  public crear(proyecto: Proyecto): Observable<Proyecto> {
    return this.httpClient.post<Proyecto>( `${this.proyectoURL}/nuevo`, proyecto, cabecera);
  }


  public editar(proyecto: Proyecto, idPro : number): Observable<Proyecto> {
    return this.httpClient.put<Proyecto>(`${this.proyectoURL}/actualizar/${idPro}`, proyecto, cabecera);
  }


  public borrar(idPro: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.proyectoURL}/eliminar/${idPro}`, cabecera);
  }



}
