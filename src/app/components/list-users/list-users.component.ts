import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { NavbarService } from 'src/app/services/navbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  userList: User[] = [];
  constructor(public nav: NavbarService, public userService: UserService) { }

  ngOnInit(): void {
    this.nav.show();
    this.userService.getAllUsers()
      .subscribe((data: User[]) => this.userList = data);
  }

}
