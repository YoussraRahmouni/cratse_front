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
  usersUrl = '../../assets/mock-data/users.json';
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
    return this.http.get<User[]>(this.usersUrl);
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
