import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: Project[] = [];
  @Output() projectSelected = new EventEmitter<any>();

  form = new FormGroup({
    project: new FormControl('', [
      Validators.required,
    ])
  });

  constructor(public activeModal: NgbActiveModal, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getAllProjects()
      .subscribe((data: Project[]) => this.projects = data);
  }

  submitForm(){
    this.projectSelected.emit(this.form.value.project);
    this.activeModal.close('Close click');
  }

}
