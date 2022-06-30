import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PersonaService } from 'src/app/service/persona.service';
import { Persona } from '../persona/persona';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public persona: Persona[] = [];
  public editPersona: Persona | undefined;
  public deletePersona: Persona | undefined;
  
  roles: string[] = [];
  isAdmin: boolean = false;

  constructor(private personaService : PersonaService) { }

  ngOnInit(): void {
    this.getPersona();  
  }
  public getPersona(): void {
    this.personaService.getPersona().subscribe({
    next: (response: Persona[]) => {
      this.persona = response;
    },
    error:(error:HttpErrorResponse)=> {
      alert(error.message);
    }
  })
  }public onAddPersona(addForm: NgForm): void {
    document.getElementById('add-persona-modal')?.click();
    this.personaService.addPersona(addForm.value).subscribe(
      (response: Persona) => {
        console.log(response);
        this.getPersona();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdatePersona(persona: Persona): void {
    this.personaService.updatePersona(persona).subscribe(
      (response: Persona) => {
        console.log(response);
        this.getPersona();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeletePersona(personaId: number): void {
    this.personaService.deletePersona(personaId).subscribe(
      (response: void) => {
        console.log(response);
        this.getPersona();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  

  public onOpenModal(persona: Persona, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addPersonaModal');
    }
    if (mode === 'edit') {
      this.editPersona = persona;
      button.setAttribute('data-target', '#updatePersonaModal');
    }
    if (mode === 'delete') {
      this.deletePersona = persona;
      button.setAttribute('data-target', '#deletePersonaModal');
    }
    container!.appendChild(button);
    button.click();
  }

 /** LOGIN */




 /** FIN LOGIN */
}
