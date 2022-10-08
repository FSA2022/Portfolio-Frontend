import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona';


const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  personaURL = 'https://backportfoliofinal.herokuapp.com/api/persona';
  //personaURL = 'https://backportfoliofrancisco.herokuapp.com/api/persona';
  //personaURL = 'http://localhost:8080/api/persona';
  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Persona[]> {
    return this.httpClient.get<Persona[]>(this.personaURL + `/lista`, cabecera);
  }


  public detalle(id: number): Observable<Persona> {
    return this.httpClient.get<Persona>(this.personaURL + `/detalle/${id}`, cabecera);
  }


  public crear(persona: Persona): Observable<Persona> {
    return this.httpClient.post<Persona>(this.personaURL + `/nueva`, persona, cabecera);
  }


  public editar(persona: Persona, id: number): Observable<Persona> {
    return this.httpClient.put<Persona>(this.personaURL + `/actualizar/${id}`, persona, cabecera);
  }


  public borrar(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.personaURL + `/eliminar/${id}`, cabecera);
  }

}
  /*
  public lista(): Observable<Persona[]> {
    return this.httpClient.get<Persona[]>(this.personaURL + `ver/id`, cabecera);
  }


  public detalle(id: number): Observable<Persona> {
    return this.httpClient.get<Persona>(this.personaURL + `/detalle/${id}`, cabecera);
  }


  public crear(persona: Persona): Observable<any> {
    return this.httpClient.post<any>(this.personaURL + `/nueva`, persona, cabecera);
  }


  public editar(persona: Persona, id: number): Observable<any> {
    return this.httpClient.put<any>(this.personaURL + `/actualizar/${id}`, persona, cabecera);
  }


  public borrar(id: number): Observable<undefined> {
    return this.httpClient.delete<any>(this.personaURL + `/eliminar/${id}`, cabecera);
  }
*/
