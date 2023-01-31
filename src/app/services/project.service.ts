import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  //apiUrl = 'localhost:8080/';
  projectsUrl= '../../assets/mock-data/projects.json';
  constructor(private http: HttpClient) { }
  projects: Project [] = [];

  getAllProjects(){
    //this.http.get<Project[]>(this.apiUrl+'projects');
    return this.http.get<Project[]>(this.projectsUrl);
  }
}
