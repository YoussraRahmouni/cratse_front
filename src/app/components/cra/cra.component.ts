import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import ResourceTimelineView from "@fullcalendar/resource-timeline"
import interactionPlugin from '@fullcalendar/interaction';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImputationComponent } from '../imputation/imputation.component';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';


@Component({
  selector: 'app-cra',
  templateUrl: './cra.component.html',
  styleUrls: ['./cra.component.css']
})
export class CraComponent implements OnInit {

  //projectList:Project[] = [];


  constructor(private modalService: NgbModal, private projectService: ProjectService) { }

  calendarOptions: CalendarOptions = {
    plugins: [ResourceTimelineView, interactionPlugin],
    views: {
      resourceTimelineMonth: {
        type: 'resourceTimeline',
        duration: { months: 1 },
      }
    },
    initialView: 'resourceTimelineMonth',
    selectable: true,
    selectMirror: true,
    expandRows: false,
    dateClick: this.handleDateClick.bind(this),
    /*function(info) {
      //alert('Clicked on: ' + info.dateStr + '\n' +'Resource ID: ' + info.resource?.id );
      
    },*/
    events: [
      { id: '1', resourceId: '3', start: '2023-01-01', end: '2023-01-01', title: 'event 1' },
      { id: '2', resourceId: '4', start: '2023-02-01', end: '2023-02-01', title: 'event 2' },
      { id: '3', resourceId: '5', start: '2023-03-01', end: '2023-03-01', title: 'event 3' }
    ],
    //resources: this.projectList,
    //[
    //   { id: 'a', title: 'Room A' },
    //   { id: 'b', title: 'Room B' },
    //   { id: 'c', title: 'Room C' }
    // ],

  };

  handleDateClick(arg: any) {
    //console.log(arg.dateStr);
    //console.log(arg.resource.id);
    const modalRef = this.modalService.open(ImputationComponent, { centered: true });
    modalRef.componentInstance.arg = arg;
  }

  ngOnInit(): void {
    this.projectService.getAllProjects()
      .subscribe((data: Project[]) => {
        //console.log(data);
        this.calendarOptions.resources = data.map(resource => ({
          id: resource.idProject.toString(),
          title: resource.nameProject
        }));
        //console.log(this.calendarOptions.resources);
      });
    //console.log(this.projectList);
  }

}
