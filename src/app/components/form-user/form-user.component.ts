import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  submitted: Boolean = false;
  @Output() newUser = new EventEmitter<User>();

  constructor(public activeModal: NgbActiveModal, private userService: UserService) { }

  form = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
    ]),
    lastName: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
    job: new FormControl('', [
      Validators.required,
    ]),
    role: new FormControl('', [
      Validators.required,
    ]),

  });

  ngOnInit(): void {
  }
  submitForm() {
    this.submitted = true;
    if (this.form.valid) {
      console.log(this.form.value.firstName);
      console.log(this.form.value.lastName);
      console.log(this.form.value.email);
      console.log(this.form.value.password);
      console.log(this.form.value.job);
      console.log(this.form.value.role);
      this.userService.addUser(this.form.value.firstName ,this.form.value.lastName,this.form.value.email,this.form.value.password,this.form.value.job,this.form.value.role)
      .subscribe((user) => {
        this.newUser.emit(user);
        this.activeModal.close('Close click');
      });
      //this.activeModal.close('Close click');
    }
  }

}
