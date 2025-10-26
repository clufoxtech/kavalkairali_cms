import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api/confirmationservice';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  public data=[];
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.data=[{'No':1,'Location':'Country','Link':'country'},
    {'No':2,'Location':'State','Link':'state'},
    {'No':3,'Location':'City','Link':'city'},
    {'No':4,'Location':'Pincode','Link':'pincode'},
    {'No':5,'Location':'Area','Link':'area'},
   
  ]
  }
ShowLocation(link){
  this.router.navigate([`apps/product/Master/`+link]); 
}
}
