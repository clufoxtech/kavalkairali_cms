import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { AddressDetails, CustomerDetails, LoyaltyDetails } from '../CustomerModels/Customerdetails';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  constructor(private Aroute: ActivatedRoute,private router: Router,public customerservice: CustomerService) { }
public customerdetails: CustomerDetails;
public customerid: number;
public data=[];
  ngOnInit(): void {
    this.customerdetails= new CustomerDetails();
    this.customerdetails.loyaltyCard= new LoyaltyDetails();
    this.customerdetails.addresses= new Array<AddressDetails>();
    this.Aroute.params.subscribe((params) => {
      this.customerid=(params['id'])?params['id']:params['customerId'];
      localStorage.setItem('customerid',JSON.stringify(this.customerid));
    });
    const id=localStorage.getItem('customerid');
    const Id=JSON.parse(id);
   this.GetCustomerDetails(Id);
  }
  GetCustomerDetails(id: number){
    this.customerservice.getCustomerDetails(id).subscribe((response)=>{
      this.customerdetails= new CustomerDetails();
      this.customerdetails=response;
      console.log(this.customerdetails);
       });
  }
  Customerlist(){
    this.router.navigate(['apps/Customers/customerslist']);
  }
  orderDetails(){
    this.router.navigate(['apps/Customers/orderdetails', this.customerdetails]);
  }
  BookAccess(){
    this.router.navigate(['apps/Customers/bookaccess',this.customerdetails]);
  }



}
