import { Component, OnChanges, OnInit } from '@angular/core';
import { DateTime } from '../../../Model/date-time';
import { Ticket } from '../../../Model/Ticket';
import { ServerService } from '../../../Services/service/server.service';
import { map } from 'rxjs';



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
  

  constructor(private serverService : ServerService){}

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
  

  // Featching issue List 
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
       
        console.log(this.featchedIssueList);

        this.groupIssuesByStatus(); // type of status
    })

  }


  // splitting the issues status to array

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
      commentedDate:DateTime,
      commenter:this.serverService.loggedUser[0].userName
    })

    this.serverService.onUpdate(''+viewIssueDetails.dataBaseId,viewIssueDetails);

      //Reset
    this.commentDisplay =false;
    this.viewIssueDetails={};
    this.text='';
        
  }


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


  onDeleteUser(dataBaseId : string,id : string){
    (this.serverService.onDeleteUser(dataBaseId,id)) ? alert("User ID : "+id+" is deleted"):alert("User ID : "+id+" is not deleted");
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
    this.editUserData.lastModifiedDateTime=DateTime
   console.log(this.editUserData);

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
}
