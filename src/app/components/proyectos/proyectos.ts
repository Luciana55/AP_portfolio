import { Persona } from "../persona/persona";

export interface Proyecto {
    id: number;
    nombreProyecto: string;
    descripcion: string;
    urlImagen: string;
    urlSitio: string;
    persona: Persona;
}