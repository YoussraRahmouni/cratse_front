import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  //apiUrl = 'http://localhost:8080/';
  //private idUser:number ;
  API_URL = this.baseService.API_URL;
  HTTP_OPTIONS = this.baseService.HTTP_OPTIONS;

  private email?: string;
  private status: Boolean = false;
  private user!: User;

  constructor(private http: HttpClient, private baseService: BaseService) { }

  public logIn(userInfo: User) {
    const body = {
      'email': userInfo.email,
      'password': userInfo.password
    }

    this.http.post<any>(this.API_URL  + 'login', body, this.HTTP_OPTIONS)
      .subscribe((res: User) => {
        this.user = res;
        this.setLocalStorageValues(userInfo.email, this.user.idUser, this.user.role.labelRole);
        console.log(res);

      }, error => {
        console.log(error);
      });
  }
  private setLocalStorageValues(email: string, id: number, role: string) {
    localStorage.setItem('ACCESS_TOKEN', "access_token");
    this.status = true;
    // set status
    localStorage.setItem('STATUS', this.status.toString());
    // set ID 
    localStorage.setItem('ID', id.toString());
    // set role 
    localStorage.setItem('ROLE', role.toString());

    this.email = email;
    localStorage.setItem('emailUser', this.email);
  }

  public isConnected() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }
  public isConnectedObs() {
    this.loggedIn.next(localStorage.getItem('ACCESS_TOKEN') !== null);
    return this.loggedIn.asObservable();
  }
  public logOut() {
    localStorage.removeItem('ACCESS_TOKEN');
    this.email = '';
    this.status = false;
    localStorage.removeItem('STATUS');
    localStorage.removeItem('ROLE');
    localStorage.removeItem('emailUser');
    localStorage.removeItem('ID');
  }

  getUserEmail() {
    return this.email;
  }

  getStatus() {
    return this.status;
  }
}
