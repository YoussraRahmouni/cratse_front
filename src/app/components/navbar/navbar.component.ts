import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NavbarService } from 'src/app/services/navbar.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  ROLE: string | null = '';

  constructor(private authService: AuthenticationService, private router: Router, public nav: NavbarService) {
    
  }
  ngOnInit(): void {
    this.updatedRole();
  }

  

  logOut() {
    this.authService.logOut();
    this.router.navigateByUrl('/login');
  }

  updatedRole() {
    this.ROLE = localStorage.getItem('ROLE');
    return this.ROLE;
  }


}
