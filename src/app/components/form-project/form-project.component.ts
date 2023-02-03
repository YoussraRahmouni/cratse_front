import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-form-project',
  templateUrl: './form-project.component.html',
  styleUrls: ['./form-project.component.css']
})
export class FormProjectComponent implements OnInit {

  submitted: Boolean = false;

  form = new FormGroup({
    nameProject: new FormControl(''),
    forecastDuration: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/),
    ]),
    realDuration: new FormControl('',[
      Validators.required,
      Validators.pattern(/^\d+$/),
    ])
  });

  constructor(public activeModal: NgbActiveModal, public projectService: ProjectService) { }

  ngOnInit(): void {
  }

  submitForm(){
    this.submitted = true;
    console.log(this.form.value.nameProject);
    console.log(this.form.value.forecastDuration);
    console.log(this.form.value.realDuration);
    this.projectService.addProject(this.form.value.nameProject,this.form.value.forecastDuration,this.form.value.realDuration);
    this.activeModal.close('Close click');
  }

}
