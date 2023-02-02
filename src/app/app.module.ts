import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeUserComponent } from './views/home-user/home-user.component';
import { CraComponent } from './components/cra/cra.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ImputationComponent } from './components/imputation/imputation.component';
import { HttpClientModule } from '@angular/common/http';
import { ListProjectsComponent } from './components/list-projects/list-projects.component';
import { FormProjectComponent } from './components/form-project/form-project.component';

@NgModule({
  declarations: [
    AppComponent,
    DropdownComponent,
    NavbarComponent,
    LoginFormComponent,
    HomeUserComponent,
    CraComponent,
    ImputationComponent,
    ListProjectsComponent,
    FormProjectComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
