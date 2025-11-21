import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { HomeScreenService } from '../homscreen.service';
import { ProductService } from '../../product/product.service';
import { Category } from '../../product/productModel/Category';
import { Magazine } from '../../product/productModel/magazine';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.scss']
})
export class HomescreenComponent implements OnInit {
  isLoading: boolean = false;
  display: boolean = false;
  edit: boolean = false;
  user: boolean = false;
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op',{static:true}) op: OverlayPanel;
  @ViewChild('op',{static:true}) ele: ElementRef;
  noSpecial: RegExp = /[A-Za-zÀ-ȕ ]/;
  add: boolean;
  magazines: Magazine[];
  category: Category[];
  editMagazine: any;
  editCategory: any;
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,
    private homeScreenService: HomeScreenService, private addservice: ProductService,
    private router: Router,private confirmationService: ConfirmationService) { }
  public data =[];
  public product:any;
  AddForm!: FormGroup;
  editForm!: FormGroup;
  ngOnInit(): void {
    this.user=false;
    this.AddForm = this.formBuilder.group({
      magazine: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
    this.editForm = this.formBuilder.group({
      magazine: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
    this.GetAllHomeScreen();
   this.GetMagazine();
   this.GetCategory();
  }
  GetAllHomeScreen(){
    this.homeScreenService.getAllHomeScreen().subscribe((response)=>{
      console.log(response);
      this.data=response._embedded.homeRails;
       })  
  }
  NewHomeScreen(){

this.add=true;
  }
  clear(table: Table) {
    table.clear();
}
Cancel(){
  this.display=false;
  this.GetAllHomeScreen();
}
show(event,product){
  this.product=product;
  this.op.show(event);
}
Edit(product){
this.product=product;
console.log(product);
this.magazines.filter((magazine)=>{
  if(magazine.name==product.railMagazine.name){
    this.editMagazine=magazine._links.self.href;
  }
});
this.category.filter((category)=>{
  if(category.name==product.railMagazineCategory.name){
    this.editCategory=category._links.self.href;
  }
});
this.edit=true;
this.op.hide();
}
EditHomeScreen(){
  if (this.editForm.valid) {
    const magazine=this.editForm.controls['magazine'].value;
   const category=this.editForm.controls['category'].value;
    console.log(magazine);
    console.log(category);
  this.homeScreenService.editHomeScreen(this.product.id,magazine,category).subscribe(
    {
      next: (response)=>{
        this.messageService.add({severity:'success', summary:'Success', detail:'Home Screen Edited Successfully'});
        this.edit=false;
        this.GetAllHomeScreen();  
  },
  error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
   //this.Cancel();
  }
 });
    }
     else {
      this.validateAllFields(this.editForm); 
  } 
}
EditCancel(edit:any){
this.edit=edit;
this.GetAllHomeScreen();
}
Delete(){
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
      this.homeScreenService.deleteHomeScreen(this.product.id).subscribe(
        {
          next: (response)=>{
            this.GetAllHomeScreen();  
      },
      error: (err) => {
        this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
       //this.Cancel();
      }
     })
       
    },
    reject: () => {
      //Actual logic to perform a confirmation
  }
});
}
AddHomeScreen(){
  if (this.AddForm.valid) {
    const magazine=this.AddForm.controls['magazine'].value;
   const category=this.AddForm.controls['category'].value;
    console.log(magazine);
    console.log(category);
  this.homeScreenService.addHomeScreen(magazine,category).subscribe(
    {
      next: (response)=>{
        this.messageService.add({severity:'success', summary:'Success', detail:'Home Screen Added Successfully'});
        this.display=false;
        this.GetAllHomeScreen();  
  },
  error: (err) => {
    this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
   //this.Cancel();
  }
 });
    }
     else {
      this.validateAllFields(this.AddForm); 
  } 
}
get getControl(){
  return this.AddForm.controls;
}
validateAllFields(formGroup: FormGroup) {         
  Object.keys(formGroup.controls).forEach(field => {  
      const control = formGroup.get(field);            
      if (control instanceof FormControl) {             
          control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        
          this.validateAllFields(control);  
      }
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

      GetCategory(){
        this.category= new Array<Category>();
        this.addservice.getCategory().subscribe((response)=>{
            this.category=response._embedded.magazineCategories;
            console.log(this.category);
           });
      }
}