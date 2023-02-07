import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { User } from '../models/user';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //apiUrl = 'localhost:8080/';
  //usersUrl = '../../assets/mock-data/users.json';
  API_URL = this.baseService.API_URL;
  HTTP_OPTIONS = this.baseService.HTTP_OPTIONS;
  allUsers : User[] = [] ;

  constructor(private http: HttpClient, private baseService: BaseService) { }

  // Get all managed users for manager
  // EndPoint: /managedUsers
  getManagedUsers() {
    return this.http.get<User[]>(this.API_URL + 'managedUsers', this.HTTP_OPTIONS);
  }
  getAllUsers() {
    //this.http.get<Project[]>(this.apiUrl+'projects');
    return this.http.get<User[]>(this.API_URL+'users', this.HTTP_OPTIONS);
  }
  getAllManagers() {
    //this.http.get<Project[]>(this.apiUrl+'projects');
    return this.http.get<User[]>(this.API_URL+'managers', this.HTTP_OPTIONS);
  }

  // Endpoint: users/{userId}/manager
  updateManager(idUser:any,manager:User){
    const body = {
      'manager': manager.idUser.toString(),
    }
    return this.http.put<User>(this.API_URL+'users/'+idUser+'/manager',body,this.HTTP_OPTIONS);
  }

  updateRole(idUser:any,idRole:any){
    const body = {
      'role': idRole.toString(),
    }
    return this.http.put<User>(this.API_URL+'users/'+idUser+'/role',body,this.HTTP_OPTIONS);
  }

  addUser(firstName: any, lastName: any,
    email: any, password: any,
    job: any, role: any) {
    const body = {
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'password': password,
      'job': job,
      'role': role
    }
    return this.http.post<User>(this.API_URL + 'signup', body, this.HTTP_OPTIONS)
    .pipe(
      tap((res) => {
        console.log(res);
        this.allUsers.push(res);
      })
    );
  }
}
