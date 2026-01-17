import { BindingType } from '@angular/compiler';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Language } from 'highlight.js';
import { MessageService } from 'primeng/api';
import { ProductService } from '../product.service';
import { Category } from '../productModel/Category';
import { Magazine } from '../productModel/magazine';

@Component({
  providers: [MessageService],
  selector: 'app-add-print-book',
  templateUrl: './add-print-book.component.html',
  styleUrls: ['./add-print-book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, // Set the change detection strategy to OnPush
})
export class AddPrintBookComponent implements OnInit {
AddForm!: FormGroup;

public category:Array<Category>;
  magazines: Magazine[];
  addDetails: any;
  magazinesList: Magazine[];
  selectedFiles: any;
  url: string | ArrayBuffer;
  imagePath: any;
  coverID: any;
  selectedFilesUpload: any;
  fileUploadPath: any;
  urlUpload: string | ArrayBuffer;
  fileId: any;
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,private router: Router,public addservice:ProductService) {
    
   }
  
  ngOnInit(){
    this.AddForm = this.formBuilder.group({
      magazine: ['', [Validators.required]],
      edition: ['', []],
      noofpages: ['', []],
      category: ['', []],
      description: ['', []],
      fileUpload: ['', []],
      cover: ['', []],
    }) 
    this.GetMagazine();
    this.GetCategory();
  
   }

 
   GoBack(){
    this.AddForm.reset();
    this.router.navigate([`apps/product/productlist`]);  
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

AddMagazineEditions(){
  console.log(this.AddForm);
   if (this.AddForm.valid) {
    this.addCoverImage();
      }
       else {
        this.validateAllFields(this.AddForm); 
    } 
   

}
  private AddMagazine() {
    console.log(this.AddForm);
    this.addDetails = new Magazine();
    const magazine = this.AddForm.controls['magazine'].value;
    const edition = this.AddForm.controls['edition'].value;
    const noofpages = this.AddForm.controls['noofpages'].value;
    const category = this.AddForm.controls['category'].value;
    const description = this.AddForm.controls['description'].value;
    this.addservice.addMagazineList(magazine, category, edition, noofpages, description,this.coverID, this.fileId).subscribe({
      next: (response) => {
        this.router.navigate(['apps/product/productlist']);
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: err.error.status, detail: err.error.error });
        this.router.navigate(['apps/product/productlist']);
      }
    });
  }

 
addCoverImage(){
  console.log(this.selectedFiles);
if(this.selectedFiles?.length>0 ){
    this.addservice.addImage( this.selectedFiles[0]).subscribe({
      next: (response)=>{
        this.coverID=response.publicId;
       this.addFileUpload();
     },
     error: (err) => {
      this.coverID=null;
      this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
     }
  })
  }
}
addFileUpload(){
if(this.selectedFilesUpload?.length>0 ){
    this.addservice.addFile( this.selectedFilesUpload[0]).subscribe({
      next: (response)=>{
        this.fileId=response.publicId;
        this.AddMagazine(); 
     },
     error: (err) => {
      this.coverID=null;
      this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
     }
  })
  }
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
onFileUploadChanged(event) {
 this.selectedFilesUpload = event.target.files;
  if (this.selectedFilesUpload.length === 0)
      return;

  const mimeType = this.selectedFilesUpload[0].type;
  if (mimeType.match(/pdf\/*/) == null) {
      //this.message = "Only images are supported.";
      return;
  }

  const reader = new FileReader();
  this.fileUploadPath = this.selectedFilesUpload;
  reader.readAsDataURL(this.selectedFilesUpload[0]); 
  reader.onload = (_event) => { 
      this.urlUpload = reader.result; 
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
     
}
