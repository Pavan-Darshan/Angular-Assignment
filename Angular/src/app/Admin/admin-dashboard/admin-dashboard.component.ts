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
OpenMar: number = 0;
OpenOct : number = 0;
OpenNov : number = 0;
OpenDec : number = 0;
Open : number [] = [];


progessJan :number =0;
progessFeb : number =0;
progessMar : number = 0;
progessOct : number = 0;
progessNov : number = 0;
progessDec: number = 0;
progress : number [] = [];

waitingJan :number =0;
waitingFeb : number =0;
waitingMar : number = 0;
waitingOct : number = 0;
waitingNov : number = 0;
waitingDec: number = 0;
waiting : number [] = [];

fixedJan :number =0;
fixedFeb : number =0;
fixedMar : number = 0;
fixedOct : number = 0;
fixedNov : number = 0;
fixedDec: number = 0;
fixed : number [] = [];
   
hardwareJan :number =0;
hardwareFeb : number =0;
hardwareMar : number = 0;
hardwareOct : number = 0;
hardwareNov : number = 0;
hardwareDec: number = 0;


softwareJan :number =0;
softwareFeb : number =0;
softwareMar : number = 0;
softwareOct : number = 0;
softwareNov : number = 0;
softwareDec: number = 0;

amJan :number =0;
amFeb : number =0;
amMar: number = 0;
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
  ((element.createDateTime.slice(3,6)==='Mar') ? (this.OpenMar+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Oct') ? (this.OpenOct+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Nov') ? (this.OpenNov+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Dec') ? (this.OpenDec+=1): null)
  
});

  this.groupedIssues.inProgress.forEach((element: any) => {
    ((element.createDateTime.slice(3,6)==='Jan') ? (this.progessJan+=1): null) ||
    ((element.createDateTime.slice(3,6)==='Feb') ? (this.progessFeb+=1): null) ||
    ((element.createDateTime.slice(3,6)==='Mar') ? (this.progessMar+=1): null) ||
    ((element.createDateTime.slice(3,6)==='Oct') ? (this.progessOct+=1): null) ||
    ((element.createDateTime.slice(3,6)==='Nov') ? (this.progessNov+=1): null) ||
    ((element.createDateTime.slice(3,6)==='Dec') ? (this.progessDec+=1): null)
    
});
this.groupedIssues.waiting.forEach((element: any) => {
  ((element.createDateTime.slice(3,6)==='Jan') ? (this.waitingJan+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Feb') ? (this.waitingFeb+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Mar') ? (this.waitingMar+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Oct') ? (this.waitingOct+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Nov') ? (this.waitingNov+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Dec') ? (this.waitingDec+=1): null)
  
});
this.groupedIssues.fixed.forEach((element: any) => {
  ((element.createDateTime.slice(3,6)==='Jan') ? (this.fixedJan+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Feb') ? (this.fixedFeb+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Mar') ? (this.fixedMar+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Oct') ? (this.fixedOct+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Nov') ? (this.fixedNov+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Dec') ? (this.fixedDec+=1): null)
  
});



this.hardware.forEach((element: any) => {
  ((element.createDateTime.slice(3,6)==='Jan') ? (this.hardwareJan+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Feb') ? (this.hardwareFeb+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Mar') ? (this.hardwareMar+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Oct') ? (this.hardwareOct+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Nov') ? (this.hardwareNov+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Dec') ? (this.hardwareDec+=1): null)
  
});

this.software.forEach((element: any) => {
  ((element.createDateTime.slice(3,6)==='Jan') ? (this.softwareJan+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Feb') ? (this.softwareFeb+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Mar') ? (this.softwareMar+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Oct') ? (this.softwareOct+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Nov') ? (this.softwareNov+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Dec') ? (this.softwareDec+=1): null)
  
});
this.accessManagement.forEach((element: any) => {
  ((element.createDateTime.slice(3,6)==='Jan') ? (this.amJan+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Feb') ? (this.amFeb+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Mar') ? (this.amMar+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Oct') ? (this.amOct+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Nov') ? (this.amNov+=1): null) ||
  ((element.createDateTime.slice(3,6)==='Dec') ? (this.amDec+=1): null)
  
});





  this.Open = [ this.OpenOct,this.OpenNov, this.OpenDec, this.OpenJan, this.OpenFeb, this.OpenMar];
  this.progress =[ this.progessOct, this.progessNov, this.progessDec, this.progessJan, this.progessFeb, this.progessMar];
  this.waiting =[ this.waitingOct, this.waitingNov, this.waitingDec, this.waitingJan, this.waitingFeb, this.waitingMar];
  this.fixed =[ this.fixedOct, this.fixedNov, this.fixedDec, this.fixedJan, this.fixedFeb, this.fixedMar];
  
  this.hardwareData = [ this.hardwareOct,this.hardwareNov, this.hardwareDec, this.hardwareJan, this.hardwareFeb, this.hardwareMar];
  this.softwareData = [ this.softwareOct,this.softwareNov, this.softwareDec, this.softwareJan, this.softwareFeb, this.softwareMar];
  this.accessM_Data = [ this.amOct,this.amNov, this.amDec, this.amJan, this.amFeb, this.amMar];
 

    

  
this.lineChart = {
labels: ['October', 'November', 'December', 'January', 'February', 'March'],
datasets: [
  {
    label: 'Hardware',
    data: this.hardwareData,
    fill: false,
    tension: 0.5
  },
  {
  label: 'Software',
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
labels: [ 'October', 'November', 'December', 'January', 'February','March'],
datasets: [
  {
    label: 'Open',
    data: this.Open ,
    backgroundColor: 'rgb(255, 0, 0)', 
    borderColor: 'rgb(255, 0, 0)'
  },
    
  {
    label: 'In Progress',
    data: this.progress,
    backgroundColor: 'rgb(0, 0, 255)', 
    borderColor: 'rgb(0, 0, 255)'
    
},
  {
  label: 'Fixed',
  data: this.fixed,
  backgroundColor: 'rgb(0, 255, 0)', 
  borderColor: 'rgb(0, 255, 0)',     
},

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
