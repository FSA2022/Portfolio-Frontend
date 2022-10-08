import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../models/experiencia';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  experienciaURL = 'https://backportfoliofinal.herokuapp.com/api/experiencia';
  //experienciaURL = 'https://backportfoliofrancisco.herokuapp.com/api/experiencia';
  //experienciaURL = 'http://localhost:8080/api/experiencia';
  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Experiencia[]> {
    return this.httpClient.get<Experiencia[]>(`${this.experienciaURL}/todos`, cabecera);
  }

 public detalle(id: number): Observable<Experiencia> {
    return this.httpClient.get<Experiencia>(`${this.experienciaURL}/detalle/${id}`, cabecera);
  }

  public crear(experiencia: Experiencia): Observable<Experiencia> {
    return this.httpClient.post<Experiencia>( `${this.experienciaURL}/nuevo`, experiencia, cabecera);
  }


  public editar(experiencia: Experiencia, idExp : number): Observable<Experiencia> {
    return this.httpClient.put<Experiencia>(`${this.experienciaURL}/actualizar/${idExp}`, experiencia, cabecera);
  }


  public borrar(idExp: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.experienciaURL}/eliminar/${idExp}`, cabecera);
  }






}
