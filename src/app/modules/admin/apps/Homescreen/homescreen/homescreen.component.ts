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
  selectedMagazine: string;
  magazineDisplay: any[] ;
  magazineList: Magazine[];
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
    });
    this.editForm = this.formBuilder.group({
      magazine: ['', [Validators.required]],
    });
    this.GetAllHomeScreen();
   this.GetMagazine();
   this.GetCategory();
   this.GetMagazines();
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
  this.add=false;
  this.GetAllHomeScreen();
}
CancelEdit(){
  this.edit=false;
  this.GetAllHomeScreen();
}
show(event,product){
  this.product=product;
  this.op.show(event);
}
Edit(product){
this.product=product;
console.log(product);
const editMagazinelist = this.magazineDisplay.filter(
  m=>m.magazineName===product.railMagazine.name 
  && m.category===product.railMagazineCategory.name)[0];
this.editMagazine=editMagazinelist.value;
console.log(this.editMagazine);
this.edit=true;
this.op.hide();
}
EditHomeScreen(){
  if (this.editForm.valid) {
    const magazine=this.editForm.controls['magazine'].value;
    console.log(magazine);
    const magazineName = this.magazineDisplay.filter(m=>m.value === magazine)[0].magazineName;
    const magazineLink = this.magazineList.filter(m=>m.name === magazineName)[0]._links.self.href;
    const category=this.magazineDisplay.filter(m=>m.value === magazine)[0].category;
    const categoryLink=this.category.filter(c=>c.name === category)[0]._links.self.href;
    console.log(category);
  this.homeScreenService.editHomeScreen(this.product.id,magazineLink,categoryLink).subscribe(
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
  console.log(this.AddForm);
  console.log(this.category);
  if (this.AddForm.valid) {
    const magazine=this.AddForm.controls['magazine'].value;
    console.log(magazine);
    const magazineName = this.magazineDisplay.filter(m=>m.value === magazine)[0].magazineName;
    const magazineLink = this.magazineList.filter(m=>m.name === magazineName)[0]._links.self.href;
    const category=this.magazineDisplay.filter(m=>m.value === magazine)[0].category;
    const categoryLink=this.category.filter(c=>c.name === category)[0]._links.self.href;
    console.log(category);
  this.homeScreenService.addHomeScreen(magazineLink,categoryLink).subscribe(
    {
      next: (response)=>{
        this.messageService.add({severity:'success', summary:'Success', detail:'Home Screen Added Successfully'});
        this.add=false;
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
      this.magazineDisplay= new Array<any>();
        this.addservice.getMagazineList().subscribe((response)=>{
          if(response._embedded.magazineEditions.length>0){
            this.magazines= new Array<Magazine>();
            this.magazines=response._embedded.magazineEditions.filter((magazine)=>{
              if(magazine.status=="ACTIVE"){
                const exists = this.magazineDisplay.some(c => c.label === magazine.name+"-"+magazine.categoryName);
                if(!exists){
                this.magazineDisplay.push({
                  label: magazine.name+"-"+magazine.categoryName,
                  category: magazine.categoryName,
                  magazineName: magazine.name,
                  value: magazine._links.self.href
                });
                console.log(this.magazineDisplay);
              }
                return magazine;
              }
            });
            console.log(this.magazines);
          } 
           }) 
      }

  GetCategory(){
  
  this.addservice.getCategory().subscribe((response)=>{
    console.log(response);
    if(response._embedded.magazineCategories.length>0){
      console.log(response);
      this.category=response._embedded.magazineCategories;
      };
     })
   console.log(this.category);
  }
  GetMagazines(){
    this.addservice.getMagazines().subscribe((response)=>{
      if(response._embedded.magazines.length>0){
        this.magazineList= new Array<Magazine>();
        this.magazineList=response._embedded.magazines;
        console.log(this.magazineList);
      } 
       })
      }

}