import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { NavbarService } from 'src/app/services/navbar.service';
import { UserService } from 'src/app/services/user.service';
import { ModalManagerComponent } from '../modal-manager/modal-manager.component';
import { ModalRoleComponent } from '../modal-role/modal-role.component';

@Component({
  selector: 'app-list-users-admin',
  templateUrl: './list-users-admin.component.html',
  styleUrls: ['./list-users-admin.component.css']
})
export class ListUsersAdminComponent implements OnInit {
  userList: User[] = [];

  constructor(public nav: NavbarService, public userService: UserService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.nav.show();
    this.userService.getAllUsers()
      .subscribe((data: User[]) => {
        this.userList = data;
        console.log(data);
      });
  }

  changeRole(idUser:any) {
    const modalRef = this.modalService.open(ModalRoleComponent, { centered: true });
    modalRef.componentInstance.roleSelected.subscribe((role: any) => {
    console.log(role);
    this.userList.forEach((element, index) => {
      console.log(idUser);
      this.userService.updateRole(idUser, role.split(';')[0]).subscribe((res: any) =>
        console.log(res)
      );
      if (element.idUser == idUser){element.role.idRole = role.split(';')[0]; element.role.labelRole = role.split(';')[1]; } 
    });
    });
  }

  changeManager(idUser: any) {
    const modalRef = this.modalService.open(ModalManagerComponent, { centered: true });
    modalRef.componentInstance.managerSelected.subscribe((user: User) => {
      //this.userList.push(user);
      console.log(user);
      this.userList.forEach((element, index) => {
        console.log(idUser);
        this.userService.updateManager(idUser, user).subscribe((res: any) =>
          console.log(res)
        );
        if (element.idUser == idUser) element.manager = user;
      });
    });
  }

}
