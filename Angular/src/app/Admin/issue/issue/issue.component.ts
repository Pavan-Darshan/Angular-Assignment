import { Component, OnChanges, OnInit } from '@angular/core';
import { Ticket } from '../../../Model/Ticket';
import { ServerService } from '../../../Services/service/server.service';
import { map } from 'rxjs';
import { User } from '../../../Model/loginUser';
import { DateTime } from '../../../Model/DateTime';





interface Priority {
  name: string;
  code: string;
}

interface Issue {
  label: string;
  value: string;
  code :string;
}

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrl: './issue.component.css',
  standalone : false
})
export class IssueComponent implements OnInit,OnChanges{
  

  constructor(
    private serverService : ServerService, private date : DateTime){}
  

  isFormActive :boolean = false;
  featchedIssueList :Ticket []=[];
  selectedIssue : Ticket []=[];

  searchValue =''
  loading:boolean= true;
  commentDisplay : boolean =false;
  viewIssueDetails ?:any;
  text :string=''

  ngOnInit(){
    this.featchIssueData ();


   
  }
  ngOnChanges(){
    this.featchIssueData ();
  }
 



  onCreateTicket(){
    this.isFormActive = true;}

  onSaveTicket(value : boolean){
    this.isFormActive = value;
    if(!value)
      this.featchIssueData();
  }
  

  // Featching issue List --------------------->
  featchIssueData(){
    this.serverService.featchIssueList()
    .pipe(map((response)=>
      {
    
      let data :Ticket [] = [];
      
      for(let key in response){
        if(response.hasOwnProperty(key))
          data.push({...response[key],dataBaseId:key})
      }
      return data;
    }))
    .subscribe((res)=>{
        this.featchedIssueList=res;
        setTimeout(()=>{
          this.loading=false
        },2000)
        
        this.groupIssuesByStatus(); // type of status
        
    })

  }


  // splitting the issues status to array-------------->

  groupedIssues: any = {
    open: [],
    inProgress: [],
    waiting: [],
    fixed: [],
    closed: []
  };

 

  groupIssuesByStatus() {
   
    this.groupedIssues.open = this.featchedIssueList.filter(issue => issue.statusId === 'Open');
    this.groupedIssues.inProgress = this.featchedIssueList.filter(issue => issue.statusId === 'InProgress');
    this.groupedIssues.waiting = this.featchedIssueList.filter(issue => issue.statusId === 'Waiting');
    this.groupedIssues.fixed = this.featchedIssueList.filter(issue => issue.statusId === 'Fixed');
    this.groupedIssues.closed = this.featchedIssueList.filter(issue => issue.statusId === 'Closed');
    
  }


  

  showMessage(issue : Ticket){
    this.commentDisplay =true;
    this.viewIssueDetails={...issue};
  }

  commentViewCancel(){
    this.commentDisplay =false;
    this.viewIssueDetails={};
    this.text='';
    
  }
  onSaveComment(viewIssueDetails : Ticket){

    // Plain text---------------------------->
    let plainText=''
    const div = document.createElement('div');
    div.innerHTML = this.text;
    plainText = div.textContent || div.innerText || '';
    console.log(plainText); 

   
    
    //Adding comment-------------------------------->
    viewIssueDetails.comment?.push({
      comment:plainText,
      commentedDate: this.date.getCurrentTime(),
      commenter:this.serverService.loggedUser[0].userName
    })

    this.serverService.onUpdate(''+viewIssueDetails.dataBaseId,viewIssueDetails);

      //Reset----------------------------------------->
    this.commentDisplay =false;
    this.viewIssueDetails={};
    this.text='';
        
  }

  // Open Commented window ------------------------------>
  isPopupVisible: boolean = false;
  popupPosition = { top: 0, left: 0 };

  openPopup(event: MouseEvent) { 
    if (this.isPopupVisible) {
    this.isPopupVisible = false;  
  } else {
    this.popupPosition.top = event.clientY-225;
    this.popupPosition.left = event.clientX+25;
    this.isPopupVisible = true;  
  }
  }

// Deletre User-------------------------------------------->
  onDeleteUser(user : User){
    console.log(user.lastModifiedDateTime?.slice(0,11));
    let date =user.lastModifiedDateTime
     let d = new Date(`${date}`)
     console.log(d.valueOf())

    confirm('Do you want to delete ...?')?
            ((this.serverService.onDeleteUserIssue(""+user.dataBaseId)) ? 
            alert("User ID : "+user.userId+" is deleted"):alert("User ID : "+user.userId+" is not deleted"))
            :
            null
  }


  editDisplay :boolean = false;
  editUserData : any;
  priorityID : string ='';
  assigneeID : string = '';
  statusID : string ='';
  lastModifiedDateTime : string = '';
  Priority : Priority[]= [
    { name: 'Low', code: 'Low' },
    { name: 'MEDIUM', code: 'MEDIUM' },
    { name: 'HIGH', code: 'HIGH' },
    { name: 'CRITICAL', code: 'CRITICAL' }
  ];

  Assignee : any[] = [
    {name: 'Admin-Pavan',id :'101'},
    {name : 'Admin-Darshan',id : '102'}
  ]

  Status : any[] = [
    { label: 'Open',id :'Open'},
    {label: 'InProgress',id :'InProgress'},
    {label: 'Waiting',id :'Waiting'},
    {label: 'Fixed',id :'Fixed'},
    {label: 'Closed',id :'Closed'}
    
  ]

  onEdit(user : any){
    this.editUserData =user;

  this.priorityID = user.priorityId;
  this. assigneeID = user.assigneeId;
  this.statusID = user.statusId;
  this.lastModifiedDateTime = user.lastModifiedDateTime;
  this.editDisplay=true;
      
  }
    
  onUpdate(){
    this.editUserData.priorityId=this.priorityID;
    this.editUserData.assigneeId = this.assigneeID;
    this.editUserData.statusId = this.statusID;

    this.editUserData.lastModifiedDateTime = this.date.getCurrentTime();

    console.log(this.editUserData.lastModifiedDateTime);

    

   this.serverService.onUpdate(this.editUserData.dataBaseId, this.editUserData) ? 
   alert('Updated Successfully...'):alert("Not Updated...!")

   this.editDisplay=false;
 
   this.editUserData='';
   this.featchIssueData ();
   

  }

  cancelTicket(){
    this.editDisplay=false;
    this.editUserData='';

  }

// Time Validation for 7 days
  getTimeDate(user :User){
      let currentTime = this.date.getCurrentTime();
      const newDate = (new Date(`${currentTime}`).valueOf()) - (new Date(`${user.lastModifiedDateTime}`).valueOf());
      
      if(newDate>=604800){
        return true
      }
      return false;
  }
}


