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



@NgModule({
  declarations: [UserComponent,UserHeaderComponent, UserFooterComponent,FormComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterLink, RoutingModule, HttpClientModule,TabsModule,TableModule,Tag,InputIcon,IconField,MultiSelectModule,Slider,ProgressBar,
                ButtonModule,DialogModule,FormsModule, ToggleSwitch,DrawerModule,FileUpload,ToastModule,EditorModule,
                AvatarModule,OverlayBadgeModule,BadgeModule,FluidModule,InputTextModule,FloatLabel,Select,DropdownModule],
  exports: [UserRoutingModule] 
})
export class UserModule { 

 
}
