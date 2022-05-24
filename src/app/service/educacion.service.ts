import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Educacion } from '../components/educacion/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public getEmployees(): Observable<Educacion[]> {
    return this.http.get<Educacion[]>(`${this.apiServerUrl}/employee/all`);
  }





}

