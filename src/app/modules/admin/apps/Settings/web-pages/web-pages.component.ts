import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-web-pages',
  templateUrl: './web-pages.component.html',
  styleUrls: ['./web-pages.component.scss']
})
export class WebPagesComponent implements OnInit {
  public data=[];
    constructor(private router: Router) { }

    ngOnInit(): void {
      this.data=[{'No':1,'webpages':'Terms and conditions'},
      {'No':2,'webpages':'Privacy policy'},
      {'No':3,'webpages':'Refund policy'},
      {'No':4,'webpages':'Cancellation policy'},
      {'No':5,'webpages':'Shipping policy'},
      {'No':6,'webpages':'Return policy'}
    ];

    console.log(this.data);
    }
  showWebPages(link): void{
    console.log('apps/Settings/add-policy?name='+link);
    this.router.navigate(['apps/Settings/add-policy'],{ queryParams: {name: link}});
  }
  }
