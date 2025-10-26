import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomerDetails } from '../CustomerModels/Customerdetails';

@Component({
  selector: 'app-editcustomer',
  templateUrl: './editcustomer.component.html',
  styleUrls: ['./editcustomer.component.scss']
})
export class EditcustomerComponent implements OnInit {
  @Output() edit =new EventEmitter<boolean>();
  @Input() customerdetails: CustomerDetails;
  public close:boolean=true;
  public products:CustomerDetails;
  constructor() { }

  ngOnInit(): void {
    this.products=new CustomerDetails();
    this.products=this.customerdetails;
    console.log(this.products);
  }
  Cancel(){
    this.edit.emit(false);
  }
  
}
