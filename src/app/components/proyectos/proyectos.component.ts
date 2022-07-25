import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ProyectosService } from 'src/app/service/proyectos.service';
import { TokenService } from 'src/app/service/token.service';
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
  isLogged = false;
  isLogginFail = false;

  constructor(private proyectosService : ProyectosService, private tokenService: TokenService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLogginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
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

  onLogOut():void{
    this.tokenService.logOut();
    window.location.reload();
  }


}
