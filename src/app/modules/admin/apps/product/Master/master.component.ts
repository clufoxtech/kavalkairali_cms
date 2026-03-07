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
    this.data=[{'No':1,'Master':'Magazine names','Link':'magazines'},
    {'No':2,'Master':'Magazine category','Link':'product-category'},
    {'No':3,'Master':'Home screen banner','Link':'banners'},
    {'No':4,'Master':'Blocked reasons','Link':'blocked-reasons'},
  ];
  }
ShowMaster(link){
  this.router.navigate(['apps/product/Master/'+link]);
}
}
