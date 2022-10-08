import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  isLogin = false;
  roles: string[] = [];
  authority!: string;

  public experiencia : Experiencia []=[];
  public editExperiencia: Experiencia  | undefined;
  public deleteExperiencia : Experiencia  | undefined;

  constructor(private tokenService: TokenService, private router: Router, private experienciaService : ExperienciaService) { }

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
    this.getExperiencia();
  }
  public getExperiencia():void{


    this.experienciaService.lista().subscribe({
      next:(Response: Experiencia[]) => {

        this.experiencia=Response;

      },
      error: (error:HttpErrorResponse)=>{

        //alert(error.message);
      }
    })
    }

   public onOpenModal(mode:String, experiencia?: Experiencia): void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type = 'button';
    button.style.display='none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode === 'add'){
      button.setAttribute('data-bs-target', '#addExperienciaModal');
    }else if(mode === 'delete') {
      this.deleteExperiencia=experiencia;
      button.setAttribute('data-bs-target', '#deleteExperienciaModal');
    } else if(mode === 'edit') {
      this.editExperiencia=experiencia;
      button.setAttribute('data-bs-target', '#editExperienciaModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onAgregarExperiencia(addForm: NgForm):void{
    document.getElementById('add-experiencia-form')?.click();
    this.experienciaService.crear(addForm.value).subscribe({
      next: (response:Experiencia) =>{
        alert('Experiencia agregada correctamente');
        console.log(response);
        this.getExperiencia();

        addForm.reset();
          },
          error:(error:HttpErrorResponse)=>{
            alert('No tiene las credenciales de Administrador para agregar nuevos datos, comuníquese con el Administrador');
            addForm.reset();
          }
    })
  }




  public onEditarExperiencia(experiencia: Experiencia, idExp: number){
    this.editExperiencia= experiencia;
    document.getElementById('add-experiencia-form')?.click();
    this.experienciaService.editar(experiencia, idExp).subscribe({
      next: (response:Experiencia) =>{
        alert('Experiencia actualizada correctamente');
        console.log(response);
        this.getExperiencia();


          },
          error:(error:HttpErrorResponse)=>{
            alert('No tiene las credenciales de Administrador para modificar los datos, comuníquese con el Administrador');
          }
    })
  }



  public onEliminarExperiencia(idExp: number):void{
    this.experienciaService.borrar(idExp).subscribe({
      next: (response:void) =>{
        alert('Experiencia eliminada correctamente');
        console.log(response);
        this.getExperiencia();

          },
          error:(error:HttpErrorResponse)=>{
            alert('No tiene las credenciales de Administrador para eliminar los datos, comuníquese con el Administrador');
          }
    })
  }

//drag and drop
drop(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.experiencia, event.previousIndex, event.currentIndex);
}


}


