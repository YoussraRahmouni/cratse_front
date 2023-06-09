import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthenticationGuard } from './guards/authentication.guard'
import { HomeUserComponent } from './views/home-user/home-user.component';
import { PermissionGuard } from './guards/permission.guard';
import { ListProjectsComponent } from './components/list-projects/list-projects.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { CraComponent } from './components/cra/cra.component';
import { ListUsersAdminComponent } from './components/list-users-admin/list-users-admin.component';



const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path:'login', component: LoginFormComponent },
  {path:'allUsers', component: ListUsersAdminComponent, canActivate:[ AuthenticationGuard, PermissionGuard], data: { permission: 'Admin' } },
  {path:'homeUser', component: HomeUserComponent, canActivate:[ AuthenticationGuard, PermissionGuard], data: { permission: ['User', 'Manager', 'Admin'] } },
  {path:'users', component: ListUsersComponent, canActivate:[ AuthenticationGuard, PermissionGuard], data: { permission: 'Manager' } },
  {path:'projects', component: ListProjectsComponent, canActivate:[ AuthenticationGuard, PermissionGuard], data: { permission: 'Manager' } },
  { path: 'users/cra/:id', component: CraComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
