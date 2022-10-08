import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  isLogin = false;
  roles: string[] = [];
  authority!: string;

  public proyecto : Proyecto []=[];
  public editProyecto: Proyecto  | undefined;
  public deleteProyecto : Proyecto  | undefined;

  constructor(private tokenService: TokenService, private router: Router, private proyectoService : ProyectoService) { }

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
    this.getProyecto();
  }

  public getProyecto():void{
    this.proyectoService.lista().subscribe({
      next:(Response: Proyecto[]) => {
        this.proyecto=Response;
      },
      error: (error:HttpErrorResponse)=>{
       // alert(error.message);
      }
    })
    }

   public onOpenModal(mode:String, proyecto?: Proyecto): void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type = 'button';
    button.style.display='none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode === 'add'){
      button.setAttribute('data-bs-target', '#addProyectoModal');
    }else if(mode === 'delete') {
      this.deleteProyecto=proyecto;
      button.setAttribute('data-bs-target', '#deleteProyectoModal');
    } else if(mode === 'edit') {
      this.editProyecto=proyecto;
      button.setAttribute('data-bs-target', '#editProyectoModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onAgregarProyecto(addForm: NgForm):void{
    document.getElementById('add-proyecto-form')?.click();
    this.proyectoService.crear(addForm.value).subscribe({
      next: (response:Proyecto) =>{
        alert('Proyecto agregado correctamente');
        console.log(response);
        this.getProyecto();
        addForm.reset();
          },
          error:(error:HttpErrorResponse)=>{
            alert('No tiene las credenciales de Administrador para agregar nuevos datos, comuníquese con el Administrador');
            addForm.reset();
          }
    })
  }

  public onEditarProyecto(proyecto: Proyecto, idPro: number){
    this.editProyecto= proyecto;
    document.getElementById('add-proyecto-form')?.click();
    this.proyectoService.editar(proyecto, idPro).subscribe({
      next: (response:Proyecto) =>{
        alert('Proyecto actualizado correctamente');
        console.log(response);
        this.getProyecto();
          },
          error:(error:HttpErrorResponse)=>{
            alert('No tiene las credenciales de Administrador para modificar los datos, comuníquese con el Administrador');
          }
    })
  }

  public onEliminarProyecto(idPro: number):void{
    this.proyectoService.borrar(idPro).subscribe({
      next: (response:void) =>{
        alert('Proyecto eliminado correctamente');
        console.log(response);
        this.getProyecto();
          },
          error:(error:HttpErrorResponse)=>{
            alert('No tiene las credenciales de Administrador para eliminar los datos, comuníquese con el Administrador');
          }
    })
  }

//drag and drop
drop(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.proyecto, event.previousIndex, event.currentIndex);
}


}
