import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  apiUrl = 'http://localhost:8080/';
  //private idUser:number ;

  private email?: string;
  private status: Boolean = false;
  user?: User;

  constructor(private http: HttpClient) { }

  public logIn(userInfo: User) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'

      }),
      withCredentials: true
    };

    const body = {
      'email':  userInfo.email,
      'password':  userInfo.email
    }

    this.http.post<any>(this.apiUrl+'login',body,httpOptions)
    .subscribe((res: User) => {
      this.user = res;
      console.log(res);
    },error => {
      console.log(error);
    });


    localStorage.setItem('ACCESS_TOKEN', "access_token");
    this.status = true;
    localStorage.setItem('STATUS', this.status.toString());
    this.email = userInfo.email;
    localStorage.setItem('emailUser', this.email);
    localStorage.setItem('ROLE', 'user');
    localStorage.setItem('ID', '4');
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
