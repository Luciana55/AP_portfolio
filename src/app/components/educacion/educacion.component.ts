import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { EducacionService } from 'src/app/service/educacion.service';
import { TokenService } from 'src/app/service/token.service';
import { Educacion } from './educacion';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css'],
})
export class EducacionComponent implements OnInit {
  public educacion: Educacion[] = [];
  public editEducacion: Educacion | undefined;
  public deleteEducacion: Educacion | undefined;

  roles: string[] = [];
  isLogged = false;
  isLogginFail = false;

  constructor(
    private educacionService: EducacionService,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLogginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }

    this.getEducacion();
  }

  public getEducacion(): void {
    this.educacionService.getEducacion().subscribe({
      next: (response: Educacion[]) => {
        this.educacion = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onAddEducacion(addForm: NgForm): void {
    document.getElementById('add-educacion-modal')?.click();
    this.educacionService.addEducacion(addForm.value).subscribe(
      (response: Educacion) => {
        console.log(response);
        this.getEducacion();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEducacion(educacion: Educacion): void {
    this.educacionService.updateEducacion(educacion).subscribe(
      (response: Educacion) => {
        console.log(response);
        this.getEducacion();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEducacion(educacionId: number): void {
    this.educacionService.deleteEducacion(educacionId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEducacion();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(educacion: Educacion, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEducacionModal');
    }
    if (mode === 'edit') {
      this.editEducacion = educacion;
      button.setAttribute('data-target', '#updateEducacionModal');
    }
    if (mode === 'delete') {
      this.deleteEducacion = educacion;
      button.setAttribute('data-target', '#deleteEducacionModal');
    }
    container!.appendChild(button);
    button.click();
  }

  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }
}
