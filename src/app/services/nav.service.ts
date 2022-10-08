import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Nav} from '../models/nav';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class NavService {

  imagenURL = 'https://backportfoliofinal.herokuapp.com/api/imagennavbar';
  //imagenURL = 'https://backportfoliofrancisco.herokuapp.com/api/imagennavbar';
  //imagenURL = 'http://localhost:8080/api/imagennavbar';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Nav[]> {
    return this.httpClient.get<Nav[]>(this.imagenURL + `/lista`, cabecera);
  }


  public detalle(id: number): Observable<Nav> {
    return this.httpClient.get<Nav>(this.imagenURL + `/detalle/${id}`, cabecera);
  }


  public crear(nav: Nav): Observable<any> {
    return this.httpClient.post<any>(this.imagenURL + `/nueva`, nav, cabecera);
  }


  public editar(nav: Nav, id: number): Observable<any> {
    return this.httpClient.put<any>(this.imagenURL + `/actualizar/${id}`, nav, cabecera);
  }


  public borrar(id: number): Observable<undefined> {
    return this.httpClient.delete<any>(this.imagenURL + `/eliminar/${id}`, cabecera);
  }

}
