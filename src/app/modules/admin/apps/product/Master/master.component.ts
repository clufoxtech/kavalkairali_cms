import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {
public data=[];
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.data=[{'No':1,'Master':'Contributors','Link':'contributor'},
    {'No':2,'Master':'Publishers','Link':'publisher'},
    {'No':3,'Master':'Product Category','Link':'product-category'},
    {'No':4,'Master':'Imprint','Link':'imprint'},
    {'No':5,'Master':'Book Condition','Link':'book-condition'},
    {'No':6,'Master':'Location','Link':'location'},
    {'No':7,'Master':'Language','Link':'language'},
    {'No':8,'Master':'Binding Type','Link':'bindingType'},
    {'No':9,'Master':'Home Screen Banner','Link':'banner'},
    {'No':10,'Master':'Warehouse','Link':'warehouse'},
    {'No':11,'Master':'Zone','Link':'zone'},
    {'No':12,'Master':'Region','Link':'region'},
    {'No':13,'Master':'Courier Type','Link':'courier'},
    {'No':14,'Master':'Delivery Partner','Link':'deliveryPartner'},
    {'No':15,'Master':'Packing Size','Link':'packingSize'},
    {'No':16,'Master':'Packing Type','Link':'packingType'},
    {'No':17,'Master':'Weight','Link':'weight'},
    {'No':18,'Master':'Product id','Link':'product-id'},
    {'No':19,'Master':'Shelf','Link':'shelf'},
    {'No':20,'Master':'Book Position','Link':'book-position'},
  ];
  }
ShowMaster(link){
  this.router.navigate(['apps/product/Master/'+link]);
}
}
