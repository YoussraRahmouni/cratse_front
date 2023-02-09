import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modal-manager',
  templateUrl: './modal-manager.component.html',
  styleUrls: ['./modal-manager.component.css']
})
export class ModalManagerComponent implements OnInit {

  managers: User[] = [];
  
  @Output() managerSelected = new EventEmitter<any>();

  form = new FormGroup({
    manager: new FormControl('', [
      Validators.required,
    ])
  });

  constructor(public activeModal: NgbActiveModal, public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllManagers()
      .subscribe((data: User[]) => this.managers = data);
   }

   submitForm(){
    // Passing the whole object it will be updated in the list and will make an api call 
    this.managerSelected.emit(this.form.get('manager')?.value);
    //console.log(this.form.get('manager')?.value);
    this.activeModal.close('Close click');
  }
}
