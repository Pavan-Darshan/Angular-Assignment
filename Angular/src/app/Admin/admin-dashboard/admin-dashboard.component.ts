import { Component } from '@angular/core';
import { ServerService } from '../../Services/service/server.service';
import { map } from 'rxjs';
import { Ticket } from '../../Model/Ticket';
import { SharedService } from '../../Services/shared.service';





@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
  standalone : false
})
export class AdminDashboardComponent  {
 
  lineChart : any;
  barChart : any;
  doughnutChart : any;
  pieChart : any;
  options : any;
  List :Ticket []=[];

constructor(private service : ServerService, private sharedService :SharedService){}

ngOnInit(){

  this.featchIssueData()
}


  
// Featching issue List --------------------->
featchIssueData(){
  this.service.featchIssueList()
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
      this.List=res;
      this.sharedService.updateData(this.List);
      
      this.groupIssuesByStatus(); // type of status
      
  })

}

  
// splitting the issues status to array-------------->

groupedIssues: any = {
  open: [],
  inProgress: [],
  waiting: [],
  fixed: [],
  closed: [],

};
OpenJan :number =0;
OpenFeb : number =0;
OpenSep : number = 0;
OpenOct : number = 0;
OpenNov : number = 0;
OpenDec : number = 0;
Open : number [] = [];


progessJan :number =0;
progessFeb : number =0;
progessSep : number = 0;
progessOct : number = 0;
progessNov : number = 0;
progessDec: number = 0;
progress : number [] = [];

waitingJan :number =0;
waitingFeb : number =0;
waitingSep : number = 0;
waitingOct : number = 0;
waitingNov : number = 0;
waitingDec: number = 0;
waiting : number [] = [];

fixedJan :number =0;
fixedFeb : number =0;
fixedSep : number = 0;
fixedOct : number = 0;
fixedNov : number = 0;
fixedDec: number = 0;
fixed : number [] = [];
   
hardwareJan :number =0;
hardwareFeb : number =0;
hardwareSep : number = 0;
hardwareOct : number = 0;
hardwareNov : number = 0;
hardwareDec: number = 0;


softwareJan :number =0;
softwareFeb : number =0;
softwareSep : number = 0;
softwareOct : number = 0;
softwareNov : number = 0;
softwareDec: number = 0;

amJan :number =0;
amFeb : number =0;
amSep : number = 0;
amOct : number = 0;
amNov : number = 0;
amDec: number = 0;





hardware : any[] =[];
software : any[] =[];
accessManagement : any[] =[];


high : any []= [];
critical : any []= [];
medium : any []= [];
low : any []= [];

hardwareData :any []=[];
softwareData :any []=[] ;
accessM_Data :any []=[] ;




  
groupIssuesByStatus() {
     
  this.groupedIssues.open = this.List.filter(issue => issue.statusId === 'Open');
  this.groupedIssues.inProgress = this.List.filter(issue => issue.statusId === 'InProgress');
  this.groupedIssues.waiting = this.List.filter(issue => issue.statusId === 'Waiting');
  this.groupedIssues.fixed = this.List.filter(issue => issue.statusId === 'Fixed');
  this.groupedIssues.closed = this.List.filter(issue => issue.statusId === 'Closed');


  this.hardware=this.List.filter((issue)=> issue.categoryId == 'Hardware');
  this.software=this.List.filter((issue)=> issue.categoryId == 'Software');
  this.accessManagement=this.List.filter((issue)=> issue.categoryId == 'Access Management');


  this.high=this.List.filter((issue)=> issue.priorityId == 'HIGH');
  this.low=this.List.filter((issue)=> issue.priorityId == 'LOW');
  this.critical=this.List.filter((issue)=> issue.priorityId == 'CRITICAL');
  this.medium=this.List.filter((issue)=> issue.priorityId == 'MEDIUM');
    


this.groupedIssues.open.forEach((element: any) => {
  ((element.createDateTime.slice(3,6)==='Jan') ? (this.OpenJan+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Feb') ? (this.OpenFeb+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Sep') ? (this.OpenSep+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Oct') ? (this.OpenOct+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Nov') ? (this.OpenNov+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Dec') ? (this.OpenDec+=1): null)
  
});

  this.groupedIssues.inProgress.forEach((element: any) => {
    ((element.createDateTime.slice(3,6)==='Jan') ? (this.progessJan+=1): null) ||
    ((element.createDateTime.slice(3,6)==='Feb') ? (this.progessFeb+=1): null) ||
    ((element.createDateTime.slice(3,6)==='Sep') ? (this.progessSep+=1): null) ||
    ((element.createDateTime.slice(3,6)==='Oct') ? (this.progessOct+=1): null) ||
    ((element.createDateTime.slice(3,6)==='Nov') ? (this.progessNov+=1): null) ||
    ((element.createDateTime.slice(3,6)==='Dec') ? (this.progessDec+=1): null)
    
});
this.groupedIssues.waiting.forEach((element: any) => {
  ((element.createDateTime.slice(3,6)==='Jan') ? (this.waitingJan+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Feb') ? (this.waitingFeb+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Sep') ? (this.waitingSep+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Oct') ? (this.waitingOct+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Nov') ? (this.waitingNov+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Dec') ? (this.waitingDec+=1): null)
  
});
this.groupedIssues.fixed.forEach((element: any) => {
  ((element.createDateTime.slice(3,6)==='Jan') ? (this.fixedJan+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Feb') ? (this.fixedFeb+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Sep') ? (this.fixedSep+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Oct') ? (this.fixedOct+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Nov') ? (this.fixedNov+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Dec') ? (this.fixedDec+=1): null)
  
});



this.hardware.forEach((element: any) => {
  ((element.createDateTime.slice(3,6)==='Jan') ? (this.hardwareJan+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Feb') ? (this.hardwareFeb+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Sep') ? (this.hardwareSep+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Oct') ? (this.hardwareOct+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Nov') ? (this.hardwareNov+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Dec') ? (this.hardwareDec+=1): null)
  
});

this.software.forEach((element: any) => {
  ((element.createDateTime.slice(3,6)==='Jan') ? (this.softwareJan+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Feb') ? (this.softwareFeb+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Sep') ? (this.softwareSep+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Oct') ? (this.softwareOct+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Nov') ? (this.softwareNov+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Dec') ? (this.softwareDec+=1): null)
  
});
this.accessManagement.forEach((element: any) => {
  ((element.createDateTime.slice(3,6)==='Jan') ? (this.amJan+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Feb') ? (this.amFeb+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Sep') ? (this.amSep+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Oct') ? (this.amOct+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Nov') ? (this.amNov+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Dec') ? (this.amDec+=1): null)
  
});





  this.Open = [this.OpenSep, this.OpenOct,this.OpenNov, this.OpenDec, this.OpenJan, this.OpenFeb];
  this.progress =[this.progessSep, this.progessOct, this.progessNov, this.progessDec, this.progessJan, this.progessFeb];
  this.waiting =[this.waitingSep, this.waitingOct, this.waitingNov, this.waitingDec, this.waitingJan, this.waitingFeb];
  this.fixed =[this.fixedSep, this.fixedOct, this.fixedNov, this.fixedDec, this.fixedJan, this.fixedFeb];
  
  this.hardwareData = [this.hardwareSep, this.hardwareOct,this.hardwareNov, this.hardwareDec, this.hardwareJan, this.hardwareFeb];
  this.softwareData = [this.softwareSep, this.softwareOct,this.softwareNov, this.softwareDec, this.softwareJan, this.softwareFeb];
  this.accessM_Data = [this.amSep, this.amOct,this.amNov, this.amDec, this.amJan, this.amFeb];
 

    

  
this.lineChart = {
labels: [ 'September', 'October', 'November', 'December', 'January', 'February'],
datasets: [
  {
    label: 'Hardware',
    data: this.hardwareData,
    fill: false,
    tension: 0.5
  },
  {
  label: 'am',
  data: this.softwareData,
  fill: false,
  tension: 0.5,
  },
  {
  label: 'Access Management',
  data: this.accessM_Data,
  fill: false,
  tension: 0.5,
  borderDash: [5, 5]
}
  ]
};

this.barChart = {
labels: ['September', 'October', 'November', 'December', 'January', 'February'],
datasets: [
  {
    label: 'Open',
    // data: this.Open ,
    data: [ 48, 20, 25, 42, 17, 18],
    backgroundColor: 'rgb(255, 0, 0)', 
    borderColor: 'rgb(255, 0, 0)'
  },
    
  {
    label: 'In Progress',
    // data: this.progress,
    data: [ 18, 48, 19, 16, 27, 8],
    backgroundColor: 'rgb(0, 0, 255)', 
    borderColor: 'rgb(0, 0, 255)'
    
},
//   {
//   label: 'Fixed',
//   data: this.fixed,
//   backgroundColor: 'rgb(0, 255, 0)', 
//   borderColor: 'rgb(0, 255, 0)',     
// },

]
};
  

this.doughnutChart = {
  labels: ['Low','Medium','High','Critical'],
  datasets: [
    {
    label: ['Priority'],
    data: [this.low.length, this.medium.length, this.high.length, this.critical.length],
    fill: true,

    },
  ]
};

  this.pieChart = {
    labels: ['Hardware', 'Software', 'Access Management'],
    datasets: [
        {
          label: ['Category'],
          data: [this.hardware.length, this.software.length , this.accessManagement.length],
          
        },
        
    ]
  };

  this.options = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
        tooltip: {
            mode: 'index',
            intersect: false
        },
        legend: {
            labels: {
                color: 'red'
            }
        }
    },
    scales: {
        x: {
            stacked: false,
            ticks: {
                color: 'green'
            },
            grid: {
                // color for x lines
                drawBorder: true
            }
        },
        y: {
            stacked: false,
            ticks: {
                color: 'blue'
            },
            grid: {
                // color for y lines
                drawBorder: true
            }
        }
    }
};

  }

    
      




}
