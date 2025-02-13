import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RoutingModule } from "./app.routing.module";

import { HttpClientModule } from "@angular/common/http";

import { ButtonModule } from 'primeng/button';
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { providePrimeNG } from "primeng/config";
import Aura from '@primeng/themes/aura';
import { DialogModule } from "primeng/dialog";
import { FormsModule } from "@angular/forms";
import { ToggleSwitch } from "primeng/toggleswitch";
import { DrawerModule } from "primeng/drawer";
import { AvatarModule } from "primeng/avatar";
import { OverlayBadgeModule } from "primeng/overlaybadge";
import { BadgeModule } from "primeng/badge";
import { RouterLink } from "@angular/router";
import { UserModule } from "./User/user/user.module";
import { AdminModule } from "./Admin/admin.module";




@NgModule({
    declarations:[AppComponent,LoginComponent],
    imports:[BrowserModule, RoutingModule, HttpClientModule,
            ButtonModule,DialogModule,FormsModule, ToggleSwitch,DrawerModule,
            ButtonModule,AvatarModule,OverlayBadgeModule,BadgeModule,RouterLink,UserModule,AdminModule],
    bootstrap:[AppComponent],
    providers:[provideAnimationsAsync(),providePrimeNG({ theme: {preset: Aura}}),LoginComponent]

})

export class AppModule{}