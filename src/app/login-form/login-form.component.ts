import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitted = false;

  constructor(private authService: AuthenticationService,
    private router: Router, private formBuilder: FormBuilder, public nav: NavbarService) { }

  ngOnInit(): void {
    this.nav.hide();
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formControls() { 
    return this.loginForm.controls; 
  }

  logIn() {
    //console.log(this.loginForm.value);
    this.isSubmitted = true;
    //console.log(this.loginForm.invalid);
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.logIn(this.loginForm.value);
    this.router.navigateByUrl('/homeUser');
  }

}
