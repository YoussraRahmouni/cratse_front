import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-role',
  templateUrl: './modal-role.component.html',
  styleUrls: ['./modal-role.component.css']
})
export class ModalRoleComponent implements OnInit {

  form = new FormGroup({
    role: new FormControl('', [
      Validators.required,
    ])
  });

  @Output() roleSelected = new EventEmitter<any>();

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  submitForm(){
    // Passing id of the chosing role
    this.roleSelected.emit(this.form.value.role);
    //console.log(this.form.value.role);
    this.activeModal.close('Close click');
  }

}
