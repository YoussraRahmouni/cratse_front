import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import ResourceTimelineView from "@fullcalendar/resource-timeline"
import interactionPlugin from '@fullcalendar/interaction';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImputationComponent } from '../imputation/imputation.component';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';
import { ImputationService } from 'src/app/services/imputation.service';
import { Imputation } from 'src/app/models/imputation';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { ProjectComponent } from '../project/project.component';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { saveAs } from 'file-saver';



@Component({
  selector: 'app-cra',
  templateUrl: './cra.component.html',
  styleUrls: ['./cra.component.css']
})
export class CraComponent implements OnInit {


  email?: string;
  idUser?: any;
  idProject!: any;

  constructor(private modalService: NgbModal,
    private projectService: ProjectService,
    private imputationService: ImputationService,
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute, public nav: NavbarService, private cdr: ChangeDetectorRef) { }

  @ViewChild('calendar')
  calendarComponent!: FullCalendarComponent;

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
    // events: [
    //   { id: '1', resourceId: '3', start: '2023-01-01', end: '2023-01-01', title: 'event 1' },
    //   { id: '2', resourceId: '4', start: '2023-02-01', end: '2023-02-01', title: 'event 2' },
    //   { id: '3', resourceId: '5', start: '2023-03-01', end: '2023-03-01', title: 'event 3' }
    // ],
    resources: []
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
    modalRef.componentInstance.newImputation.subscribe((imputation: Imputation) => {
      this.addIpmutation(imputation);
    });
  }

  ngOnInit(): void {
    this.nav.show();
    console.log(this.activatedRoute.snapshot.routeConfig?.path);
    if (this.activatedRoute.snapshot.routeConfig?.path == 'homeUser') {
      this.idUser = localStorage.getItem('ID');
    }
    if (this.activatedRoute.snapshot.routeConfig?.path == 'users/cra/:id') {
      this.idUser = this.activatedRoute.snapshot.paramMap.get('id');
    }
    this.email = this.authService.getUserEmail();
    this.projectService.getProjectsOfUser(this.idUser)
      .subscribe((data) => {
        //console.log(data);
        this.calendarOptions.resources = data.map((resource) => (
          {
            id: resource.idProject.toString(),
            title: resource.nameProject
          }));
      });

    this.imputationService.getAllImputationsOfUser(this.idUser)
      .subscribe((data: Imputation[]) => {
        //console.log(data);
        this.calendarOptions.events = data.map(imputation => ({
          id: imputation.idImputation.toString(),
          resourceId: imputation.project.idProject.toString(),
          start: imputation.dateImputation,
          end: imputation.dateImputation,
          title: imputation.dailyChargeImputation.toString(),
        }));
        //console.log(this.calendarOptions.events);
      });
    console.log(this.authService.getStatus());
  }
  addProject() {
    const modalRef = this.modalService.open(ProjectComponent, { centered: true });
    modalRef.componentInstance.projectSelected.subscribe((value: string) => {
      console.log('value in cra' + value);
      const idToAdd = value.split(';')[0];
      const nameToAdd = value.split(';')[1];
      console.log(idToAdd);
      console.log(nameToAdd);
      const newResource = { id: idToAdd, title: nameToAdd };
      // (this.calendarOptions.resources as Array<ResourceSourceInput>).push(newResource);
      // this.calendarOptions = Object.assign({}, this.calendarOptions, {});
      const resourcesArray = Array.isArray(this.calendarOptions.resources) ? this.calendarOptions.resources : [];
      const resourcesCopy = [...resourcesArray];
      resourcesCopy.push(newResource);
      this.calendarOptions.resources = resourcesCopy;
      console.log(this.calendarOptions.resources);
      this.cdr.detectChanges();
    });
  }

  addIpmutation(imputation: Imputation) { 
    const newEvent = { id: imputation.idImputation.toString(),resourceId: imputation.project.idProject.toString(),start: imputation.dateImputation,end: imputation.dateImputation, title: imputation.dailyChargeImputation.toString() };
    const eventsArray = Array.isArray(this.calendarOptions.events) ? this.calendarOptions.events : [];
    const eventsCopy = [...eventsArray];
    // Delete the old imputation from the events list because by default events doesn't ensure unique id
    eventsCopy.forEach((element,index) => {
      if(element.id == imputation.idImputation.toString()) eventsCopy.splice(index,1);
    });
    eventsCopy.push(newEvent);
    this.calendarOptions.events = eventsCopy;
    //console.log(this.calendarOptions.events);
    this.cdr.detectChanges();
  }

  exportCra(){
    let calendarApi = this.calendarComponent.getApi();
    let month = calendarApi.getDate().getMonth()+1;
    let year = calendarApi.getDate().getFullYear();
    console.log("Year: " + year + " Month: " + month);
    this.imputationService.exportCra(this.idUser,month,year).subscribe(res => {
      console.log(res);
      const file = new Blob([res], { type: 'application/pdf' });
      saveAs(file, year+'-'+month+'.pdf');
    });
  
  }


}

