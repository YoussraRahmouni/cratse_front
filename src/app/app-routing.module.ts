import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthenticationGuard } from './guards/authentication.guard'
import { HomeUserComponent } from './views/home-user/home-user.component';
import { PermissionGuard } from './guards/permission.guard';



const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path:'login', component: LoginFormComponent },
  {path:'homeUser', component: HomeUserComponent, canActivate:[ AuthenticationGuard, PermissionGuard], data: { permission: 'user' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
