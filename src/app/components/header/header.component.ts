import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { HeaderService } from 'src/app/services/header.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin = false;
  roles: string[] = [];
  authority!: string;

  personas: Persona[] = [];
  public editPersona: Persona  | undefined;


  constructor(private tokenService: TokenService, private router: Router, private headerService: HeaderService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogin = true;
      this.roles = [];
      this.roles = this.tokenService.getAuthorities();
      this.roles.every(rol => {
        if (rol === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
    this.cargarPersonas();
  }

  cargarPersonas(): void {
    this.headerService.lista().subscribe(data => {
      this.personas = data;
    },
      (err: any) => {
        console.log(err);
      }
    );
  }

  public onOpenModal(mode:String, persona?: Persona): void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type = 'button';
    button.style.display='none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode === 'edit') {
      this.editPersona=persona;
      button.setAttribute('data-bs-target', '#editPersonaModal');
    }
    container?.appendChild(button);
    button.click();
  }


  public onAgregarPersona(addForm: NgForm):void{
    document.getElementById('add-persona-form')?.click();
    this.headerService.crear(addForm.value).subscribe({
      next: (response:Persona) =>{
        console.log(response);
        this.cargarPersonas();
        addForm.reset();
          },
          error:(error:HttpErrorResponse)=>{
            alert('No tiene las credenciales de Administrador para agregar una Persona');
            addForm.reset();
          }
    })
  }

  public onEditarPersona(persona: Persona, id: number){
    this.editPersona= persona;
    document.getElementById('add-persona-form')?.click();
    this.headerService.editar(persona, id).subscribe({
      next: (response:Persona) =>{
        alert('Perfil actualizado correctamente');
        console.log(response);
        this.cargarPersonas();

          },
          error:(error:HttpErrorResponse)=>{
            alert('No tiene las credenciales de Administrador para editar los datos, comuníquese con el Administrador');
          }
    })
  }



}
