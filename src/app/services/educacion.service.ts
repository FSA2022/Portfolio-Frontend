import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../models/educacion';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  educacionURL = 'https://backportfoliofinal.herokuapp.com/api/educacion';
  // educacionURL = 'https://backportfoliofrancisco.herokuapp.com/api/educacion';
 //educacionURL = 'http://localhost:8080/api/educacion';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Educacion[]> {
    return this.httpClient.get<Educacion[]>(`${this.educacionURL}/todos`, cabecera);
  }

 public detalle(id: number): Observable<Educacion> {
    return this.httpClient.get<Educacion>(`${this.educacionURL}/detalle/${id}`, cabecera);
  }

  public crear(educacion: Educacion): Observable<Educacion> {
    return this.httpClient.post<Educacion>( `${this.educacionURL}/nuevo`, educacion, cabecera);
  }


  public editar(educacion: Educacion, id : number): Observable<Educacion> {
    return this.httpClient.put<Educacion>(`${this.educacionURL}/actualizar/${id}`, educacion, cabecera);
  }


  public borrar(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.educacionURL}/eliminar/${id}`, cabecera);
  }




}

