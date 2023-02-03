import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //apiUrl = 'localhost:8080/';
  usersUrl= '../../assets/mock-data/users.json';

  constructor(private http: HttpClient) { }
  getAllUsers(){
    //this.http.get<Project[]>(this.apiUrl+'projects');
    return this.http.get<User[]>(this.usersUrl);
  }
}
