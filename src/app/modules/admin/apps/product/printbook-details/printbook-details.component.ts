import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { MessageService } from 'primeng/api';
import { environment } from 'environments/environment';

@Component({
  providers: [MessageService],
  selector: 'app-printbook-details',
  templateUrl: './printbook-details.component.html',
  styleUrls: ['./printbook-details.component.scss']
})
export class PrintbookDetailsComponent implements OnInit {


  public display: boolean = false;
  discountPopUp: boolean;
  discountForm: any;
  magazineId: any;
  magazine: any;
  url: any;
  edition: any;
  categories: any;
  summary: any;
  noOfPages: any;
  constructor(private messageService: MessageService, public formBuilder: FormBuilder, private router: Router, public productservice: ProductService, private Aroute: ActivatedRoute) { }
  
  ngOnInit() {
   
    this.Aroute.params.subscribe((params) => {
      this.magazineId = params['id'];
      this.url=environment.baseUrl+'/uploads/image/'+params['coverId'];
      this.magazine=params['name'];
      this.edition=params['edition'];
      this.categories=params['categoryName'];
      this.summary=params['description'];
    this.noOfPages=params['noOfPages'];
    });

  }
 

}
