import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../models/project';
import { Observable, tap } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient, private baseService: BaseService) { }

  API_URL = this.baseService.API_URL;
  HTTP_OPTIONS = this.baseService.HTTP_OPTIONS;

  project!: Project;
  allProjects : Project[] = [] ;

  // Get all projects on BD
  getAllProjects(){
    //this.http.get<Project[]>(this.apiUrl+'projects');
    //console.log(this.http.get<Project[]>(this.apiUrl + 'projects',this.httpOptions));
   
    return this.http.get<Project[]>(this.API_URL + 'projects', this.HTTP_OPTIONS);
  }

  // Get all projects that have an imputation for the id given
  getProjectsOfUser(idUser: any){
    // Endpoint: users/{userId}/imputations/projects
    return this.http.get<Project[]>(this.API_URL + 'users/' + idUser + '/imputations/projects', this.HTTP_OPTIONS);
  }

  addProject(nameProject: any,forecastDuration: any,realDuration: any){
    const body = {
      'nameProject': nameProject,
      'durationForecastProject': forecastDuration,
      'durationRealProject':realDuration
    }
    // this.http.post<Project>(this.apiUrl + 'projects',body, httpOptions)
    //   .subscribe((res) => {
    //     console.log(res);
    //     this.projects.push(res);
    //     return res;
    //   }, error => {
    //     console.log(error);
    //   });
    return this.http.post<Project>(this.API_URL + 'projects', body, this.HTTP_OPTIONS)
      .pipe(
        tap((res) => {
          console.log(res);
          this.allProjects.push(res);
        })
      );
  }
}
