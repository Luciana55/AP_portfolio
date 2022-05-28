import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProyectosService } from 'src/app/service/proyectos.service';
import { Proyectos } from './proyectos';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  public proyectos: Proyectos[] = [];
  public editProyectos: Proyectos | undefined;
  public deleteProyectos: Proyectos | undefined;

  roles: string[] = [];
  isAdmin: boolean = false;

  constructor(private proyectosService : ProyectosService) { }

  ngOnInit(): void {
    this.getProyectos();
  }
  public getProyectos(): void {
    this.proyectosService.getProyectos().subscribe({
    next: (response: Proyectos[]) => {
      this.proyectos = response;
    },
    error:(error:HttpErrorResponse)=> {
      alert(error.message);
    }
  })
  }public onAddProyectos(addForm: NgForm): void {
    document.getElementById('add-proyectos-modal')?.click();
    this.proyectosService.addProyectos(addForm.value).subscribe(
      (response: Proyectos) => {
        console.log(response);
        this.getProyectos();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateProyectos(proyectos: Proyectos): void {
    this.proyectosService.updateProyectos(proyectos).subscribe(
      (response: Proyectos) => {
        console.log(response);
        this.getProyectos();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteProyectos(proyectosId: number): void {
    this.proyectosService.deleteProyectos(proyectosId).subscribe(
      (response: void) => {
        console.log(response);
        this.getProyectos();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  

  public onOpenModal(proyectos: Proyectos, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addProyectosModal');
    }
    if (mode === 'edit') {
      this.editProyectos = proyectos;
      button.setAttribute('data-target', '#updateProyectosModal');
    }
    if (mode === 'delete') {
      this.deleteProyectos = proyectos;
      button.setAttribute('data-target', '#deleteProyectosModal');
    }
    container!.appendChild(button);
    button.click();
  }




}
