import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AdminDashboardComponent } from "./Admin/admin-dashboard/admin-dashboard.component";
import { AdminComponent } from "./Admin/admin.component";
import { UserComponent } from "./User/user/user.component";



const routes : Routes =[
    {path : '', component : LoginComponent},
    {path : 'admin', component : AdminComponent},
    {path : 'user', component : UserComponent}
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports : [RouterModule]

})

export class RoutingModule {}