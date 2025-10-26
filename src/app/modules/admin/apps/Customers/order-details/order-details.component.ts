import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetails } from '../CustomerModels/Customerdetails';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  customerid: any;
  orders: OrderDetails[];
  totalRecords: any;

  constructor(private aroute: ActivatedRoute,private router: Router,public customerservice: CustomerService) { }

  ngOnInit(): void {
    this.aroute.params.subscribe((params) => {
      this.customerid=(params['id'])?params['id']:params['customerId'];
      localStorage.setItem('customerid',JSON.stringify(this.customerid));
    });
    const id=localStorage.getItem('customerid');
    const Id=JSON.parse(id);
   this.GetOrderDetails(Id);
  }
    GetOrderDetails(id: number){
      this.customerservice.getOrderDetails(id).subscribe((response)=>{
        this.orders= new Array<OrderDetails>();
        this.orders=response?.content;

        console.log(this.orders);
        this.totalRecords=response.page.totalElements;
         });
    }
  activecustomer(activecustomer: any) {
    throw new Error('Method not implemented.');
  }
  ShowOrder(product){
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['apps/Orders/orderdetails', product])
    );
    console.log(url);
    const currentPath = window.location.href.substr(0, window.location.href.indexOf('#') + 1);
    const fullPath = currentPath + url;
    console.log(fullPath);
    try {
      window.open(fullPath,'_blank');
    } catch (error) {
      console.error('Error opening new window:', error);
    }
    // this.router.navigate([`apps/Orders/orderdetails`,product]);
  }
}
