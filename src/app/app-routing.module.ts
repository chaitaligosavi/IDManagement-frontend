import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { EmployeeComponent } from './employee/employee.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
    // { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'employee', component: EmployeeComponent},
    { path: 'user', component: UserComponent},
    { path: '**', component: PagenotfoundComponent},
    
];

@NgModule({
  imports: [ RouterModule.forRoot(routes,  { useHash: true } ) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule{ }
