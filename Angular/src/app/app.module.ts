import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RoutingModule } from "./app.routing.module";

import { HttpClientModule } from "@angular/common/http";
import { TabViewModule } from "primeng/tabview";
import { ButtonModule } from 'primeng/button';
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { providePrimeNG } from "primeng/config";
import Aura from '@primeng/themes/aura';



@NgModule({
    declarations:[AppComponent,LoginComponent],
    imports:[BrowserModule, RoutingModule, HttpClientModule, TabViewModule, ButtonModule],
    bootstrap:[AppComponent],
    providers:[provideAnimationsAsync(),providePrimeNG({ theme: {preset: Aura}}),LoginComponent]

})

export class AppModule{}