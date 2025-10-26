import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import {MessageService} from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { ProductService } from '../../product.service';
import { Contributor } from '../../productModel/contributor';
import { contributorSearch, customerSearch } from '../../productModel/searchList';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'app-contributors',
  templateUrl: './contributors.component.html',
  styleUrls: ['./contributors.component.scss']
})
export class ContributorsComponent implements OnInit {
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op',{static:true}) op: OverlayPanel;
  noSpecial: RegExp = /[A-Za-zÀ-ȕ ]/;
  display: boolean = false;
  editdisplay: boolean=false;
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,public contributorservice: ProductService,private confirmationService: ConfirmationService) { }
public contributor: Array<Contributor>;
public Searchcontributor: Array<Contributor>;
public product: Contributor;
public addDetails: Contributor;
public editDetails: Contributor;
public contributortype=[];
public editAuthor: boolean=false;
public editNarrator: boolean=false;
public editEditor: boolean=false;
public editIllustrator: boolean=false;
public editCompiler: boolean=false;
public editTranslator: boolean=false;
public imagePath: string;
public url: any;
public selectedFiles: any;
public photoId: any;
AddForm!: FormGroup;
EditForm!: FormGroup;
perPage = 10;
page=0;
totalRecords=0;
searchDetails: contributorSearch;
ngOnInit(): void {
  this.contributortype=[];
  this.selectedFiles='';
  this.AddForm = this.formBuilder.group({
    contributor: ['', [Validators.required]],
    photo:[''],
    groupname1:['',],
    groupname2:['',],
    groupname3:['',],
    groupname4:['',],
    groupname5:['',],
    groupname6:['',]
  });
  this.EditForm = this.formBuilder.group({
    editcontributor: ['', [Validators.required]],
    editphoto:[''],
    editgroupname1:['',],
    editgroupname2:['',],
    editgroupname3:['',],
    editgroupname4:['',],
    editgroupname5:['',],
    editgroupname6:['',]
  });
    this.GetContributor();
    this.product=new Contributor();
   }
  GetContributor(){
    this.contributorservice.getContributor(this.page,this.perPage).subscribe((response)=>{
      if(response._embedded.contributors.length>0){
        this.contributor= new Array<Contributor>();
        this.contributor=response?._embedded?.contributors;
        this.totalRecords=response?.page?.totalElements;
        console.log(this.contributor);
      }
       });
  }
  NewContributor(){
this.display=true;
  }

show(event,product){
  this.product=product;
  this.op.show(event);
}
Cancel(){
  this.contributortype=[];
  this.display=false;
  this.selectedFiles='';
  this.url='';
  this.AddForm.reset();
}
LazyLoadContributor(event){
  this.page = event.first / event.rows ;
  this.perPage=event.rows;
  if(  this.searchDetails?.contributorType){
    this.SearchContributor().then(() => {
      this.contributor= new Array<Contributor>();
     this.contributor=this.Searchcontributor;
    });
  }
  else{
    this.GetContributor();
  }

}
applyGlobalFilter(event){
  this.searchDetails=new contributorSearch();
  this.searchDetails.contributorType=event.target.value;
  this.SearchContributor().then(() => {
    this.contributor= new Array<Contributor>();
   this.contributor=this.Searchcontributor;
  });
}
SearchContributor(): Promise<any>{
  return new Promise<any[]>((resolve, reject) => {
  this.contributorservice.searchContributor(this.page,this.perPage,this.searchDetails).subscribe({
    next: (response)=>{
      this.Searchcontributor= new Array<Contributor>();
      this.Searchcontributor=response?._embedded?.contributors;
      resolve(this.Searchcontributor);
},
error: (err) => {
 this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
}
  });
});
}
AddContributor(){
  if (this.AddForm.valid) {
    this.addDetails= new Contributor();
    this.addDetails.name=this.AddForm.controls['contributor'].value;
    this.addDetails.contributorTypes=this.contributortype;
    if(this.selectedFiles.length>0){
      this.contributorservice.addImage( this.selectedFiles[0]).subscribe({
        next: (response)=>{
          this.addDetails.imageId=response.publicId;
          this.addAuthor();
       },
       error: (err) => {
        this.addDetails.imageId=null;
        this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
       }
    });

}
else{
  this.addDetails.imageId=null;
  this.addAuthor();
}
    }
     else {
      this.validateAllFields(this.AddForm);
  }
  this.contributortype=[];
}
addAuthor(){
  this.contributorservice.addContributor(this.addDetails.name,this.addDetails.contributorTypes,this.addDetails.imageId).subscribe({
    next: (response)=>{
       this.GetContributor();
       this.Cancel();
       this.messageService.add({severity:'success', summary:'Added successfully', detail:'Added successfully'});

    },
    error: (err) => {
      if(err.error.status=409){
        this.messageService.add({severity:'error', summary:err.error.status, detail:'Already exist'});
      }
     this.Cancel();
     this.GetContributor();
    }
  });

}
get getControl(){
  return this.AddForm.controls;
}
get getEditControl(){
  return this.EditForm.controls;
}

validateAllFields(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
          control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
          this.validateAllFields(control);
      }
  });
}
Edit(product){
  this.editdisplay=true;
  this.selectedFiles='';
  this.product=new Contributor();
  this.product=product;
  this.contributortype=[];
  this.contributortype=this.product.contributorTypes;
  this.url='http://45.79.126.4:8080/uploads/image/'+this.product.imageId;
  this.photoId=this.product.imageId;
  console.log(this.contributortype);
  if(this.contributortype.includes('AUTHOR')){
    this.editAuthor=true;
  }
  else{
    this.editAuthor=false;
  }
  if(this.contributortype.includes('NARRATOR')){
    this.editNarrator=true;
  }
  else{
    this.editNarrator=false;
  }
  if(this.contributortype.includes('COMPILER')){
    this.editCompiler=true;
  }
  else{
    this.editCompiler=false;
  }
  if(this.contributortype.includes('ILLUSTRATOR')){
    this.editIllustrator=true;
  }
  else{
    this.editIllustrator=false;
  }
  if(this.contributortype.includes('TRANSLATOR')){
    this.editTranslator=true;
  }
  else{
    this.editTranslator=false;
  }
  if(this.contributortype.includes('EDITOR')){
    this.editEditor=true;
  }
  else{
    this.editEditor=false;
  }
  this.op.hide();
  console.log(this.product);
}
EditContribution(){
  if (this.EditForm.valid) {
    this.editDetails= new Contributor();
    this.editDetails.id=this.product.id;
    this.editDetails.name=this.EditForm.controls['editcontributor'].value;
    this.editDetails.contributorTypes=this.contributortype;
    if(this.selectedFiles.length>0){
      this.contributorservice.addImage( this.selectedFiles[0]).subscribe({
        next: (response)=>{
          this.editDetails.imageId=response.publicId;
          this.editContibutorAuthor();
       },
       error: (err) => {
        this.editDetails.imageId=null;
          this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.detail});
       }
    });

    }
    else if(this.photoId){
      this.editDetails.imageId=this.photoId;
      this.editContibutorAuthor();
    }
    else{
      this.editDetails.imageId=null;
      this.editContibutorAuthor();
    }

    }
     else {
      this.validateAllFields(this.EditForm);
  }

}
editContibutorAuthor(){
  this.contributorservice.editContributor(this.editDetails.id,this.editDetails.name,this.editDetails.contributorTypes,this.editDetails.imageId).subscribe({
    next: (response)=>{
       this.GetContributor();
       this.EditCancel();
    },
    error: (err) => {
      if(err.error.status=409){
        this.messageService.add({severity:'error', summary:err.error.status, detail:'Already exist'});
      }
     this.EditCancel();
     this.GetContributor();
    }
  });
}
EditCancel(){
  this.contributortype=[];
this.editdisplay=false;
this.url='';
this.selectedFiles='';
this.EditForm.reset();

}
existsInArray( arr, item ) {

  for( let i = 0; i < arr.length; i++ )
      {if( arr[ i ] === item ) {return true;}}

  return false;

}
contributorType(event,value){
  if(event.checked==true){

      if( this.contributortype.includes(value) )
    {
      const startIndex = this.contributortype.indexOf(value);
      if (startIndex !== -1) {
     this.contributortype.splice(startIndex,1);
      }
    }
    else{
    this.contributortype.push(value);
    }

}
else{
  if( this.contributortype.includes(value) )
  {
    const startIndex = this.contributortype.indexOf(value);
    if (startIndex !== -1) {
   this.contributortype.splice(startIndex,1);
    }
  }
console.log(this.contributortype);
}

}
Delete(contributor){
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
      this.contributorservice.deleteContributor(contributor.id).subscribe({
        next: (response)=>{
          this.GetContributor();
        },
        error: (err) => {
          this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
          this.op.hide();
          this.GetContributor();
        }
      });

},
reject: () => {

}
  });
}

onFileChanged(event){
  this.selectedFiles = event.target.files;
  if (this.selectedFiles.length === 0){
   return;
  }
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
  };
}
clear(){
  this.searchInputControl.setValue('');
  this.searchDetails=new contributorSearch();
  this.GetContributor();
}
}

