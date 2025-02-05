import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RoutingModule } from "./app.routing.module";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { TabViewModule } from "primeng/tabview";
import { ButtonModule } from 'primeng/button';



@NgModule({
    declarations:[AppComponent,LoginComponent],
    imports:[BrowserModule, RoutingModule, HttpClientModule, TabViewModule, ButtonModule],
    bootstrap:[AppComponent],
    providers:[]

})


export class AppModule{}