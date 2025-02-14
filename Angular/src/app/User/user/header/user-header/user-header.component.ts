import { Component, inject, ViewChild } from '@angular/core';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';

import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { BadgeModule } from 'primeng/badge';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { Drawer } from 'primeng/drawer';
import { LoginComponent } from '../../../../login/login.component';
import { ServerService } from '../../../../Services/service/server.service';
import { User } from '../../../../Model/loginUser';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css',
  standalone : false
})
export class UserHeaderComponent {
  checked: boolean = false;
  visible: boolean = false;


  @ViewChild('drawerRef') drawerRef!: Drawer;

  loggedUser?: User;
  serverService :ServerService = inject(ServerService);
  firstLetter:string='';
  login :LoginComponent = inject(LoginComponent);
  isAccountLogged=this.serverService.isAccountLogged;

  ngOnInit(){
    this.loggedUser=this.serverService.loggedUser[0];
    this.firstLetter=this.loggedUser.userName.slice(0,1);
   
  }

  closeCallback(e :any): void {
      this.drawerRef.close(e);
  }

}
