import {  Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";

import { AdminComponent } from "./Admin/admin.component";
import { UserComponent } from "./User/user/user.component";




export const routes : Routes =[
    {path : '', component : LoginComponent, },
    {path : 'admin', component : AdminComponent, },
    
    { path: 'admin', loadChildren: () => import('./Admin/admin-routing.module')
        .then(m => m.AdminRoutingModule) },

    { path: 'user', loadChildren: () => import('./User/user/user-routing.module')
        .then(m => m.UserRoutingModule) },  // Lazy loading 
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports : [RouterModule]

})

export class RoutingModule {}