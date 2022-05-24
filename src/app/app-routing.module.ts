import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EducacionComponent } from './components/educacion/educacion.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { HeaderComponent } from './components/header/header.component';
import { PersonaComponent } from './components/persona/persona.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { SkillsComponent } from './components/skills/skills.component';

const routes: Routes = [
{path: 'header', component: HeaderComponent},
{path: 'persona', component: PersonaComponent},
{path: 'skills', component: SkillsComponent},
{path: 'proyectos', component: ProyectosComponent},
{path: 'experiencia', component: ExperienciaComponent},
{path: 'educacion', component: EducacionComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
