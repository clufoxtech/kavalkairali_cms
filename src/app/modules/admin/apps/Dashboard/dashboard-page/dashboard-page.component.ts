import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  public data:any[];
  public dailyList:Array<any>;
  public weeklyList:Array<any>;
  public monthlyList:Array<any>;
  public weeklyEbook: any[] = [];
  public weeklyPrint: any[] = [];
  public weeklyAudio: any[] = [];
  public monthlyEbook: any[] = [];
  public monthlyPrint: any[] = [];
  public monthlyAudio: any[] = [];
  public months:any[]=[];
  data1: any;
  data2: any;
  data3: any;
  data4:any;
  options: any;
  options1: any;
  public documentStyle: CSSStyleDeclaration;
  constructor(private dashboardservice:DashboardService) { }
 
  ngOnInit(): void {
    this.GetDailyOrders();
    this.GetWeeklyOrders();
    this.GetMonthlyOrders();
   
    this.documentStyle = getComputedStyle(document.documentElement);
    const textColor = this.documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = this.documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = this.documentStyle.getPropertyValue('--surface-border');
    
   

    this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }

        }
    };
  
    this.options1 = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
  }
  GetDailyOrders(){
    this.dashboardservice.getDailyOrders().subscribe({
        next: (response)=>{
          this.dailyList=response;
    },
    error: (err) => {
    //  this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    }
  })
  }
  GetWeeklyOrders(){
    
    this.dashboardservice.getWeeklyOrders().subscribe({
        next: (response)=>{
          this.weeklyList=response;
         // Populate weekly ebook orders
      response?.ebook.forEach(entry => {
        this.weeklyEbook.push(entry.orders);
      });

      // Populate weekly print orders
      response?.print?.forEach(entry => {
        this.weeklyPrint.push(entry.orders);
      });

      // Populate weekly audio orders
      response?.audio?.forEach(entry => {
        this.weeklyAudio.push(entry.orders);
      });
      this.data1 = {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        datasets: [
            {
                label: 'ebook - Last 7 days orders',
                backgroundColor: this.documentStyle.getPropertyValue('--gray-500'),
                borderColor: this.documentStyle.getPropertyValue('--gray-500'),
                data: this.weeklyEbook
            }
        ]
    };
    this.data2 = {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        datasets: [
            {
                label: 'Print - Last 7 days orders',
                backgroundColor: this.documentStyle.getPropertyValue('--gray-500'),
                borderColor: this.documentStyle.getPropertyValue('--gray-500'),
                data: this.weeklyPrint
            }
        ]
    };
    this.data3 = {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        datasets: [
            {
                label: 'Audio - Last 7 days orders',
                backgroundColor: this.documentStyle.getPropertyValue('--gray-500'),
                borderColor: this.documentStyle.getPropertyValue('--gray-500'),
                data: this.weeklyAudio
            }
        ]
    };
      console.log(this.weeklyEbook);
    },
    error: (err) => {
    //  this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    }
  })
  }
  GetMonthlyOrders(){
    this.dashboardservice.getMonthlyOrders().subscribe({
        next: (response)=>{
          this.monthlyList=response;
            
      response?.ebook.forEach(entry => {
        this.monthlyEbook.push(entry.orders);
      });

     
      response?.print?.forEach(entry => {
        this.monthlyPrint.push(entry.orders);
      });

     
      response?.audio?.forEach(entry => {
        this.monthlyAudio.push(entry.orders);
      });
      response?.ebook?.forEach(entry => {
        const monthTitleCase = this.toTitleCase(entry.month);
        this.months.push(monthTitleCase);
    });
    console.log(this.months)
    console.log(this.monthlyEbook)
          this.data4 = {
            labels: this.months,
            datasets: [
                {
                    type: 'bar',
                    label: 'ebook',
                    backgroundColor: this.documentStyle.getPropertyValue('--blue-500'),
                    data: this.monthlyEbook,
                },
                {
                    type: 'bar',
                    label: 'print',
                    backgroundColor: this.documentStyle.getPropertyValue('--green-500'),
                    data: this.monthlyPrint,
                    
                },
                {
                    type: 'bar',
                    label: 'audio',
                    backgroundColor: this.documentStyle.getPropertyValue('--orange-500'),
                    data: this.monthlyAudio,
                  
                }
            ]
        };
    },
    error: (err) => {
    //  this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    }
  })
  }
  toTitleCase(str: string): string {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}
}
