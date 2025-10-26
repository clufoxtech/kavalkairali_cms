import { BindingType } from '@angular/compiler';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Language } from 'highlight.js';
import { MessageService } from 'primeng/api';
import { ProductService } from '../product.service';
import { Category } from '../productModel/Category';
import { Imprint } from '../productModel/Imprint';
import { Publisher } from '../productModel/Publisher';
import { SubCategory } from '../productModel/SubCategory';
import { booklist, chapter } from '../productModel/bookaddlist';
import { BookDetails } from '../productModel/bookdetails';
import { City } from '../productModel/city';
import { Contributor } from '../productModel/contributor';
import { Country } from '../productModel/country';

@Component({
  providers: [MessageService],
  selector: 'app-add-print-book',
  templateUrl: './add-print-book.component.html',
  styleUrls: ['./add-print-book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, // Set the change detection strategy to OnPush
})
export class AddPrintBookComponent implements OnInit {
  selectable = true;
  removable = true;
  cities: City[];
selectedCategory: Array<Category>;
filtercategory:Array<Category>=[];
filtereditor:Array<Contributor>=[];
selectededitor:Array<Contributor>=[];
filtercompiler:Array<Contributor>=[];
selectedcompiler:Array<Contributor>=[];
filtertranslator:Array<Contributor>=[];
selectedtranslator:Array<Contributor>=[];
filterillustrator:Array<Contributor>=[];
selectedillustrator:Array<Contributor>=[];
filtersubcategory:Array<SubCategory>=[];
selectedsubcategory:Array<Contributor>=[];
AddForm!: FormGroup;
AdditionalForm!:FormGroup;
AuthorCount=[];
TitleCount=[];
SingleTitle:boolean=true;
SingleAuthor:boolean=true;
MultipleTA:boolean=false;
SingleTA:boolean=false;
Translation: string;
MOQ: string;
IsTranslation: boolean=false;
IsMoq: boolean=false;
thirdParty:boolean=false;
public isbnlength:number=0;
public selectedcount:number;
public BindingType:Array<BindingType>;
public language:Array<Language>;
public imprint:Array<Imprint>;
public category:Array<Category>;
public publisher:Array<Publisher>;
public country:Array<Country>;
public compilerContributor:Array<Contributor>;
public authorContributor:Array<Contributor>;
public translatorContributor:Array<Contributor>;
public illustratorContributor:Array<Contributor>;
public editorContributor:Array<Contributor>;
public contributor:Array<Contributor>;
public subcategory:Array<SubCategory>;
public addDetails:booklist;
public chapter:Array<chapter>;
public mindate:string;
public imagePath:string;
public url:any;
public selectedFiles:any;
public AutoSP:number=0;
public msg:string;
public authorCountOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
public  titleCountOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,private router: Router,public addservice:ProductService) {
    
   }
  
  ngOnInit(){
    this.AddForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      subtitle: ['', []],
      weight: ['', []],
      language: ['', []],
      edition: [0, []],
      volume: [0, []],
      superKey: ['', []],
      productCode: ['', []],
      isbnFormat: ['', []],
      expiryDate: ['', []],
      pages: [0, []],
      discountPercent: ['', []],
      mrp: ['', []],
      taxPercent: ['', []],
      purchase: ['', []],
      imprint: ['', []],
      compiler: ['', []],
      illustrator: ['', []],
      translator: ['', []],
      editor: ['', []],
      copyrightType: ['', []],
      publisher: ['', []],
      summary: ['', []],
      sellingPrice: ['', []],
      categories: ['', []],
      subCategories: ['', []],
      isTranslation: ['', []],
      isMoq: ['', []],
      isbnCode: ['', []],
      copyright: ['', []],
      countryOfOrigin: ['', []],
      bindingType:['',[]],
      deliveryPeriod:[0,[]],
      purchaseCost:['',[]],
      storePrice:['',[]],
      cover:['',[]],
      hsnCode:['',[]],
      authorno:['',[]],
      titleno: ['', []],
      titleType: ['', Validators.required],
      authorType: ['', Validators.required],
 
    }) 
    this.Getlanguage();
    this.GetImprint();
    this.GetCategory();
    this.GetPublisher();
    this.GetCountry();
    this.GetBindingType();
    this.GetCompilerContributor('COMPILER');
    this.GetIllustratorContributor('ILLUSTRATOR');
    this.GetTranslatorContributor('TRANSLATOR');
    this.GetEditorContributor('EDITOR');
  //this.filtercategory=[];
  //this.AdditionalForm = this.formBuilder.group({});
  
  const today =  new Date();
  this.mindate=new Date(today.setDate(today.getDate() + 1)).toISOString().slice(0, 10);
  console.log(this.mindate)
  
   }
   updateValidation() {
    const titleType = this.AddForm.get('titleType').value;
    const authorType = this.AddForm.get('authorType').value;
    if (titleType === 'SINGLE' && authorType === 'MULTIPLE') {
      this.AddForm.get('authorno').setValidators([Validators.required]);
      this.AddForm.get('titleno').clearValidators();
      this.AddForm.setControl('STMA', this.formBuilder.array([]));
      console.log(this.AddForm)
    } else if (titleType === 'MULTIPLE' && authorType === 'SINGLE') {
      this.AddForm.get('titleno').setValidators([Validators.required]);
      this.AddForm.get('authorno').clearValidators();
       this.AddForm.setControl('MTSA', this.formBuilder.array([]));
       this.AddForm.addControl('author', this.formBuilder.control('', Validators.required));
      this.AddForm.addControl('royaltyPercent', this.formBuilder.control('', []));
              console.log(this.AddForm)
    }
    else if(titleType==='MULTIPLE' && authorType==='MULTIPLE'){
      this.AddForm.get('titleno').setValidators([Validators.required]);
      this.AddForm.get('authorno').clearValidators();
      this.AddForm.setControl('MTMA', this.formBuilder.array([]));
        console.log(this.AddForm)
    } else {
      this.AddForm.get('authorno').clearValidators();
      this.AddForm.get('titleno').clearValidators();
      this.AddForm.setControl('author', this.formBuilder.control('', Validators.required));
      this.AddForm.setControl('royaltyPercent', this.formBuilder.control('', []));
    }
  
    this.AddForm.get('authorno').updateValueAndValidity();
    this.AddForm.get('titleno').updateValueAndValidity();
  }

  isSingleTitleMultipleAuthor(): boolean {
    return this.AddForm.get('titleType').value === 'SINGLE' && this.AddForm.get('authorType').value === 'MULTIPLE';
  }

  isMultipleTitleSingleAuthor(): boolean {
    return this.AddForm.get('titleType').value === 'MULTIPLE' && this.AddForm.get('authorType').value === 'SINGLE';
  }

  isMultipleTitleMultipleAuthor(): boolean {
    return this.AddForm.get('titleType').value === 'MULTIPLE' && this.AddForm.get('authorType').value === 'MULTIPLE';
  }

  issingleTitleSingleAuthor(): boolean {
    return this.AddForm.get('titleType').value === 'SINGLE' && this.AddForm.get('authorType').value === 'SINGLE';
  }
  onAuthorCountChange(count: number) {
    const activeFormGroup = this.getActiveFormGroup();
    if (activeFormGroup === 'singleTitleMultipleAuthor') {

      const STMA = this.AddForm.get('STMA') as FormArray;
      STMA.clear();
      for (let i = 0; i < count; i++) {
        STMA.push(this.formBuilder.group({
          author: ['', Validators.required],
          royaltyPercent:['',]
        }));
      }
  }
  }
  
  onTitleCountChange(count: number) {
    // Check which form group is active
    const activeFormGroup = this.getActiveFormGroup();
    if (activeFormGroup === 'multipleTitleSingleAuthor') {
      const MTSA = this.AddForm.get('MTSA') as FormArray;
      MTSA.clear();
      for (let i = 0; i < count; i++) {
        MTSA.push(this.formBuilder.group({
          title: ['', Validators.required]
        }));
      }
  }
  else if(activeFormGroup === 'multipleTitleMultipleAuthor'){
    const MTMA = this.AddForm.get('MTMA') as FormArray;
    MTMA.clear();
    for (let i = 0; i < count; i++) {
      MTMA.push(this.formBuilder.group({
        title: ['', Validators.required],
        author: ['', Validators.required],
        royaltyPercent: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
      }));
    }
  }
}
  getActiveFormGroup(): string {
    // Determine which form group is currently active based on form values
    // For example, you can check if titleType and authorType are selected
    // and return the corresponding form group name
    // Replace this logic with your actual conditions
    const titleType = this.AddForm.get('titleType').value;
    const authorType = this.AddForm.get('authorType').value;
  
    if (titleType === 'SINGLE' && authorType === 'SINGLE') {
      return 'singleTitleSingleAuthor';
    } else if (titleType === 'SINGLE' && authorType === 'MULTIPLE') {
      return 'singleTitleMultipleAuthor';
    } else if (titleType === 'MULTIPLE' && authorType === 'SINGLE') {
      return 'multipleTitleSingleAuthor';
    } else if (titleType === 'MULTIPLE' && authorType === 'MULTIPLE') {
      return 'multipleTitleMultipleAuthor';
    } else {
      // Default case, return null or handle accordingly
      return null;
    }
  }
   GoBack(){
    this.AddForm.reset();
    this.router.navigate([`apps/product/productlist`]);  
  }
  
  remove(category: Category): void {
    if(this.filtercategory.length>0 && this.selectedCategory.length>0){
      const index = this.filtercategory.indexOf(category);
      if (index >= 0) {
        this.filtercategory.splice(index, 1);
        this.CategoryOnClose();
      }
    }
  }
 
  
  removecompiler(compiler: Contributor): void {
    if(this.filtercompiler.length>0 && this.selectedcompiler.length>0){
      const index = this.filtercompiler.indexOf(compiler);
      if (index >= 0) {
        this.filtercompiler.splice(index, 1);
      }
    } 
  }
  removetranslator(translator: Contributor): void {
    if(this.filtertranslator.length>0 && this.selectedtranslator.length>0){
      const index = this.filtertranslator.indexOf(translator);
      if (index >= 0) {
        this.filtertranslator.splice(index, 1);
      }
    } 
  }
  removeillustrator(illustrator: Contributor): void {
    if(this.filterillustrator.length>0 && this.selectedillustrator.length>0){
      const index = this.filterillustrator.indexOf(illustrator);
      if (index >= 0) {
        this.filterillustrator.splice(index, 1);
      }
    }
  }
  removeeditor(editor: Contributor): void {
    if(this.filterillustrator.length>0 && this.selectededitor.length>0){
      const index = this.filtereditor.indexOf(editor);
      if (index >= 0) {
        this.filtereditor.splice(index, 1);
      }
    }
  }
  removesubcategory(subcategory: SubCategory): void {
    if(this.filtersubcategory.length>0 && this.selectedsubcategory.length>0){
      const index = this.filtersubcategory.indexOf(subcategory);
      if (index >= 0) {
        this.filtersubcategory.splice(index, 1);
      }
    }
  }
add(event){
  this.filtercategory=[];
  if(event.value.length>0){
    this.filtercategory=this.category.filter(obj => event.value.includes(obj.id));
  }
}

 addcompiler(event){
  this.filtercompiler=[];
  if(event.value.length>0){
    this.filtercompiler=this.compilerContributor.filter(obj => event.value.includes(obj.id));
  }
  }
  addeditor(event){
    this.filtereditor=[];
    if(event.value.length>0){
      this.filtereditor=this.editorContributor.filter(obj => event.value.includes(obj.id));
    }
   
   }
addtranslator(event){
  this.filtertranslator=[];
  if(event.value.length>0){
    this.filtertranslator=this.translatorContributor.filter(obj => event.value.includes(obj.id));
  }
 
 }
 addillustrator(event){
  this.filterillustrator=[];
  if(event.value.length>0){
    this.filterillustrator=this.illustratorContributor.filter(obj => event.value.includes(obj.id));
  }
  }
  addsubcategory(event){
    this.filtersubcategory=[];
    if(event.value.length>0){
      this.filtersubcategory=this.subcategory.filter(obj => event.value.includes(obj.id));
    }
    }

    TitleAlreadyExist(){
      this.msg='';
      var title=this.AddForm.controls['title'].value;
      this.addservice.bookExist(title,'PRINT').subscribe((response)=>{
        if(response.status==200){
          this.msg=response.message;
          console.log(this.msg);
        }
       
      
         })   
    }
    

  IsTranslated(event) {
if(this.Translation=='true'){
  this.IsTranslation=true;
  this.AddForm.addControl('originalLanguage', this.formBuilder.control('', []));
  this.AddForm.addControl('originalTitle', this.formBuilder.control('', []));
  this.AddForm.addControl('englishTitle', this.formBuilder.control('', []));
}
else{
  this.IsTranslation=false;
  this.AddForm.removeControl('originalLanguage');
  this.AddForm.removeControl('originalTitle');
  this.AddForm.removeControl('englishTitle');
}
  }
  IsMOQ(event) {
  if(this.MOQ=='true'){
    this.IsMoq=true;
    this.AddForm.addControl('moq', this.formBuilder.control('', []));
    this.AddForm.addControl('moqDuration', this.formBuilder.control('', []));
  }
  else{
    this.IsMoq=false;
    this.AddForm.removeControl('moq');
    this.AddForm.removeControl('moqDuration');
  }
  }
  Thirdparty(event){
   if(event.target.value=='THIRD'){
   
    this.thirdParty=true;
   }
   else {
    this.thirdParty=false;
   
   }
      }
ISBNformat(event){
  this.isbnlength=0;
if(event.target.value=='DIGIT_10'){
  this.isbnlength=10;
 
  
}
else if(event.target.value=='DIGIT_13'){
  this.isbnlength=13;
 
}
this.AddForm.controls.isbnCode.setValidators([Validators.minLength(this.isbnlength)]);
}
StorePrice(){
  var mrp:number=0;
  var tax:number=0;
  var discount:number=0;
  mrp=+this.AddForm.controls['mrp'].value;
  tax=+this.AddForm.controls['taxPercent'].value;
  discount=+this.AddForm.controls['discountPercent'].value;
  this.AutoSP=mrp-(mrp*discount/100)+(mrp*tax/100);
}
      //Get Functions
      GetCountry(){
        this.addservice.getCountry().subscribe((response)=>{
          if(response._embedded.countries.length>0){
            this.country= new Array<Country>();
            this.country=response._embedded.countries;
            console.log(this.country);
          } 
           }) 
      }
      GetBindingType(){
        this.addservice.getBindingType().subscribe((response)=>{
          if(response._embedded.bookBindingTypes.length>0){
            this.BindingType= new Array<BindingType>();
            this.BindingType=response._embedded.bookBindingTypes;
            console.log(this.BindingType);
          } 
           }) 
      }
      Getlanguage(){
        this.addservice.getLanguage().subscribe((response)=>{
          if(response._embedded.languages.length>0){
            this.language= new Array<Language>();
            this.language=response._embedded.languages;
            console.log(this.language);
          } 
           }) 
      }
      GetImprint(){
        this.addservice.getImprint().subscribe((response)=>{
          if(response._embedded.imprints.length>0){
            this.imprint= new Array<Imprint>();
            this.imprint=response._embedded.imprints;
            console.log(this.imprint);
          } 
           }) 
      }
      GetCategory(){
        this.category= new Array<Category>();
        this.addservice.getCategory().subscribe((response)=>{
         // if(response._embedded.categoryModels.length>0){
           
            this.category=response._embedded.categoryModels;
            console.log(this.category);
         // } 
           }) 
      }
      GetPublisher(){
        this.addservice.getPublisher().subscribe((response)=>{
          //if(response._embedded.publishers.length>0){
            this.publisher= new Array<Publisher>();
            this.publisher=response._embedded.publishers;
            console.log(this.publisher);
          //} 
           }) 
      }
      GetEditorContributor(type:string){
        this.addservice.getContributorByType(type).subscribe((response)=>{
          if(response._embedded.contributors.length>0){
            this.editorContributor= new Array<Contributor>();
            this.editorContributor=response._embedded.contributors;
          } 
           }) 
      }
      GetCompilerContributor(type:string){
        this.addservice.getContributorByType(type).subscribe((response)=>{
          if(response._embedded.contributors.length>0){
            this.compilerContributor= new Array<Contributor>();
            this.compilerContributor=response._embedded.contributors;
          } 
           }) 
      }
      GetAuthorContributor(type:string){
        this.addservice.getContributorByType(type).subscribe((response)=>{
          if(response._embedded.contributors.length>0){
            this.authorContributor= new Array<Contributor>();
            this.authorContributor=response._embedded.contributors;
          } 
           }) 
      }
      GetTranslatorContributor(type:string){
        this.addservice.getContributorByType(type).subscribe((response)=>{
          if(response._embedded.contributors.length>0){
            this.translatorContributor= new Array<Contributor>();
            this.translatorContributor=response._embedded.contributors;
          } 
           }) 
      }
      GetIllustratorContributor(type:string){
        this.addservice.getContributorByType(type).subscribe((response)=>{
          if(response._embedded.contributors.length>0){
            this.illustratorContributor= new Array<Contributor>();
            this.illustratorContributor=response._embedded.contributors;
          } 
           }) 
      }
      CategoryOnClose(){
        var list=[];
        if(this.filtercategory.length>0){
          this.filtercategory.forEach(x=>{
            list.push(x._links.self.href)
          })
          this.addservice.getSubcategoryByCategory(list).subscribe((response)=>{
            //if(response.length>0){
              this.subcategory= new Array<SubCategory>();
              this.subcategory=response;
            //} 
             })
        }
        else{
          this.subcategory= new Array<SubCategory>();
        }
        
      }
AddPrintbook(){
//  if (this.AddForm.valid) {
 
    this.addDetails= new booklist();
    this.addDetails=this.AddForm.value; 
    if(this.addDetails.isTranslation==undefined){
      this.addDetails.isTranslation=false;
    }
    if(this.addDetails.categories==undefined){
      this.addDetails.categories=[];
    }
   this.addDetails.type='PRINT';
   const activeFormGroup = this.getActiveFormGroup();

   if (activeFormGroup === 'multipleTitleSingleAuthor') {
     this.addDetails.MTSA.forEach((book, index) => {
       this.addDetails[`chapter[${index}].title`] = book.title;
     });
   }
   else if (activeFormGroup === 'multipleTitleMultipleAuthor') {
     this.addDetails.MTMA.forEach((book, index) => {
       this.addDetails[`chapter[${index}].title`] = book.title;
       this.addDetails[`chapter[${index}].author`] = book.author;
       this.addDetails[`chapter[${index}].royaltyPercent`] = book.royaltyPercent;
     });
   }
   else if (activeFormGroup === 'singleTitleMultipleAuthor') {
     this.addDetails.STMA.forEach((book, index) => {
       this.addDetails[`authors[${index}].author`] = book.author;
       this.addDetails[`authors[${index}].royaltyPercent`] = book.royaltyPercent;
     });
   }
   
  console.log(this.addDetails)
  if(this.selectedFiles?.length>0 ){
    this.addservice.addImage( this.selectedFiles[0]).subscribe({
      next: (response)=>{
        this.addDetails.cover=response.publicId;
        this.addDetail(); 
     },
     error: (err) => {
      this.addDetails.cover=null;
      this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
     }
  })
  }
  else {
    this.addDetails.cover=null;
    this.addDetail(); 
  }

  // } 
}
addDetail(){
  this.addservice.addEBook(this.addDetails).subscribe({
        next: (response)=>{
         var product=new BookDetails();
         product.id=response.id;
         this.router.navigate([`apps/product/bookdetails`,product]);
        },
        error: (err) => {
         this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
        }
      })
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
