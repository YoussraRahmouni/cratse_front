import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor() { }

  public logIn(userInfo: User){
    localStorage.setItem('ACCESS_TOKEN', "access_token");
  }
  public isConnected(){
    return localStorage.getItem('ACCESS_TOKEN') !== null;

  }
  public isConnectedObs(){
    this.loggedIn.next(localStorage.getItem('ACCESS_TOKEN') !== null);
    return this.loggedIn.asObservable();
  }
  public logOut(){
    localStorage.removeItem('ACCESS_TOKEN');
  }
}
