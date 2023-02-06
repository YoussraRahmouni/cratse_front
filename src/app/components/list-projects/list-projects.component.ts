import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/models/project';
import { NavbarService } from 'src/app/services/navbar.service';
import { ProjectService } from 'src/app/services/project.service';
import { FormProjectComponent } from '../form-project/form-project.component';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.css']
})
export class ListProjectsComponent implements OnInit {

  constructor(public nav : NavbarService, public projectService: ProjectService, private modalService: NgbModal) { }
  projectList: Project [] = [];
  ngOnInit(): void {
    this.nav.show();
    this.projectService.getAllProjects()
      .subscribe((data: Project[]) => this.projectList = data);
  }

  addProject(){
    const modalRef = this.modalService.open(FormProjectComponent, { centered: true });
    modalRef.componentInstance.newProject.subscribe((project: Project) => {
      this.projectList.push(project);
    });
  }

}
