import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtModel } from '../models/JwtModel';
import { LoginUsuario } from '../models/LoginUsuario';

const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authURL = ' https://backportfoliofinal.herokuapp.com/api/auth';
  //private authURL = ' https://backportfoliofrancisco.herokuapp.com/api/auth';


  //private authURL = 'http://localhost:8080/api/auth';

  constructor(private httpClient: HttpClient) { }

  public login(usuario: LoginUsuario): Observable<JwtModel> {
    return this.httpClient.post<JwtModel>(`${this.authURL}/login`, usuario, cabecera);
  }

  /*public registro(usuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authURL+ 'nuevo', usuario, cabecera);
  }*/
}
