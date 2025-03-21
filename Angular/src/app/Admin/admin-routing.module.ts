import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { IssueComponent } from './issue/issue/issue.component';
import { UserListComponent } from './userList/user-list/user-list.component';

import { CanActivate } from '../Services/authGuard';
import { CalendarComponent } from './calendar/calendar.component';
import { TaskManagementComponent } from './task-management/task-management.component';

export const routes: Routes = [
  { path: '', component: AdminComponent , canActivate :[CanActivate] },
  
  {
    path: '',component :AdminComponent ,canActivate :[CanActivate],
    children: [
      { path: 'dashboard', component: AdminDashboardComponent, },
      { path: 'issue', component: IssueComponent},
      { path: 'userList', component: UserListComponent},
      { path: 'calendar', component: TaskManagementComponent}
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }