import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../../Services/service/server.service';
import { NgForm } from '@angular/forms';
import { User } from '../../../Model/loginUser';

import { DateTime } from '../../../Model/DateTime';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  standalone : false
})
export class UserListComponent implements OnInit {
  featchedUserList: any[]=[]; // all Users
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

  isFilterApplied = false;

  addForm : boolean =false;
  

  constructor(private sereverService : ServerService, private date : DateTime){}

  ngOnInit(){
      
    this.feacthUserDetails();
      
  }


  // Featching user details
  feacthUserDetails(){
    this.sereverService.onUserList()
     
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
    
    this.createdSourceDate = this.date.getCurrentTime();
    let newUser : User={...formdata.value, dataBaseId  : '',createdDateTime : DateTime, lastModifiedDateTime :'---', password :'1111',userId :'1003'};
    this.sereverService.onUserCreate(newUser).subscribe(()=>this.feacthUserDetails());
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
  onClose(formdata : NgForm){
    this.addForm = false;
    this.isCreate = false;
    this.isEdit = false ;
    formdata.reset();

  }

  // update user
  onUpdeted(formdata :NgForm){  
    console.log("updating...");
    console.log(formdata.value);
    
    let newData = this.featchedUserList.find((user)=> user.emailAddress === formdata.value.emailAddress);
    
    let updateUserData : User = {...formdata.value, dataBaseId  : newData.dataBaseId, lastModifiedDateTime :DateTime, createdDateTime :newData.createdDateTime, password : newData.password,userId :newData.userId };
    this.sereverService.onUpdateUser(newData.dataBaseId,updateUserData).subscribe(()=>{this.feacthUserDetails();});
    this.addForm = false;
    this.isCreate =false;
    this.isEdit =false;
    

  }

  onUserDelete(formdata : NgForm){
      
    let deleteUser = this.featchedUserList.find((user)=> user.emailAddress === formdata.value.emailAddress) ;

    confirm(`Do you want to delete "`+deleteUser.userName+`"`) ? 
    this.sereverService.onDeleteUser(deleteUser.dataBaseId).subscribe(()=> this.feacthUserDetails()) : null;
    this.addForm = false;
    this.isCreate =false;
    this.isEdit =false;    
  }




  isFilterHidden=false
  isSidebarVisible = false;

  filterOpen(){
    this.isSidebarVisible = !this.isSidebarVisible;
    if(this.isSidebarVisible)
      this.isFilterHidden=true;
    else
      this.isFilterHidden=false;

  }

  filterUserName ='';
  filterUserEmail ='';
  filterCreatedSource = '';
  filterCreatedSourceType = '';
  filterCreatedSourceDate = '';
  filterModifiedSource ='';
  filterModifiedSourceType ='';
  filterModifiedSourceDate = '';

  onFilterUserList : any[]=[];

  filterApply(filterForm : NgForm){
    
    this.onFilterUserList = this.featchedUserList.filter((user) => (
      (filterForm.value.userName ? user.userName === filterForm.value.userName : true) &&
      (filterForm.value.emailAddress ? user.emailAddress === filterForm.value.emailAddress : true) &&
      (filterForm.value.createdSource ? user.createdSource === filterForm.value.createdSource : true) &&
      (filterForm.value.createdSourceType ? user.createdSourceType === filterForm.value.createdSourceType : true) &&
      (filterForm.value.createdDateTime ? user.createdDateTime === filterForm.value.createdDateTime : true) &&
      (filterForm.value.modifiedSource ? user.modifiedSource === filterForm.value.modifiedSource : true) &&
      (filterForm.value.modifiedSourceType ? user.modifiedSourceType === filterForm.value.modifiedSourceType : true) &&
      (filterForm.value.modifiedSourceDate ? user.modifiedSourceDate === filterForm.value.modifiedSourceDate : true)
    ));
    
    this.isFilterApplied = true;
    filterForm.reset();
  
    
  }

  resetFilter(){
    
    this.onFilterUserList = this.featchedUserList;
    
  }
  
}
