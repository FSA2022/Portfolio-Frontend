import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../models/skill';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class SkillService {


  skillURL = 'https://backportfoliofinal.herokuapp.com/api/skill';
  //skillURL = 'https://backportfoliofrancisco.herokuapp.com/api/skill';

  //skillURL = 'http://localhost:8080/api/skill';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Skill[]> {
    return this.httpClient.get<Skill[]>(`${this.skillURL}/todos`, cabecera);
  }

 public detalle(id: number): Observable<Skill> {
    return this.httpClient.get<Skill>(`${this.skillURL}/detalle/${id}`, cabecera);
  }

  public crear(skill: Skill): Observable<Skill> {
    return this.httpClient.post<Skill>( `${this.skillURL}/nuevo`, skill, cabecera);
  }


  public editar(skill: Skill, id : number): Observable<Skill> {
    return this.httpClient.put<Skill>(`${this.skillURL}/actualizar/${id}`, skill, cabecera);
  }


  public borrar(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.skillURL}/eliminar/${id}`, cabecera);
  }



}
