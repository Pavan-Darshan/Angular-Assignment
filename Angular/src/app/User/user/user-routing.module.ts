import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { FormComponent } from './createTicket/form/form.component';
import { CanActivate } from '../../Services/authGuard';
import { MyTicketComponent } from './my_ticket/my-ticket/my-ticket.component';

export const routes: Routes = [
  { path: '', component: UserComponent },
  

  {
    path: '',component :UserComponent,canActivate :[CanActivate],
    children: [

      { path: 'dashboard', component: UserDashboardComponent},
      { path: 'myTicket', component: MyTicketComponent},
      { path: 'createTicket', component: FormComponent}
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
