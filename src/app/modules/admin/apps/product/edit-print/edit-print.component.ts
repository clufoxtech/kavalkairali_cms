import { BindingType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Language } from 'highlight.js';
import { MessageService } from 'primeng/api';
import { ProductService } from '../product.service';
import { BookEdit, TranslationTitle } from '../productModel/BookEdit';
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
  selector: 'app-edit-print',
  templateUrl: './edit-print.component.html',
  styleUrls: ['./edit-print.component.scss']
})
export class EditPrintComponent implements OnInit {
  selectable = true;
  removable = true;
  cities: City[];
  selectedCategory: any=[];
  filtercategory:any=[];
  filtercompiler: any=[];
  selectedcompiler: any=[];
  filtertranslator: any=[];
  selectedtranslator: any=[];
  filterillustrator: any=[];
  selectedillustrator: any=[];
  filtersubcategory: any=[];
  selectedsubcategory: any=[];
  filtereditor: any=[];
  selectededitor: any=[];
AddForm!: FormGroup;
AdditionalForm!:FormGroup;
AuthorCount=[];
TitleCount=[];
SingleTitle:boolean=true;
SingleAuthor:boolean=true;
MultipleTA:boolean=false;
SingleTA:boolean=false;
Translation: string;
IsTranslation: boolean=false;
thirdParty:boolean=false;
public isbnlength:number=0;
public selectedcount:number;
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
public printbook:BookEdit;
public printbookid:number;
public multipleTitlelist:any=[];
public multipleAuthorlist:any=[];
public multipleTAlist:any=[];
public singleTAlist:any;
public titleAuthorRoyalty:any;
public MultipletitleAuthorRoyalty:any=[];
public MultipleAuthortitleRoyalty:any=[];
public mainTitle:string;
public count:number=0;
public editorid:number=0;
public translationTitle:TranslationTitle;
public subtitlearray:any;
public subtitle:string;
public mindate:string;
public imagePath:string;
public url:any;
public selectedFiles:any;
public AutoSP:number=0;
public BindingType:Array<BindingType>;
public bookurl:any;
public bookType:string;
public bookcover:any;
public chapter: FormArray;
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,private router: Router,public addservice:ProductService,private Aroute: ActivatedRoute) { }
  
  ngOnInit(){
    this.printbook= new BookEdit();
    this.Aroute.params.subscribe(params => {
      this.printbookid=params['id'];
      this.bookType=params['bookType'];
      localStorage.setItem('printbookid',JSON.stringify(this.printbookid));
    });
    this.GetBookDetails();
    this.Getlanguage();
    this.GetImprint();
    this.GetCategory();
    this.GetPublisher();
    this.GetCountry();
    this.GetCompilerContributor('COMPILER');
    this.GetIllustratorContributor('ILLUSTRATOR');
    this.GetTranslatorContributor('TRANSLATOR');
    this.GetEditorContributor('EDITOR');
    this.GetAuthorContributor('AUTHOR');
    this.GetBindingType();
  this.AddForm = this.formBuilder.group({
    titleType: ['', []],
    cover: ['', []],
    title: ['', []],
    authorType: ['', []],
    author: ['', []],
    subtitle: ['', []],
    royaltyPercent: ['', []],
    deliveryPeriod:['',[]],
    uploadfile: ['', []],
    language: ['', []],
    edition: ['', []],
    volume: ['', []],
    superKey: ['', []],
    productCode: ['', []],
    hsnCode: ['', []],
    isbnFormat: ['', []],
    isbnCode: ['', []],
    expiryDate: ['', []],
    pages: ['', []],
    limitation: ['', []],
    discountPercent: ['', []],
    mrp: ['', []],
    taxPercent: ['', []],
    storePrice: ['', []],
    actual: ['', []],
    purchase: ['', []],
    imprint: ['', []],
    compiler: ['', []],
    illustrator: ['', []],
    translator: ['', []],
    editor: ['', []],
    copyrightType: ['', []],
    copyright: ['', []],
    publisher: ['', []],
    summary: ['', []],
    selling: ['', []],
    categories: ['', []],
    subCategories: ['', []],
    isTranslation: ['', []],
    readhour: ['', []],
    readmin: ['', []],
    titleno: ['', []],
    authorno: ['', []],
    countryOfOrigin: ['', []],
    weight: ['', []],
    bindingType: ['', []],
  }) 
  const today =  new Date();
  this.mindate=new Date(today.setDate(today.getDate() + 1)).toISOString().slice(0, 10);
   }
   GetBookDetails() {
    this.addservice.getBookDetails(this.printbookid).subscribe((response) => {
      this.printbook = new BookEdit();
      this.printbook = response;
      this.populateCategoriesAndRelatedFields();
      if (this.printbook.titleType === 'SINGLE' && this.printbook.authorType === 'SINGLE') {
        this.handleSingleTitleSingleAuthor();
      } else if (this.printbook.titleType === 'MULTIPLE' && this.printbook.authorType === 'SINGLE') {
        this.handleMultipleTitleSingleAuthor();
      } else if (this.printbook.titleType === 'SINGLE' && this.printbook.authorType === 'MULTIPLE') {
        this.handleSingleTitleMultipleAuthor();
      } else if (this.printbook.titleType === 'MULTIPLE' && this.printbook.authorType === 'MULTIPLE') {
        this.handleMultipleTitleMultipleAuthor();
      }
      this.handleOtherProperties();
      this.loadAdditionalInformation();
    });
   
  }

  populateCategoriesAndRelatedFields() {
    this.printbook.categories.forEach(x=>{
      this.selectedCategory=this.selectedCategory.concat(x.id);
    })
    this.printbook.compiler.forEach(x=>{
      this.selectedcompiler=this.selectedcompiler.concat(x.id);
    })
    this.printbook.translator.forEach(x=>{
      this.selectedtranslator=this.selectedtranslator.concat(x.id);
    })
    this.printbook.illustrator.forEach(x=>{
      this.selectedillustrator=this.selectedillustrator.concat(x.id);
    })
    this.printbook.subCategories.forEach(x=>{
      this.selectedsubcategory=this.selectedsubcategory.concat(x.id);
    })
    this.printbook.editor.forEach(x=>{
      this.selectededitor=this.selectededitor.concat(x.id);
    })
    this.filtercategory=(this.printbook?.categories)?this.printbook?.categories:[];
    this.filtercompiler=(this.printbook?.compiler)?this.printbook?.compiler:[];
    this.filtertranslator=(this.printbook.translator)?this.printbook.translator:[];
    this.filterillustrator=(this.printbook.illustrator)?this.printbook.illustrator:[];
    this.filtersubcategory=(this.printbook.subCategories)?this.printbook.subCategories:[];
    this.filtereditor=(this.printbook.editor)?this.printbook.editor:[];
    this.CategoryOnClose();
    this.AddForm.patchValue({
      categories: this.selectedCategory,
      subCategories: this.selectedsubcategory,
      compiler:this.selectedcompiler,
      // isTranslation:this.ebook.isTranslation,
      translator:this.selectedtranslator,
      illustrator:this.selectedillustrator,
      editor:this.selectededitor,
    })
  }

  handleSingleTitleSingleAuthor() {
    const singleTitleList = this.printbook.title.filter((obj) => obj.type === 'BOOK');
    this.titleAuthorRoyalty = singleTitleList[0].titleAuthorRoyalty[0];

    this.AddForm.patchValue({
      author: (this.titleAuthorRoyalty?.author?.id) ? this.titleAuthorRoyalty.author.id :0,
royaltyPercent: (this.titleAuthorRoyalty?.royaltyPercent) ? this.titleAuthorRoyalty.royaltyPercent : 0,
title: (singleTitleList[0]?.name) ? singleTitleList[0].name : ''
    });
  }

  handleMultipleTitleSingleAuthor() {
    const multipleTitleList = this.printbook.title.filter((obj) => obj.type === 'CHAPTER');
    const titleAuthorRoyalty = this.printbook.title.filter((obj) => obj.type === 'BOOK')[0];
    this.MultipletitleAuthorRoyalty = titleAuthorRoyalty.titleAuthorRoyalty[0];
    this.count = this.MultipletitleAuthorRoyalty.length;
    this.AddForm.patchValue({
      titleno: (this.count !== undefined) ? this.count : 0,
title: (titleAuthorRoyalty?.name) ? titleAuthorRoyalty.name : ''
    })
    this.populateChapterSingleFormArray(multipleTitleList);
  }

  handleSingleTitleMultipleAuthor() {
    const multipleAuthorList = this.printbook.title.filter((obj) => obj.type === 'BOOK');
    const authorRoyaltyList = multipleAuthorList[0].titleAuthorRoyalty;
    this.count = authorRoyaltyList.length;
    this.AddForm.patchValue({
      authorno: (this.count !== undefined) ? this.count : 0,
      title: (multipleAuthorList[0]?.name) ? multipleAuthorList[0].name : ''
    })
    this.populateAuthorsFormArray(authorRoyaltyList);
  }

  handleMultipleTitleMultipleAuthor() {
    const multipleTAList = this.printbook.title.filter((obj) => obj.type === 'CHAPTER');
    const authorRoyaltyList = this.printbook.title.filter((obj) => obj.type === 'BOOK')[0];
    const titleAuthorRoyaltyList = authorRoyaltyList.titleAuthorRoyalty;
    this.count = titleAuthorRoyaltyList.length;
    this.AddForm.patchValue({
      authorno: (this.count !== undefined) ? this.count : 0,
titleno: (this.count !== undefined) ? this.count : 0,
title: (authorRoyaltyList?.name) ? authorRoyaltyList.name : ''
    })

    this.populateAuthorsFormArray(titleAuthorRoyaltyList);
    this.populateChapterFormArray(multipleTAList);
  }

  populateChapterFormArray(multipleTitleList: any[]) {
    this.chapter = this.AddForm.get('MTMA') as FormArray;
    multipleTitleList.forEach((title) => {
      const formGroup = this.createChapterFormGroup(title);
      this.chapter.push(formGroup);
    });
  }
  populateChapterSingleFormArray(multipleTitleList: any[]) {
    this.chapter = this.AddForm.get('MTSA') as FormArray;
    multipleTitleList.forEach((title) => {
      const formGroup = this.createChapterFormGroup(title);
      this.chapter.push(formGroup);
    });
  }
  createChapterFormGroup(title: any): FormGroup {
    const authors = this.formBuilder.array(
      title.titleAuthorRoyalty.map((authorRoyalty) => this.createAuthorFormGroup(authorRoyalty))
    );

    return this.formBuilder.group({
      chapter: [title.name],
      pages: [title.pages],
      authors: authors,
    });
  }

  createAuthorFormGroup(authorRoyalty: any): FormGroup {
    return this.formBuilder.group({
      author: [authorRoyalty.author.id],
      royaltyPercent: [authorRoyalty.royaltyPercent],
    });
  }

  populateAuthorsFormArray(authorRoyaltyList: any[]) {
    const authorsArray = this.AddForm.get('STMA') as FormArray;
    authorRoyaltyList.forEach((authorRoyalty) => {
      const authorFormGroup = this.createAuthorFormGroup(authorRoyalty);
      authorsArray.push(authorFormGroup);
    });
  }

  handleOtherProperties() {
    this.IsTranslation=this.printbook.isTranslation;
    if (this.printbook.isTranslation) {

      this.AddForm.patchValue({
          'originalLanguage': (this.printbook?.translationTitle.originalLanguage)?this.printbook?.translationTitle.originalLanguage:'',
          'originalTitle': (this.printbook.translationTitle.originalTitle)?this.printbook.translationTitle.originalTitle:'',
          'englishTitle': (this.printbook.translationTitle.englishTitle)?this.printbook.translationTitle.englishTitle:''
      });
  }
    this.translationTitle= new TranslationTitle();
    this.translationTitle=(this.printbook.translationTitle)?this.printbook.translationTitle:null;
    this.subtitlearray= this.printbook.title.filter((obj) => {
      return obj.type === 'SUBTITLE';
    });
    this.AddForm.patchValue({
      titleType:(this.printbook.titleType)?this.printbook.titleType:'',
      authorType:(this.printbook.authorType)?this.printbook.authorType:'',
      subtitle: (this.subtitlearray[0]?.name)?this.subtitlearray[0]?.name:'',
      language: (this.printbook.language?.id)?this.printbook.language?.id:0,
      purchase: (this.printbook.purchaseCost)?this.printbook.purchaseCost:0,
      imprint: (this.printbook.imprint.id)?this.printbook.imprint.id:0,
      copyrightType: (this.printbook.copyrightType)?this.printbook.copyrightType:'',
      publisher: (this.printbook.publisher.id)?this.printbook.publisher.id:0,
      summary: (this.printbook.summary)?this.printbook.summary:'',
      sellingPrice: (this.printbook.sellingPrice)?this.printbook.sellingPrice:0,
      isMoq: (this.printbook.isMoq)?this.printbook.isMoq:false,
      countryOfOrigin: (this.printbook.countryOfOrigin?.id)?this.printbook.countryOfOrigin?.id:0,
      bindingType: (this.printbook.bindingType)?this.printbook.bindingType:'',
      deliveryPeriod: (this.printbook.deliveryPeriod)?this.printbook.deliveryPeriod:0,
      purchaseCost: (this.printbook.purchaseCost)?this.printbook.purchaseCost:0,
      storePrice: (this.printbook.storePrice)?this.printbook.purchaseCost:0,
      cover: (this.printbook.cover)?this.printbook.cover:'',
      hsnCode: (this.printbook.hsnCode)?this.printbook.hsnCode:null,
      limitation: (this.printbook.limitation)?this.printbook.limitation:0,
      readhour: (this.printbook.readhour)?this.printbook.readhour:'',
      readmin: (this.printbook.readmin)?this.printbook.readmin:'',
      ebookFile: this.printbook.ebookFile,
      superKey: (this.printbook?.superKey)?this.printbook?.superKey:'',
      edition:(this.printbook?.edition)?this.printbook?.edition:0,
      volume:(this.printbook?.volume)?this.printbook?.volume:0,
      
    });
  }
  loadAdditionalInformation() {
    this.subtitle = this.subtitlearray;
    
    let formValues = {};
    
    switch (this.bookType) {
      case 'EBOOK':
        if (this.printbook?.ebook) {
          formValues = {
            isbnCode: (this.printbook?.ebook?.isbnCode)?this.printbook?.ebook?.isbnCode:0,
            expiryDate: (this.printbook?.ebook?.expiryDate)?this.printbook?.ebook?.expiryDate:'',
            pages: (this.printbook?.ebook?.pages)?this.printbook?.ebook?.pages:0,
            mrp: (this.printbook?.ebook?.mrp)?this.printbook?.ebook?.mrp:0,
            taxPercent: (this.printbook?.ebook?.taxPercent)?this.printbook?.ebook?.taxPercent:0,
            discountPercent:(this.printbook?.ebook?.discountPercent)?this.printbook?.ebook?.discountPercent:0,
            isbnFormat: (this.printbook?.ebook?.isbnFormat)?this.printbook?.ebook?.isbnFormat:'',
            productCode:(this.printbook?.ebook?.productCode)?this.printbook?.ebook?.productCode:'',
          };
          this.bookcover = this.printbook.ebook.cover;
        }
        break;
  
      case 'AUDIO':
        if (this.printbook?.audioBook) {
          formValues = {
            isbnCode: (this.printbook?.audioBook?.isbnCode) ? this.printbook?.audioBook?.isbnCode : 0,
expiryDate: (this.printbook?.audioBook?.expiryDate) ? this.printbook?.audioBook?.expiryDate : '',
pages: (this.printbook?.audioBook?.pages) ? this.printbook?.audioBook?.pages : 0,
mrp: (this.printbook?.audioBook?.mrp) ? this.printbook?.audioBook?.mrp : 0,
taxPercent: (this.printbook?.audioBook?.taxPercent) ? this.printbook?.audioBook?.taxPercent : 0,
discountPercent: (this.printbook?.audioBook?.discountPercent) ? this.printbook?.audioBook?.discountPercent : 0,
isbnFormat: (this.printbook?.audioBook?.isbnFormat) ? this.printbook?.audioBook?.isbnFormat : '',
productCode: (this.printbook?.audioBook?.productCode) ? this.printbook?.audioBook?.productCode : '',
          };
          this.bookcover = this.printbook.audioBook.cover;
        }
        break;
  
      case 'PRINT':
        if (this.printbook?.printBook) {
          formValues = {
            isbnCode: (this.printbook?.printBook?.isbnCode) ? this.printbook?.printBook?.isbnCode : '',
            expiryDate: (this.printbook?.printBook?.expiryDate) ? this.printbook?.printBook?.expiryDate : '',
            pages: (this.printbook?.printBook?.pages) ? this.printbook?.printBook?.pages : 0,
            mrp: (this.printbook?.printBook?.mrp) ? this.printbook?.printBook?.mrp : 0,
            taxPercent: (this.printbook?.printBook?.taxPercent) ? this.printbook?.printBook?.taxPercent : 0,
            discountPercent: (this.printbook?.printBook?.discountPercent) ? this.printbook?.printBook?.discountPercent : 0,
            isbnFormat: (this.printbook?.printBook?.isbnFormat) ? this.printbook?.printBook?.isbnFormat : '',
            productCode: (this.printbook?.printBook?.productCode) ? this.printbook?.printBook?.productCode : '',
            
          };
          this.bookcover = this.printbook.printBook.cover;
        }
        break;
  
      default:
        console.error(`Unknown book type: ${this.bookType}`);
        break;
    }
  
    if (Object.keys(formValues).length > 0) {
      this.AddForm.patchValue(formValues);
    }
    
    if (this.bookcover) {
      this.url = `https://apps.dcbooks.com/uploads/image/${this.bookcover}`;
    }
     // this.selectedeBook = this.ebook.ebookFile;   
    // this.selectedFiles = '';
    // this.coverId=this.bookcover;
    // this.fileId=this.ebook?.ebook?.fileId;
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
  remove(category: Category): void {
    if(this.filtercategory.length>0 ){
      const index = this.filtercategory.indexOf(category);
      if (index >= 0) {
        this.filtercategory.splice(index, 1);
        this.CategoryOnClose();
      }
      let categories = this.AddForm.get('categories').value;
      categories = categories.filter((cat: any) => cat !== category.id);
      this.AddForm.get('categories').setValue(categories); 
    }
   
    
  }
  
  removecompiler(compiler: Contributor): void {
    const index = this.filtercompiler.indexOf(compiler);
    if (index >= 0) {
        // Remove from filtercompiler array
        this.filtercompiler.splice(index, 1);
        
        // Update the form control
        let compilers = this.AddForm.get('compiler').value;
        compilers = compilers.filter((item: Contributor) => item !== compiler);
        this.AddForm.get('compiler').setValue(compilers);
    }
  }
  
  removetranslator(translator: Contributor): void {
    const index = this.filtertranslator.indexOf(translator);
    if (index >= 0) {
        // Remove from filtertranslator array
        this.filtertranslator.splice(index, 1);
        
        // Update the form control
        let translators = this.AddForm.get('translator').value;
        translators = translators.filter((item: Contributor) => item !== translator);
        this.AddForm.get('translator').setValue(translators);
    }
  }
  
  removeillustrator(illustrator: Contributor): void {
    const index = this.filterillustrator.indexOf(illustrator);
    if (index >= 0) {
        // Remove from filterillustrator array
        this.filterillustrator.splice(index, 1);
        
        // Update the form control
        let illustrators = this.AddForm.get('illustrator').value;
        illustrators = illustrators.filter((item: Contributor) => item !== illustrator);
        this.AddForm.get('illustrator').setValue(illustrators);
    }
  }
  
  removeeditor(editor: Contributor): void {
    const index = this.filtereditor.indexOf(editor);
    if (index >= 0) {
        // Remove from filtereditor array
        this.filtereditor.splice(index, 1);
        
        // Update the form control
        let editors = this.AddForm.get('editor').value;
        editors = editors.filter((item: Contributor) => item !== editor);
        this.AddForm.get('editor').setValue(editors);
    }
  }
  
  removesubcategory(subcategory: SubCategory): void {
    const index = this.filtersubcategory.indexOf(subcategory);
    if (index >= 0) {
        // Remove from filtersubcategory array
        this.filtersubcategory.splice(index, 1);
        
        // Update the form control
        let subcategories = this.AddForm.get('subcategories').value;
        subcategories = subcategories.filter((item: SubCategory) => item !== subcategory);
        this.AddForm.get('subcategories').setValue(subcategories);
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
  addtranslator(event){
    this.filtertranslator=[];
    if(event.value.length>0){
      this.filtertranslator=this.translatorContributor.filter(obj => event.value.includes(obj.id));
    }
   
   }
   addeditor(event){
    this.filtereditor=[];
    if(event.value.length>0){
      this.filtereditor=this.editorContributor.filter(obj => event.value.includes(obj.id));
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


  StorePrice(){
    var mrp:number=0;
    var tax:number=0;
    var discount:number=0;
    mrp=+this.AddForm.controls['mrp'].value;
    tax=+this.AddForm.controls['taxPercent'].value;
    discount=+this.AddForm.controls['discountPercent'].value;
    this.AutoSP=mrp-(mrp*discount/100)+(mrp*tax/100);
  }
  IsTranslated(event,value) {
    if(value==true){
      this.IsTranslation=true;
      this.AddForm.addControl('originalLanguage', this.formBuilder.control('', []));
      this.AddForm.addControl('countryOfOrigin', this.formBuilder.control('', []));
      this.AddForm.addControl('originalTitle', this.formBuilder.control('', []));
      this.AddForm.addControl('englishTitle', this.formBuilder.control('', []));
    }
    else{
      this.IsTranslation=false;
      this.AddForm.removeControl('originalLanguage');
      this.AddForm.removeControl('countryOfOrigin');
      this.AddForm.removeControl('originalTitle');
      this.AddForm.removeControl('englishTitle');
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
      //Get Functions
      GetCountry(){
        this.addservice.getCountry().subscribe((response)=>{
          if(response._embedded.countries.length>0){
            this.country= new Array<Country>();
            this.country=response._embedded.countries;
          } 
           }) 
      }
      Getlanguage(){
        this.addservice.getLanguage().subscribe((response)=>{
          if(response._embedded.languages.length>0){
            this.language= new Array<Language>();
            this.language=response._embedded.languages;
            
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
        this.addservice.getCategory().subscribe((response)=>{
          if(response._embedded.categoryModels.length>0){
            this.category= new Array<Category>();
            this.category=response._embedded.categoryModels;
           // console.log(this.category);
          } 
           }) 
      }
      GetPublisher(){
        this.addservice.getPublisher().subscribe((response)=>{
          if(response._embedded.publishers.length>0){
            this.publisher= new Array<Publisher>();
            this.publisher=response._embedded.publishers;
            //console.log(this.publisher);
          } 
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
           });
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
            if(response.length>0){
              this.subcategory= new Array<SubCategory>();
              this.subcategory=response;
            } 
             })
        }
        else{
          this.subcategory= new Array<SubCategory>();
        }
        
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
Editprintbook(){
  // if (this.AddForm.valid) {
    this.addDetails= new booklist();
    this.addDetails=this.AddForm.value;
   console.log(this.addDetails)
   this.addDetails.id=this.printbookid;
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
   
   if(this.selectedFiles?.length>0){
    this.addservice.addImage(this.selectedFiles[0]).subscribe({
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
    this.addDetails.cover=this.bookcover?this.bookcover:null;
    this.addDetail(); 
  }
  console.log(this.addDetails)
//    
 
}

addDetail(){
  this.addservice.editBook(this.addDetails).subscribe({
       next: (response)=>{
        var product=new BookDetails();
        product.id=response.id;
        this.router.navigate([`apps/product/printdetail`,product]);
       },
       error: (err) => {
        this.messageService.add({severity:'error',  summary:err.error.status, detail:err.error.error});
       }
     })
  
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
