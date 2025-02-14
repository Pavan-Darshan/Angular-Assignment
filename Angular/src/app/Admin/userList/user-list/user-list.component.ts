import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../../Services/service/server.service';
import { EmailValidator, NgForm } from '@angular/forms';
import { User } from '../../../Model/loginUser';
import { DateTime } from '../../../Model/date-time';
import { map } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  standalone : false
})
export class UserListComponent implements OnInit {
  featchedUserList: any[]=[];
  selectedIssue :any;
  isEdit : boolean = false;
  isCreate : boolean = false;

  userName : string ='';
  userType : string ='';
  userPhone ?: number ;
  userEmail : string ='';
  createdSource : string = '';
  createdSourceType : string = '';
  createdSourceDate : string = '';
  modifiedSource : string = '';
  modifiedSourceType : string = '';
  modifiedSourceDate : string = '';
  checked : boolean =false;
  createdDateTime ?: string ;

  userAddress : string = '';
  userCountry : string = '';
  userState : string ='';
  userCity : string ='';
  userPostalCode ?: number;
  userLocale : string ='';
  userTimeZone : string ='';



  addForm : boolean =false;
  

  constructor(private sereverService : ServerService){}

  ngOnInit(){
      this.sereverService.onUserList()
      .pipe(map((response)=>
            {
          
            let data :any [] = [];
            
            for(let key in response){
              if(response.hasOwnProperty(key))
                data.push({...response[key],dataBaseId:key})
            }
            return data;
          }))
          .subscribe((res)=>{
              this.featchedUserList=res;
              // setTimeout(()=>{
              //   this.loading=false
              // },2000)
             
              console.log(this.featchedUserList);
          })
      
      
  }
  onAddUser(){
    this.addForm = true;
    this.isCreate = true; // Heading Changing
    this.isEdit = false ;
  }
  onUserData(formdata : NgForm){
    
    this.createdSourceDate = DateTime;
    let newUser : User={...formdata.value, dataBaseId  : '',createdDateTime : DateTime, lastModifiedDateTime :'---', password :'1111',userId :'1003'};
    this.sereverService.onUserCreate(newUser).subscribe();
    console.log(newUser);
    console.log(this.userAddress);
    this.addForm = false;

  }
  onSelectUser(user : User){
    this.addForm = true;  // Heading Changing
    this.isCreate = false;
    this.isEdit = true ;
    
    
  this.userName = user.userName;
  this.userType =user.userType;
  this.userPhone = user.userPhone ;
  this.userEmail =user.emailAddress;
  this.createdSource = user.createdSource;
  this.createdSourceType = user.createdSourceType;
  this.createdSourceDate =user.createdSourceDate;
  this.modifiedSource = user.modifiedSource;
  this.modifiedSourceType = user.modifiedSourceType;
  this.modifiedSourceDate = user.modifiedSourceDate;
  this.checked =user.checked;
  this.createdDateTime = user.createdDateTime;

  this.userAddress = user.address;
  this.userCountry = user.country;
  this.userState = user.state;
  this.userCity = user.city;
  this.userPostalCode = user.postalCode;
  this.userLocale = user.locale;
  this.userTimeZone = user.timeZone;
  }


  //Close the form
  onClose(){
    this.addForm = false;
    this.isCreate = false;
    this.isEdit = false ;

        
  this.userName = '';
  this.userType = '';
  this.userPhone =Number('') ;
  this.userEmail = '';
  this.createdSource = '';
  this.createdSourceType = '';
  this.createdSourceDate = '';
  this.modifiedSource = '';
  this.modifiedSourceType = '';
  this.modifiedSourceDate = '';
  this.checked ;

  this.userAddress = '';
  this.userCountry = '';
  this.userState = '';
  this.userCity = '';
  this.userPostalCode = Number('');
  this.userLocale = '';
  this.userTimeZone = '';

  }

  onUpdeted(formdata :NgForm){
    this.createdSourceDate = DateTime;
    let newUser : User={...formdata.value, dataBaseId  : formdata.value.dataBaseId, lastModifiedDateTime :DateTime};
    this.sereverService.onUpdateUser(formdata.value.dataBaseId,newUser).subscribe();
    

  }
}
