import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthenticationGuard } from './authentication.guard'
import { HomeUserComponent } from './views/home-user/home-user.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  {path:'login', component: LoginFormComponent },
  {path:'homeUser', component: HomeUserComponent, canActivate:[ AuthenticationGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
