import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  //private idUser:number ;
  private email?: string;
  private status: Boolean = false;

  constructor() { }

  public logIn(userInfo: User) {
    localStorage.setItem('ACCESS_TOKEN', "access_token");
    this.status = true;
    localStorage.setItem('STATUS', this.status.toString());
    this.email = userInfo.email;
    localStorage.setItem('emailUser', this.email);
    localStorage.setItem('ROLE', 'user');
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
    localStorage.removeItem('emailUser');
  }

  getUserEmail() {
    return this.email;
  }

  getStatus() {
    return this.status;
  }
}
