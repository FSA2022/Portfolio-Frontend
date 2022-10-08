import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/services/skill.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-hard-and-soft-skill',
  templateUrl: './hard-and-soft-skill.component.html',
  styleUrls: ['./hard-and-soft-skill.component.css']
})
export class HardAndSoftSkillComponent implements OnInit {

  isLogin = false;
  roles: string[] = [];
  authority!: string;



  public skill : Skill []=[];
  public editSkill: Skill  | undefined;
  public deleteSkill : Skill  | undefined;

  constructor(private tokenService: TokenService, private router: Router, private skillService : SkillService) { }

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
    this.getSkill();
  }

  public getSkill():void{
    this.skillService.lista().subscribe({
      next:(Response: Skill[]) => {
        this.skill=Response;
      },
      error: (error:HttpErrorResponse)=>{
        //alert(error.message);
      }
    })
    }

   public onOpenModal(mode:String, skill?: Skill): void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type = 'button';
    button.style.display='none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode === 'add'){
      button.setAttribute('data-bs-target', '#addSkillModal');
    }else if(mode === 'delete') {
      this.deleteSkill=skill;
      button.setAttribute('data-bs-target', '#deleteSkillModal');
    } else if(mode === 'edit') {
      this.editSkill=skill;
      button.setAttribute('data-bs-target', '#editSkillModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onAgregarSkill(addForm: NgForm):void{
    document.getElementById('add-skill-form')?.click();
    this.skillService.crear(addForm.value).subscribe({
      next: (response:Skill) =>{
        alert('Skill agregada correctamente');
        console.log(response);
        this.getSkill();
        addForm.reset();
          },
          error:(error:HttpErrorResponse)=>{
            alert('No tiene las credenciales de Administrador para agregar nuevos datos, comuníquese con el Administrador');
            addForm.reset();
          }
    })
  }

  public onEditarSkill(skill: Skill, idSkill: number){
    this.editSkill= skill;
    document.getElementById('add-skill-form')?.click();
    this.skillService.editar(skill, idSkill).subscribe({
      next: (response:Skill) =>{
        alert('Skill actualizada correctamente');
        console.log(response);
        this.getSkill();
          },
          error:(error:HttpErrorResponse)=>{
            alert('No tiene las credenciales de Administrador para modificar los datos, comuníquese con el Administrador');
          }
    })
  }

  public onEliminarSkill(idSkill: number):void{
    this.skillService.borrar(idSkill).subscribe({
      next: (response:void) =>{
        alert('Skill eliminada correctamente');
        console.log(response);
        this.getSkill();

          },
          error:(error:HttpErrorResponse)=>{
            alert('No tiene las credenciales de Administrador para eliminar los datos, comuníquese con el Administrador');
          }
    })
  }

//drag and drop
drop(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.skill, event.previousIndex, event.currentIndex);
}
}

