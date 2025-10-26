import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { GalleryList } from '../galleryModel';
import { Router } from '@angular/router';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  isLoading: boolean = false;
  display: boolean = false;
  edit: boolean = false;
  user: boolean = false;
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op',{static:true}) op: OverlayPanel;
  @ViewChild('op',{static:true}) ele: ElementRef;
  noSpecial: RegExp = /[A-Za-zÀ-ȕ ]/;
  selectedFiles: any;
  imagePath: any;
  url: string | ArrayBuffer;
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,
    private confirmationService: ConfirmationService,private router: Router) { }
  public data =[];
  public product:GalleryList;
  AddForm!: FormGroup;
  ngOnInit(): void {
    this.user=false;
    this.AddForm = this.formBuilder.group({
      galleryname: ['', [Validators.required,Validators.maxLength(50)]],
      desc: ['', [Validators.required,Validators.maxLength(100)]],
      
    }) 
    this.GetAllGallery();
   
  }
  GetAllGallery(){
    // this.userService.getAllGallerys().subscribe((response)=>{
    //   this.data=response._embedded.gallery;
    //    })  
  }
  NewGallery(){
    this.router.navigate(['apps/Gallery/add-gallery']);
  }
  clear(table: Table) {
    table.clear();
}
Cancel(){
  this.display=false;
  this.GetAllGallery();
}
show(event,product){
  this.product=product;
  this.op.show(event);
}
Edit(product){
this.product=product;
this.edit=true;
this.op.hide();
}
EditCancel(edit:any){
this.edit=edit;
this.GetAllGallery();
}
Delete(id){
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
    //   this.userService.deleteGallerys(id).subscribe(
    //     {
    //       next: (response)=>{
    //         this.GetAllGallery();  
    //   },
    //   error: (err) => {
    //     this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
    //    //this.Cancel();
    //   }
    //  })
       
    },
    reject: () => {
      //Actual logic to perform a confirmation
  }
});
}
AddGallery(){
  if (this.AddForm.valid) {
    this.product= new GalleryList();
    this.product.name=this.AddForm.controls['galleryname'].value;
    this.product.description=this.AddForm.controls['desc'].value;
//   this.userService.addGallerys(this.product.name,this.product.description).subscribe({
//     next: (response)=>{
//     // if(response.sTATUS=='SUCCESS'){
//       this.GetAllGallery();
//       this.display=false;
      
//    },
//    error: (err) => {
//     this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
//    }
//  })
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
}