import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/service/persona.service';
import { Persona } from './persona';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
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
  }




}
