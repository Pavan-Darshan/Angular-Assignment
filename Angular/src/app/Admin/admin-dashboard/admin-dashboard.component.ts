import { Component } from '@angular/core';
import { ServerService } from '../../Services/service/server.service';
import { map } from 'rxjs';
import { Ticket } from '../../Model/Ticket';
import { MessageService } from 'primeng/api';





@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
  standalone : false
})
export class AdminDashboardComponent  {
 
  lineChart1 : any;
  lineChart2 : any;
  barChart1 : any;
  barChart2 : any;
  doughnutChart : any;
  pieChart : any;
  options : any;
  options1 : any;
  List :Ticket []=[];
  List1 :Ticket []=[];
  loadingScreen : boolean = true;


  // Year option
  years: string[] = ['2023', '2024', '2025','2026', '2027']; 
  selectedYear: string = '2025';  
  monthState: any[] = [{ label: 'Jan-Jun', value: true },{ label: 'Jul-Dec', value: false }];


  // chart selection 
  value: boolean = true;


  groupedIssues: any = {
    open: [],
    inProgress: [],
    waiting: [],
    fixed: [],
    closed: [],
  }
  
  hardware : any[] =[];
  software : any[] =[];
  accessManagement : any[] =[];
  
  high : any []= [];
  critical : any []= [];
  medium : any []= [];
  low : any []= [];
  
  months :any[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  statusCounts = {
    open: new Array(12).fill(0),
    inProgress: new Array(12).fill(0),
    waiting: new Array(12).fill(0),
    fixed: new Array(12).fill(0),
    closed: new Array(12).fill(0)
  };
  
   categoryCounts = {
    hardware: new Array(12).fill(0),
    software: new Array(12).fill(0),
    accessManagement: new Array(12).fill(0)
  };
  

constructor(private service : ServerService, private messageService: MessageService){}

ngOnInit(){
  this.onYearChange();
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
      this.List1=res;
      setTimeout(()=>{this.filterDataByYear();},1000)
     
  })

}


// adding month count to array---------------------->
 updateMonthCount(state: number[], date: string) {
  const monthIndex = this.months.indexOf(date.slice(3, 6));
  if (monthIndex !== -1) {
    state[monthIndex] += 1;
  }
}


// filter all issue with selected year--------------------->
filterDataByYear() {
  
  this.List = this.List1.filter(issue => {
    
    const issueYear = issue.createDateTime.slice(7,11);
    return (issueYear === this.selectedYear);
  });


  (this.List.length === 0) ? this.listIsEmpty() : this.groupIssuesByStatus(); // type of status
 
}


// splitting the issues status to array-------------->
groupIssuesByStatus() {
     
  this.groupedIssues.open = this.List.filter(issue  => issue.statusId === 'Open');
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
    


  // status count
  this.groupedIssues.open.forEach((element: any) => this.updateMonthCount(this.statusCounts.open, element.createDateTime));
  this.groupedIssues.inProgress.forEach((element: any) => this.updateMonthCount(this.statusCounts.inProgress, element.createDateTime));
  this.groupedIssues.waiting.forEach((element: any) => this.updateMonthCount(this.statusCounts.waiting, element.createDateTime));
  this.groupedIssues.fixed.forEach((element: any) => this.updateMonthCount(this.statusCounts.fixed, element.createDateTime));
  this.groupedIssues.closed.forEach((element: any) => this.updateMonthCount(this.statusCounts.closed, element.createDateTime));

  // category counts
  this.hardware.forEach((element: any) => this.updateMonthCount(this.categoryCounts.hardware, element.createDateTime));
  this.software.forEach((element: any) => this.updateMonthCount(this.categoryCounts.software, element.createDateTime));
  this.accessManagement.forEach((element: any) => this.updateMonthCount(this.categoryCounts.accessManagement, element.createDateTime));

 setTimeout(()=>{ 
  this.updataedCharts();
  this.loadingScreen = false;
 },1000)
}

updataedCharts(){
  
this.lineChart1= {
labels: ['January', 'February','March', 'April','May', 'June'],
datasets: [
  {
    label: 'Hardware',
    data: this.categoryCounts.hardware.slice(0,6),
    fill: false,
    tension: 0.5
  },
  {
  label: 'Software',
  data: this.categoryCounts.software.slice(0,6),
  fill: false,
  tension: 0.5,
  },
  {
  label: 'Access Management',
  data: this.categoryCounts.accessManagement.slice(0,6),
  fill: false,
  tension: 0.5,
  borderDash: [5, 5]
}
  ]
};


this.lineChart2 = {
  labels: ['July','August','September', 'October', 'November', 'December'],
  datasets: [
    {
      label: 'Hardware',
      data: this.categoryCounts.hardware.slice(6),
      fill: false,
      tension: 0.5
    },
    {
    label: 'Software',
    data: this.categoryCounts.software.slice(6),
    fill: false,
    tension: 0.5,
    },
    {
    label: 'Access Management',
    data: this.categoryCounts.accessManagement.slice(6),
    fill: false,
    tension: 0.5,
    borderDash: [5, 5]
  }
    ]
  };
  
this.barChart1 = {
labels: [ 'January', 'February','March', 'April','May', 'June'],
datasets: [
  {
    label: 'Open',
    data: this.statusCounts.open.slice(0,6),
    backgroundColor: 'rgb(219, 72, 72)', 
    borderColor: 'rgb(255, 0, 0)'
  },
    
  {
    label: 'In Progress',
    data: this.statusCounts.inProgress.slice(0,6),
    backgroundColor: 'rgb(68, 68, 207)', 
    borderColor: 'rgb(0, 0, 255)'
    
},
  {
  label: 'Fixed',
  data: this.statusCounts.fixed.slice(0,6),
  backgroundColor: 'rgb(88, 228, 88)', 
  borderColor: 'rgb(0, 255, 0)',     
},

]
};
this.barChart2 = {
  labels: ['July','August','September', 'October', 'November', 'December'],
  datasets: [
    {
      label: 'Open',
      data: this.statusCounts.open.slice(6),
      backgroundColor: 'rgb(219, 72, 72)', 
      borderColor: 'rgb(255, 0, 0)'
    },
      
    {
      label: 'In Progress',
      data: this.statusCounts.inProgress.slice(6),
      backgroundColor: 'rgb(68, 68, 207)', 
      borderColor: 'rgb(0, 0, 255)'
      
  },
    {
    label: 'Fixed',
    data: this.statusCounts.fixed.slice(6),
    backgroundColor: 'rgb(88, 228, 88)', 
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
                color: 'Blue'
            },
            grid: {
                // color for x lines
                drawBorder: true,
                 color: 'rgba(50, 227, 18, 0.4)'
            }
        },
        y: {
            stacked: false,
            ticks: {
                color: 'blue'
            },
            grid: {
                // color for y lines
                drawBorder: true,
                color: 'rgba(50, 227, 18, 0.4)'
            }
        }
    }
};


this.options1 = {
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
              color: 'Blue'
          },
          grid: {
              // color for x lines
              drawBorder: true,
              color: 'rgba(50, 227, 18, 0.4)' 
          }
      },
      y: {
          stacked: false,
          ticks: {
              color: 'Blue'
          },
          grid: {
              // color for y lines
              drawBorder: true,
              color: 'rgba(50, 227, 18, 0.4)' 
          }
      }
  }
};


}


//  feach data from the selected year
  onYearChange() {
    this.loadingScreen = true;
   
    // Reset all array as empty array------------>

    this.List = [];
    this.List1 = [];
    this.groupedIssues.open =[];
    this.groupedIssues.inProgress =[];
    this.groupedIssues.waiting =[];
    this.groupedIssues.fixed =[]; 
    this.groupedIssues.closed =[];
  
    this.hardware=[];
    this.software=[];
    this.accessManagement=[];
  
    this.high =[];
    this.low = [];
    this.critical = [];
    this.medium = [];
  
    this.statusCounts.open = new Array(12).fill(0);
    this.statusCounts.closed = new Array(12).fill(0);
    this.statusCounts.fixed = new Array(12).fill(0);
    this.statusCounts.inProgress = new Array(12).fill(0);
    this.statusCounts.waiting = new Array(12).fill(0);
  
  
    this.categoryCounts.accessManagement = new Array(12).fill(0);
    this.categoryCounts.hardware = new Array(12).fill(0);
    this.categoryCounts.software = new Array(12).fill(0);

    this.featchIssueData(); 
    this.updataedCharts();
  }

// Toast Message
  listIsEmpty(){

    this.messageService.add({ severity: 'warn', summary: 'Warning', 
    detail: "No Data Found......!", life: 3000 , key: 'tc' })
    this.loadingScreen = false;
  }
}
