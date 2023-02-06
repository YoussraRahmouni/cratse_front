import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { NavbarService } from 'src/app/services/navbar.service';
import { UserService } from 'src/app/services/user.service';
import { FormUserComponent } from '../form-user/form-user.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  userList: User[] = [];
  constructor(public nav: NavbarService, public userService: UserService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.nav.show();
    this.userService.getManagedUsers()
      .subscribe((data: User[]) => this.userList = data);
  }

  addUser(){
    const modalRef = this.modalService.open(FormUserComponent, { centered: true });
    modalRef.componentInstance.newProject.subscribe((user: User) => {
      this.userList.push(user);
    });
  }

}
