import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ExperienciaService } from 'src/app/service/experiencia.service';
import { Experiencia } from './experiencia';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  public experiencia: Experiencia[] = [];
  public editExperiencia: Experiencia | undefined;
  public deleteExperiencia: Experiencia | undefined;
  
  roles: string[] = [];
  isAdmin: boolean = false;

  constructor(private experienciaService : ExperienciaService) { }

  ngOnInit(): void {
    this.getExperiencia();
  }

   public getExperiencia(): void {
    this.experienciaService.getExperiencia().subscribe({
    next: (response: Experiencia[]) => {
      this.experiencia = response;
    },
    error:(error:HttpErrorResponse)=> {
      alert(error.message);
    }
  })
  }public onAddExperiencia(addForm: NgForm): void {
    document.getElementById('add-experiencia-modal')?.click();
    this.experienciaService.addExperiencia(addForm.value).subscribe(
      (response: Experiencia) => {
        console.log(response);
        this.getExperiencia();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateExperiencia(experiencia: Experiencia): void {
    this.experienciaService.updateExperiencia(experiencia).subscribe(
      (response: Experiencia) => {
        console.log(response);
        this.getExperiencia();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteExperiencia(experienciaId: number): void {
    this.experienciaService.deleteExperiencia(experienciaId).subscribe(
      (response: void) => {
        console.log(response);
        this.getExperiencia();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  

  public onOpenModal(experiencia: Experiencia, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addExperienciaModal');
    }
    if (mode === 'edit') {
      this.editExperiencia = experiencia;
      button.setAttribute('data-target', '#updateExperienciaModal');
    }
    if (mode === 'delete') {
      this.deleteExperiencia = experiencia;
      button.setAttribute('data-target', '#deleteExperienciaModal');
    }
    container!.appendChild(button);
    button.click();
  }




}
