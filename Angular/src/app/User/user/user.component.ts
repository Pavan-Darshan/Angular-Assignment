import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { UserHeaderComponent } from "./header/user-header/user-header.component";
import { UserFooterComponent } from "./footer/user-footer/user-footer.component";
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';  // For ngModel
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [UserHeaderComponent, UserFooterComponent,ButtonModule,DropdownModule,FormsModule,CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  selectedCategory: any;
  selectedCategory1: any; // Store selected category

  

  categories = [
    { name: 'Hardware', options: ['Allocate Laptop', 'Allocate Hardware', 'Hardware replacement'] },
    { name: 'Software', options: ['Software Installation', 'Antivirus', 'Email Password update', 'Laptop Slowness issue', 'Software Issue'] },
    { name: 'Access Management', options: ['Software access', 'Wifi Access', 'Database Access', 'VPN Access'] }
  ];

  Hardware =['Allocate Laptop', 'Allocate Hardware', 'Hardware replacement'];
  Software =['Software Installation', 'Antivirus', 'Email Password update', 'Laptop Slowness issue', 'Software Issue'];
  Management=['Software access', 'Wifi Access', 'Database Access', 'VPN Access'] 


  Onclick(){
    console.log(this.selectedCategory.name);
    console.log(this.selectedCategory1);
    console.log("H00"+(this.Hardware.findIndex((topic)=> topic === this.selectedCategory1)+1));
    
    
  }
}
