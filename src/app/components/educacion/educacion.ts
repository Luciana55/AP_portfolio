import { Persona } from "../persona/persona";

export interface Educacion{
    id:number,
    nombreInstituto:string,
    titulo:string,
    fechaInicio:string,
    fechaFin:string,
    url_foto:string,
    persona: Persona,
}