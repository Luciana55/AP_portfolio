import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { PersonaComponent } from './components/persona/persona.component';
import { SkillsComponent } from './components/skills/skills.component';

const routes: Routes = [
{path: 'header', component: HeaderComponent},
{path: 'persona', component: PersonaComponent},
{path: 'skills', component: SkillsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
