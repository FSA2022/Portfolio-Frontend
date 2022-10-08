import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Educacion } from 'src/app/models/educacion';
import { EducacionService } from 'src/app/services/educacion.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  isLogin = false;
  roles: string[] = [];
  authority!: string;

  public educacion : Educacion []=[];
public editEducacion: Educacion  | undefined;
 public deleteEducacion : Educacion  | undefined;



  constructor(private tokenService: TokenService, private router: Router, private educacionService : EducacionService) {

  }

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

    this.getEducacion();

  }


  public getEducacion():void{


  this.educacionService.lista().subscribe({
    next:(Response: Educacion[]) => {

      this.educacion=Response;

    },
    error: (error:HttpErrorResponse)=>{

     // alert(error.message);
    }
  })
  }

 public onOpenModal(mode:String, educacion?: Educacion): void{
  const container=document.getElementById('main-container');
  const button=document.createElement('button');
  button.type = 'button';
  button.style.display='none';
  button.setAttribute('data-bs-toggle', 'modal');
  if(mode === 'add'){
    button.setAttribute('data-bs-target', '#addEducacionModal');
  }else if(mode === 'delete') {
    this.deleteEducacion=educacion;
    button.setAttribute('data-bs-target', '#deleteEducacionModal');
  } else if(mode === 'edit') {
    this.editEducacion=educacion;
    button.setAttribute('data-bs-target', '#editEducacionModal');
  }
  container?.appendChild(button);
  button.click();
}

public onAgregarEducacion(addForm: NgForm):void{
  document.getElementById('add-education-form')?.click();
  this.educacionService.crear(addForm.value).subscribe({
    next: (response:Educacion) =>{
      alert('Educación agregada correctamente');
      console.log(response);
      this.getEducacion();

      addForm.reset();
        },
        error:(error:HttpErrorResponse)=>{
          alert('No tiene las credenciales de Administrador para agregar nuevos datos, comuníquese con el Administrador');
          addForm.reset();
        }
  })
}




public onEditarEducacion(educacion: Educacion, id: number){
  this.editEducacion= educacion;
  document.getElementById('add-education-form')?.click();
  this.educacionService.editar(educacion, id).subscribe({
    next: (response:Educacion) =>{
      alert('Educación actualizada correctamente');
      console.log(response);
      this.getEducacion();


        },
        error:(error:HttpErrorResponse)=>{
          alert('No tiene las credenciales de Administrador para modificar los datos, comuníquese con el Administrador');
        }
  })
}



public onEliminarEducacion(id: number):void{
  this.educacionService.borrar(id).subscribe({
    next: (response:void) =>{
      alert('Educación eliminada correctamente');
      console.log(response);
      this.getEducacion();

        },
        error:(error:HttpErrorResponse)=>{
          alert('No tiene las credenciales de Administrador para eliminar los datos, comuníquese con el Administrador');
        }
  })
}



//drag and drop
drop(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.educacion, event.previousIndex, event.currentIndex);
}




}


