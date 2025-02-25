import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserHeaderComponent } from './header/user-header/user-header.component';
import { UserFooterComponent } from './footer/user-footer/user-footer.component';
import { RouterLink } from '@angular/router';
import { RoutingModule } from '../../app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TabViewModule } from 'primeng/tabview';
import { DrawerModule } from 'primeng/drawer';
import { BadgeModule } from 'primeng/badge';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { FormComponent } from './createTicket/form/form.component';
import { Select } from 'primeng/select';
import { DropdownModule } from 'primeng/dropdown'; 
import { FileUpload } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { TabsModule } from 'primeng/tabs';


import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';

import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';


import { MultiSelectModule } from 'primeng/multiselect';

import { Slider } from 'primeng/slider';
import { ProgressBar } from 'primeng/progressbar';
import { EditorModule } from 'primeng/editor';
import { AdminRoutingModule } from '../../Admin/admin-routing.module';
import { Tooltip } from 'primeng/tooltip';
import { TieredMenu, TieredMenuModule } from 'primeng/tieredmenu';
import { CheckboxModule } from 'primeng/checkbox';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { MyTicketComponent } from './my_ticket/my-ticket/my-ticket.component';



@NgModule({
  declarations: [UserComponent,UserHeaderComponent, UserFooterComponent,FormComponent ,UserDashboardComponent,MyTicketComponent],
  imports:[AdminRoutingModule,CommonModule,RouterLink, RoutingModule, HttpClientModule,TabsModule,TableModule,Tooltip,OverlayPanelModule,
             Tag,InputIcon,IconField,MultiSelectModule,Slider,ProgressBar,ButtonModule,DialogModule,FormsModule,TieredMenu,
             ToggleSwitch,DrawerModule,FileUpload,ToastModule,EditorModule,AvatarModule,OverlayBadgeModule,BadgeModule,TieredMenuModule,
             FluidModule,InputTextModule,FloatLabel,Select,DropdownModule, CheckboxModule, ChartModule,MenuModule,BrowserAnimationsModule],
 
  exports: [UserRoutingModule] 
})
export class UserModule { 

 
}
