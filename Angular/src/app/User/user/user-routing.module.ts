import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';

export const routes: Routes = [
  { path: '', component: UserComponent },
  

  {
    path: '',component :UserComponent,
    children: [

      { path: 'dashboard', component: UserDashboardComponent}
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
