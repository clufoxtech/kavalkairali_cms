import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductService } from '../product.service';
import { Category } from '../productModel/Category';
import { BookDetails } from '../productModel/bookdetails';
import { Magazine } from '../productModel/magazine';
import { valid } from 'chroma-js';
import { environment } from 'environments/environment';

@Component({
  providers: [MessageService],
  selector: 'app-edit-print',
  templateUrl: './edit-print.component.html',
  styleUrls: ['./edit-print.component.scss']
})
export class EditPrintComponent implements OnInit {
  selectable = true;
  removable = true;
 
AddForm!: FormGroup;
  editDetails: any;
  magazineId: any;
  magazineList: any[];
  selectedFiles: any;
  imagePath: any;
  url: string | ArrayBuffer;
  filtercategory: any[];
  category: any;
  magazines: Magazine[];
  coverId: any;
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,
    private router: Router,public addservice:ProductService,private Aroute: ActivatedRoute) { }
  
  ngOnInit(){
    this.Aroute.params.subscribe(params => {
      this.magazineId=params['id'];
    });
    this.GetBookDetails();
    this.GetCategory();
    this.GetMagazine();
  this.AddForm = this.formBuilder.group({
    cover: ['', []],
    magazine: ['', []],
    edition: ['', []],
    noofpages: ['', []],
    category: ['', []],
    description: ['', []],
  }) 
  }
   GetBookDetails() {
    this.addservice.getMagazineList().subscribe((response) => {
  
      this.magazineList = new Array<any>();
      this.magazineList = response._embedded.magazineEditions
//const tempdetails =this.magazineList.find(magazine => magazine.id == this.magazineId);

      this.editDetails = this.magazineList.find(magazine => magazine.id == this.magazineId);
      console.log(this.editDetails);
      this.addservice.getMagazines().subscribe((response)=>{
          if(response._embedded.magazines.length>0){
            this.magazines= new Array<Magazine>();
            this.magazines=response._embedded.magazines;
            console.log(this.magazines);
        const tempdetails =this.magazines.find(magazine => magazine.name == this.editDetails.name);
        console.log(tempdetails);
        this.url=environment.baseUrl+'/uploads/image/'+this.editDetails.coverId;
        this.AddForm.patchValue({
          magazine: tempdetails._links.self.href,
          edition: this.editDetails.edition,
          noofpages: this.editDetails.noOfPages,
          category: this.editDetails.categoryName,
          description: this.editDetails.description, 
          cover:environment.baseUrl+'/uploads/image/'+this.editDetails.coverId
        });
         } 
           }) 
     
  });
   
  }


   GoBack(){
    this.router.navigate([`apps/product/productlist`]);  
  }
  onFileChanged(event) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles.length === 0)
        return;
  
    const mimeType = this.selectedFiles[0].type;
    if (mimeType.match(/image\/*/) == null) {
        //this.message = "Only images are supported.";
        return;
    }
  
    const reader = new FileReader();
    this.imagePath = this.selectedFiles;
    reader.readAsDataURL(this.selectedFiles[0]); 
    reader.onload = (_event) => { 
        this.url = reader.result; 
    }
  }


  add(event){
    this.filtercategory=[];
    if(event.value.length>0){
      this.filtercategory=this.category.filter(obj => event.value.includes(obj.id));
    }
  }
      GetCategory(){
        this.category= new Array<Category>();
        this.addservice.getCategory().subscribe((response)=>{
            this.category=response._embedded.magazineCategories;
            console.log(this.category);
           });
      }
      GetMagazine(){
        this.addservice.getMagazines().subscribe((response)=>{
          if(response._embedded.magazines.length>0){
            this.magazines= new Array<Magazine>();
            this.magazines=response._embedded.magazines;
            console.log(this.magazines);
          } 
           }) 
      }
      editMagazine(){
        this.addCoverImage();
      }
Editprintbook(){
  // if (this.AddForm.valid) 
    this.editDetails= [];
    this.editDetails=this.AddForm.value;
   console.log(this.editDetails)
   this.editDetails.id=this.magazineId;
   this.editDetails.coverId=this.coverId;
  this.addservice.editMagazineList(this.editDetails).subscribe({
   next: (response)=>{
  this.router.navigate(['apps/product/productlist']);
    },
    error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
  this.router.navigate(['apps/product/productlist']);
    }
  });
}

addCoverImage(){
if(this.selectedFiles?.length>0 ){
    this.addservice.addImage( this.selectedFiles[0]).subscribe({
      next: (response)=>{
        this.coverId=response.publicId;
        this.Editprintbook(); 
     },
     error: (err) => {
      this.coverId=null;
      this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
     }
  })
  }
  else{
    this.coverId=this.editDetails.coverId;
    this.Editprintbook();
  }
}
get getControl(){
  return this.AddForm.controls;
}

}
