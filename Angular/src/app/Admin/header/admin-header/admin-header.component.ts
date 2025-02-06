import { Component, inject, ViewChild } from '@angular/core';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';

import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { BadgeModule } from 'primeng/badge';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { Drawer } from 'primeng/drawer';
import { LoginUser } from '../../../Model/loginUser';
import { ServerService } from '../../../Services/service/server.service';

@Component({
  selector: 'app-admin-header',
  imports: [FormsModule, ToggleSwitch,DrawerModule,ButtonModule,
     AvatarModule,OverlayBadgeModule,BadgeModule],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {

  checked: boolean = false;
  visible: boolean = false;


  @ViewChild('drawerRef') drawerRef!: Drawer;

  loggedUser?: LoginUser;
    serverService :ServerService = inject(ServerService);
    firstLetter:string='';
    
  
  
    ngOnInit(){
      this.loggedUser=this.serverService.loggedUser[0];
      this.firstLetter=this.loggedUser.userName.slice(0,1);
    
      
    }

  closeCallback(e :any): void {
      this.drawerRef.close(e);
  }

 

 

}
