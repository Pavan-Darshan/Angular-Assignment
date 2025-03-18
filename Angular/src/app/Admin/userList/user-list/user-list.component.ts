import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../../Services/service/server.service';
import { NgForm } from '@angular/forms';
import { User } from '../../../Model/loginUser';

import { DateTime } from '../../../Model/DateTime';
import { UserUniqueId } from '../../../Model/user-Id-Create';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  standalone : false,
  
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
  isFilterHidden=false
  isSidebarVisible = false;
  loading:boolean= true;

//Filter data set----------------------------------->
  filterUserName ='';
  filterUserEmail ='';
  filterCreatedSource = '';
  filterCreatedSourceType = '';
  filterCreatedSourceDate = '';
  filterModifiedSource ='';
  filterModifiedSourceType ='';
  filterModifiedSourceDate = '';
  onFilterUserList : any[]=[];

  

  constructor(private sereverService : ServerService, private date : DateTime ,
     private userUniqueId : UserUniqueId,   private messageService: MessageService,
     private confirmationService: ConfirmationService){}

  ngOnInit(){
    this.feacthUserDetails();
  }


  // Featching user details
  feacthUserDetails(){
    this.sereverService.onUserList()
  
    .subscribe((res)=>{
        this.featchedUserList=res;
        setTimeout(()=>{
          this.loading=false
        },1000)
  
    })

  }
  onAddUser(){
    this.addForm = true;
    this.isCreate = true; // Heading Changing
    this.isEdit = false ;
    this.createdSourceDate =this.date.getCurrentTime();
    this.modifiedSourceDate =this.date.getCurrentTime();

  } 
  onUserData(formdata : NgForm){
    
    if(this.emailValidation(formdata.value.emailAddress)){
      this.emailAlready();
      this.addForm = true;
    this.isCreate = true; // Heading Changing
    this.isEdit = false ;
    
    }
    else{
    this.createdSourceDate = this.date.getCurrentTime();
    let newUser : User = {...formdata.value,checked:formdata.value.checked, dataBaseId  : '',
      createdDateTime : this.date.getCurrentTime(), lastModifiedDateTime : this.date.getCurrentTime(),
       password :'1111',userId : this.userUniqueId.generateUserId(), notification : 0};
    this.sereverService.onUserCreate(newUser).subscribe(()=>this.feacthUserDetails())?
    this.userCreated(newUser):null;
    this.addForm = false;
    formdata.reset();
    }
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
  this.checked =user.theme;
  this.createdDateTime = user.createdDateTime;
  this.userAddress = user.address;
  this.userCountry = user.country;
  this.userState = user.state;
  this.userCity = user.city;
  this.userPostalCode = user.postalCode;
  this.userLocale = user.locale;
  this.userTimeZone = user.timeZone;

  }


  // Close the form---------------------------->
  onClose(formdata : NgForm){
    this.addForm = false;
    this.isCreate = false;
    this.isEdit = false ;
    formdata.reset();
  }

  // update user--------------------------------------->
  onUpdeted(formdata :NgForm){  
    let newData = this.featchedUserList.find((user)=> user.emailAddress === formdata.value.emailAddress);
    
    let updateUserData : User = {...formdata.value, dataBaseId  : newData.dataBaseId, lastModifiedDateTime :DateTime, createdDateTime :newData.createdDateTime, password : newData.password,userId :newData.userId };
  
    this.sereverService.onUpdateUser(newData.dataBaseId,updateUserData).subscribe(()=>{this.feacthUserDetails();});
    this.addForm = false;
    this.isCreate =false;
    this.isEdit =false;
    formdata.reset();
  }

  onUserDelete(formdata : NgForm){
    let deleteUser = this.featchedUserList.find((user)=> user.emailAddress === formdata.value.emailAddress);
   

    this.confirmationService.confirm({
      accept: ()=>{
        this.sereverService.onDeleteUser(deleteUser.dataBaseId).subscribe(()=> this.feacthUserDetails());
        
        this.addForm = false;
        this.isCreate =false;
        this.isEdit =false;    
      },
      reject : ()=>{
          null
      }
    })

  }


// filter Open or close--------------------------->
  filterOpen(){
    this.isSidebarVisible = !this.isSidebarVisible;
    if(this.isSidebarVisible)
      this.isFilterHidden=true;
    else
      this.isFilterHidden=false;

  }


  // Side bar filter----------------------------------------------->
  filterApply(filterForm : NgForm){
    this.onFilterUserList = this.featchedUserList.filter((user) => (
      (filterForm.value.userName ? user.userName?.toLowerCase() === filterForm.value.userName.toLowerCase() : true) &&
      (filterForm.value.emailAddress ? user.emailAddress?.toLowerCase()  === filterForm.value.emailAddress.toLowerCase()  : true) &&
      (filterForm.value.createdSource ? user.createdSource?.toLowerCase()  === filterForm.value.createdSource.toLowerCase()  : true) &&
      (filterForm.value.createdSourceType ? user.createdSourceType?.toLowerCase()  === filterForm.value.createdSourceType.toLowerCase()  : true) &&
      (filterForm.value.createdDateTime ? user.createdDateTime?.toLowerCase()  === filterForm.value.createdDateTime.toLowerCase()  : true) &&
      (filterForm.value.modifiedSource ? user.modifiedSource?.toLowerCase()  === filterForm.value.modifiedSource.toLowerCase()  : true) &&
      (filterForm.value.modifiedSourceType ? user.modifiedSourceType?.toLowerCase()  === filterForm.value.modifiedSourceType.toLowerCase()  : true) &&
      (filterForm.value.modifiedSourceDate ? user.modifiedSourceDate?.toLowerCase()  === filterForm.value.modifiedSourceDate.toLowerCase()  : true)
    ));
    
    this.isFilterApplied = true;
    filterForm.reset();
    
  }

  resetFilter(){
    this.onFilterUserList = this.featchedUserList;
  }


  // email validation---------------------------------------------->
  emailValidation(email : string) : boolean{
     return this.featchedUserList.some((user)=>{
        return ((user.emailAddress?.toLowerCase().trim()) === (email.toLowerCase().trim()));
        
      })
  }


  emailAlready(){
    this.messageService.add({ severity: 'info', summary: 'Info', 
      detail: "Eamil is already used.......", life: 3000 , key : 'tc'})
  }

  userCreated(user :User){
    this.messageService.add({ severity: 'success', summary: 'Success', 
      detail: "User created and User ID : "+user.userId, life: 3000 , key : 'tc' })
  }
}
