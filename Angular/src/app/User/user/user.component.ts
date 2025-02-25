import { Component, inject, OnChanges, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';  // For ngModel
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  standalone :false,
  providers: [ButtonModule,DropdownModule,FormsModule,CommonModule]
})
export class UserComponent  {
  
  isFormActive= false;
 
 
}
