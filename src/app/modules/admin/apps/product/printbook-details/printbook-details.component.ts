import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { BookDetails } from '../productModel/bookdetails';
import { BookEdit, TranslationTitle } from '../productModel/BookEdit';
import { MessageService } from 'primeng/api';

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
  constructor(private messageService: MessageService, public formBuilder: FormBuilder, private router: Router, public productservice: ProductService, private Aroute: ActivatedRoute) { }
  AddForm!: FormGroup;
  EditForm!: FormGroup;
  val1: number;
  list: BookDetails;
  localist: BookDetails;
  index: number = 0;
  public book: BookEdit;
  public bookid: number;
  public multipleTitlelist: any;
  public multipleAuthorlist: any;
  public multipleTAlist: any;
  public titleAuthorRoyalty: any;
  public MultipletitleAuthorRoyalty: any;
  public MultipleAuthortitleRoyalty: any;
  public mainTitle: string;
  public count: number = 0;
  public editorid: number = 0;
  public translationTitle: TranslationTitle;
  public singleTA: boolean = false;
  public multipleTA: boolean = false;
  public MtitleSauthor: boolean = false;
  public StitleMauthor: boolean = false;
  public categories: any;
  public subcategories: any;
  public compiler: any;
  public translator: any;
  public illustrator: any;
  public editor: any;
  public singleTAlist: any;
  public subtitlearray: any;
  public subtitle: string;
  public copyfor: boolean = false;
  public url: string;
  AuthorCount = [];
  TitleCount = [];
  public CopyString: string;
  ngOnInit() {
    this.index = 0;
    this.book = new BookEdit();
    // this.product=new Publisher();
    this.AddForm = this.formBuilder.group({
      user: ['', [Validators.required]],
      review: ['', [Validators.required]],
      date: ['', [Validators.required]],
      rating: ['', [Validators.required]],
    });
    this.discountForm = this.formBuilder.group({
      editDiscount: ['', [Validators.required]],
    });


    this.Aroute.params.subscribe((params) => {
      this.bookid = params['id'];
      localStorage.setItem('bookid', JSON.stringify(this.bookid));
    });
    const id = localStorage.getItem('bookid');
    const Id = JSON.parse(id);
    this.GetBookDetails(Id);



  }
  GetBookDetails(id: number) {
    this.productservice.getBookDetails(id).subscribe((response) => {
      if (response) {
        this.processBookDetails(response);
      }
    });
  }

  processBookDetails(response: any) {
    this.book = new BookEdit();
    this.book = response;
    this.setArrays(this.book.categories, this.categories);
    this.setArrays(this.book.subCategories, this.subcategories);
    this.setArrays(this.book.compiler, this.compiler);
    this.setArrays(this.book.illustrator, this.illustrator);
    this.setArrays(this.book.editor, this.editor);
    this.setArrays(this.book.translator, this.translator);
    this.subtitle = this.book.title.find(obj => obj.type === 'SUBTITLE')?.name;
    this.handleTitleAuthorTypes();
    this.url = 'https://apps.dcbooks.com/uploads/image/' + this.book?.printBook?.cover;
    if (this.book?.isTranslation) {
      this.translationTitle = this.book.translationTitle;
    }
  }

  setArrays(source: any[], destination: string[]) {
    destination = [];
    source.forEach((x) => {
      destination.push(x.name);
    });
  }

  handleTitleAuthorTypes() {
    if (this.book.titleType === 'SINGLE' && this.book.authorType === 'SINGLE') {
      this.handleSingleTitleSingleAuthor();
    } else if (this.book.titleType === 'MULTIPLE' && this.book.authorType === 'MULTIPLE') {
      this.handleMultipleTitlesMultipleAuthors();
    } else if (this.book.titleType === 'MULTIPLE' && this.book.authorType === 'SINGLE') {
      this.handleMultipleTitlesSingleAuthor();
    } else if (this.book.titleType === 'SINGLE' && this.book.authorType === 'MULTIPLE') {
      this.handleSingleTitleMultipleAuthors();
    }
  }

  handleSingleTitleSingleAuthor() {
    this.singleTAlist = this.book.title.filter(obj => obj.type === 'BOOK');
    this.titleAuthorRoyalty = this.singleTAlist[0]?.titleAuthorRoyalty[0];
    this.mainTitle = this.singleTAlist[0]?.name;
    this.singleTA = true;
  }

  handleMultipleTitlesMultipleAuthors() {
    this.multipleTA = true;
    this.multipleTAlist = this.book?.title.filter(obj => obj.type === 'CHAPTER');
    this.titleAuthorRoyalty = this.book?.title.filter(obj => obj.type === 'BOOK');
    this.mainTitle = this.titleAuthorRoyalty[0]?.name;
    this.count = this.multipleTAlist.length;
  }

  handleMultipleTitlesSingleAuthor() {
    this.MtitleSauthor = true;
    this.multipleTitlelist = this.book?.title.filter(obj => obj.type === 'CHAPTER');
    this.titleAuthorRoyalty = this.book?.title.filter(obj => obj.type === 'BOOK');
    this.MultipletitleAuthorRoyalty = this.titleAuthorRoyalty[0]?.titleAuthorRoyalty[0];
    this.mainTitle = this.titleAuthorRoyalty[0]?.name;
    this.TitleCount = this.multipleTitlelist;
    this.count = this.multipleTitlelist.length;
  }

  handleSingleTitleMultipleAuthors() {
    this.StitleMauthor = true;
    this.multipleAuthorlist = this.book.title.filter(obj => obj.type === 'BOOK');
    this.MultipleAuthortitleRoyalty = '';
    this.MultipletitleAuthorRoyalty = this.multipleAuthorlist[0]?.titleAuthorRoyalty;
    this.mainTitle = this.multipleAuthorlist[0]?.name;
    this.AuthorCount = this.multipleAuthorlist[0]?.titleAuthorRoyalty;
    this.count = this.multipleAuthorlist[0]?.titleAuthorRoyalty.length;
  }


  AddReview() {
    this.display = true;
  }
  Cancel() {
    this.display = false;
  }
  NewReview() {

  }
  Copy() {
    this.copyfor = true;
  }

  OK() {
    this.copyfor = false;
  }
  Edit() {
    this.book.bookType = 'PRINT';
    this.router.navigate([`apps/product/printedit`, this.book]);
  }
  onTabChange(e) {
    this.index = e;
  }
  GoBack() {
    this.router.navigate([`apps/product/productlist`]);
  }
  CreateCopy(data) {
    this.book.bookType = 'PRINT';
    if (data == 'EBOOK') {
      this.productservice.bookExist(this.mainTitle, 'EBOOK').subscribe({
        next: (response) => {
          if (response.status == 200) {
            this.messageService.add({ severity: 'error', summary: response.status, detail: response.message });
            this.copyfor = false;
          }
          else if (response.status == 204) {
            this.router.navigate([`apps/product/ebookedit`, this.book]);
          }

        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: err.status, detail: err.message });
          this.copyfor = false;
        }
      });

    }
    else if (data == 'AUDIO') {
      this.productservice.bookExist(this.mainTitle, 'AUDIO').subscribe({
        next: (response) => {
          if (response.status == 200) {
            this.messageService.add({ severity: 'error', summary: response.status, detail: response.message });
            this.copyfor = false;
          }
          else if (response.status == 204) {
            this.router.navigate([`apps/product/audioedit`, this.book]);
          }
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: err.status, detail: err.message });
          this.copyfor = false;
        }
      });

    }

  }
  discount(): void {
    this.discountPopUp = true;
  }
  applyDiscount(): void {
    console.log('not yet dveloped');
  }
  get getDiscountControl() {
    return this.discountForm.controls;
  }
  applyDiscountCancel(): void {
    this.discountPopUp = false;
  }
  get getControl() {
    return this.AddForm.controls;
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

}
