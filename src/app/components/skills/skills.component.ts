import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SkillsService } from 'src/app/service/skills.service';
import { Skills } from './skills';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  public skills: Skills[] = [];
  public editSkills: Skills | undefined;
  public deleteSkills: Skills | undefined;
  
  roles: string[] = [];
  isAdmin: boolean = false;

  constructor(private skillsService : SkillsService) { }

  ngOnInit(): void {
    this.getSkills();
  }
  public getSkills(): void {
    this.skillsService.getSkills().subscribe({
    next: (response: Skills[]) => {
      this.skills = response;
    },
    error:(error:HttpErrorResponse)=> {
      alert(error.message);
    }
  })
  }public onAddSkills(addForm: NgForm): void {
    document.getElementById('add-skills-modal')?.click();
    this.skillsService.addSkills(addForm.value).subscribe(
      (response: Skills) => {
        console.log(response);
        this.getSkills();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateSkills(skills: Skills): void {
    this.skillsService.updateSkills(skills).subscribe(
      (response: Skills) => {
        console.log(response);
        this.getSkills();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteSkills(SkillsId: number): void {
    this.skillsService.deleteSkills(SkillsId).subscribe(
      (response: void) => {
        console.log(response);
        this.getSkills();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  

  public onOpenModal(skills: Skills, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addSkillsModal');
    }
    if (mode === 'edit') {
      this.editSkills = skills;
      button.setAttribute('data-target', '#updateSkillsModal');
    }
    if (mode === 'delete') {
      this.deleteSkills = skills;
      button.setAttribute('data-target', '#deleteSkillsModal');
    }
    container!.appendChild(button);
    button.click();
  }



}
