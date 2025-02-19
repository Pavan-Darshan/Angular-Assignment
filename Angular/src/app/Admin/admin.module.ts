import { NgModule } from "@angular/core";
import { AdminRoutingModule } from "./admin-routing.module";
import { RouterLink } from "@angular/router";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AdminFooterComponent } from "./footer/admin-footer/admin-footer.component";
import { DialogModule } from "primeng/dialog";
import { AdminHeaderComponent } from "./header/admin-header/admin-header.component";
import { FormsModule } from "@angular/forms";
import { ToggleSwitch } from "primeng/toggleswitch";
import { DrawerModule } from "primeng/drawer";
import { ButtonModule } from "primeng/button";
import { OverlayBadgeModule } from "primeng/overlaybadge";
import { BadgeModule } from "primeng/badge";
import { AvatarModule } from "primeng/avatar";
import { AdminComponent } from "./admin.component";
import { IssueComponent } from "./issue/issue/issue.component";
import { UserListComponent } from "./userList/user-list/user-list.component";
import { CommonModule } from "@angular/common";
import { RoutingModule } from "../app.routing.module";
import { HttpClientModule } from "@angular/common/http";
import { TabsModule } from "primeng/tabs";
import { TableModule } from "primeng/table";
import { InputIcon } from "primeng/inputicon";
import { IconField } from "primeng/iconfield";
import { MultiSelectModule } from "primeng/multiselect";
import { FileUpload } from "primeng/fileupload";
import { ToastModule } from "primeng/toast";
import { EditorModule } from "primeng/editor";
import { Slider } from "primeng/slider";
import { DropdownModule } from "primeng/dropdown";
import { Select } from "primeng/select";
import { FloatLabel } from "primeng/floatlabel";
import { InputTextModule } from "primeng/inputtext";
import { FluidModule } from "primeng/fluid";
import { Tag } from "primeng/tag";
import { ProgressBar } from "primeng/progressbar";
import { CheckboxModule } from 'primeng/checkbox';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Tooltip } from 'primeng/tooltip';
import { TieredMenu } from 'primeng/tieredmenu';
import { TieredMenuModule } from 'primeng/tieredmenu';




@NgModule({
    declarations:[AdminComponent,AdminDashboardComponent,AdminHeaderComponent ,
        AdminFooterComponent,IssueComponent, UserListComponent],

    imports:[AdminRoutingModule,CommonModule,RouterLink, RoutingModule, HttpClientModule,TabsModule,TableModule,Tooltip,
            Tag,InputIcon,IconField,MultiSelectModule,Slider,ProgressBar,ButtonModule,DialogModule,FormsModule,TieredMenu,
            ToggleSwitch,DrawerModule,FileUpload,ToastModule,EditorModule,AvatarModule,OverlayBadgeModule,BadgeModule,TieredMenuModule,
            FluidModule,InputTextModule,FloatLabel,Select,DropdownModule, CheckboxModule, ChartModule,MenuModule,BrowserAnimationsModule],

            providers: [],
        
    exports:[AdminRoutingModule]
})
export class AdminModule{}