import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { BookDetails } from '../productModel/bookdetails';
import { BookEdit, TranslationTitle } from '../productModel/BookEdit';
import { MessageService } from 'primeng/api';

@Component({
  providers: [MessageService],
  selector: 'app-audiobook-details',
  templateUrl: './audiobook-details.component.html',
  styleUrls: ['./audiobook-details.component.scss']
})
export class AudiobookDetailsComponent implements OnInit {
  public display: boolean = false;
  discountForm: FormGroup<{ editDiscount: FormControl<string>; }>;
  discountPopUp: boolean;
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
  public narrator: any;
  public editor: any;
  public singleTAlist: any;
  public subtitlearray: any;
  public subtitle: string;
  public copyfor: boolean = false;
  public CopyString: string;
  public url: string;
  public narratorloop: any = [];
  AuthorCount = [];
  TitleCount = [];
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
    this.Aroute.params.subscribe(params => {
      this.bookid = params['id'];
      localStorage.setItem('bookid', JSON.stringify(this.bookid));
    });
    let id = localStorage.getItem('bookid');
    let Id = JSON.parse(id);
    this.GetBookDetails(Id);
  }
  GetBookDetails(id: number) {
    this.productservice.getBookDetails(id).subscribe(response => {
      if (response) {
        this.book = new BookEdit();
        this.book = response;
        this.categories = this.book.categories.map(x => x.name);
        this.subcategories = this.book.subCategories.map(x => x.name);
        this.compiler = this.book.compiler.map(x => x.name);
        this.illustrator = this.book.illustrator.map(x => x.name);
        this.translator = this.book.translator.map(x => x.name);
        this.editor = this.book.editor.map(x => x.name);
        this.subtitle = this.book.title.find(obj => obj.type === 'SUBTITLE')?.name;
        this.handleTitleAuthorTypes();
        this.url = 'https://apps.dcbooks.com/uploads/image/' + this.book?.audioBook?.cover;
        if (this.book?.isTranslation) {
          this.translationTitle = this.book.translationTitle;
        }
      }
    });
  }

  handleTitleAuthorTypes() {
    if (this.book?.titleType == 'SINGLE' && this.book?.authorType == 'SINGLE') {
      this.singleTAlist = this.book.title.filter(obj => obj.type == 'BOOK');
      this.setSingleAuthorDetails();
    } else if (this.book?.titleType == 'MULTIPLE') {
      if (this.book?.authorType == 'MULTIPLE') {
        this.handleMultipleTitlesMultipleAuthors();
      } else {
        this.handleMultipleTitlesSingleAuthor();
      }
    } else if (this.book?.titleType == 'SINGLE' && this.book?.authorType == 'MULTIPLE') {
      this.handleSingleTitleMultipleAuthors();
    }
  }

  setSingleAuthorDetails() {
    this.titleAuthorRoyalty = this.singleTAlist[0]?.titleAuthorRoyalty[0];
    this.mainTitle = this.singleTAlist[0]?.name;
    this.singleTA = true;
    this.narrator = this.singleTAlist[0]?.narrator.map(x => x.name);
  }

  handleMultipleTitlesMultipleAuthors() {
    this.multipleTA = true;
    this.multipleTAlist = this.book?.title.filter(obj => obj.type == 'CHAPTER');
    this.titleAuthorRoyalty = this.book?.title.filter(obj => obj.type == 'BOOK');
    this.mainTitle = this.titleAuthorRoyalty[0]?.name;
    this.count = this.multipleTAlist.length;
    this.narratorloop = this.multipleTAlist.map(item =>
      item.narrator.map(n => n.name)
    );
  }

  handleMultipleTitlesSingleAuthor() {
    this.MtitleSauthor = true;
    this.multipleTitlelist = this.book?.title.filter(obj => obj.type == 'CHAPTER');
    this.titleAuthorRoyalty = this.book?.title.filter(obj => obj.type == 'BOOK');
    this.MultipletitleAuthorRoyalty = this.titleAuthorRoyalty.titleAuthorRoyalty;
    this.mainTitle = this.titleAuthorRoyalty[0]?.name;
    this.TitleCount = this.multipleTitlelist;
    this.count = this.multipleTitlelist.length;
    this.narratorloop = this.multipleTitlelist.map(item =>
      item.narrator.map(n => n.name)
    );
  }

  handleSingleTitleMultipleAuthors() {
    this.StitleMauthor = true;
    this.multipleAuthorlist = this.book.title.filter(obj => obj.type == 'BOOK');
    this.MultipletitleAuthorRoyalty = this.multipleAuthorlist[0]?.titleAuthorRoyalty;
    this.mainTitle = this.multipleAuthorlist[0]?.name;
    this.AuthorCount = this.multipleAuthorlist[0]?.titleAuthorRoyalty;
    this.count = this.multipleAuthorlist[0]?.titleAuthorRoyalty.length;
  }


  AddReview() {
    this.display = true;
  }
  Cancel() {
    this.display = false;;
  }
  NewReview() {

  }
  Copy() {
    this.copyfor = true;
  }
  OK() {
    this.copyfor = false;
  }
  CreateCopy(data) {
    this.book.bookType = 'AUDIO';
    if (data == 'PRINT') {
      this.productservice.bookExist(this.mainTitle, 'PRINT').subscribe({
        next: (response) => {
          if (response.status == 200) {
            this.messageService.add({ severity: 'error', summary: response.status, detail: response.message });
            this.copyfor = false;
          }
          else if (response.status == 204) {
            this.router.navigate([`apps/product/printedit`, this.book]);
          }

        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: err.status, detail: err.message });
          this.copyfor = false;
        }
      });

    }
    else if (data == 'EBOOK') {
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

  }
  onTabChange(e) {
    this.index = e;
  }
  Edit() {
    this.book.bookType = 'AUDIO';
    this.router.navigate([`apps/product/audioedit`, this.book]);
  }
  GoBack() {
    this.router.navigate([`apps/product/productlist`]);
  }
  get getControl() {
    return this.AddForm.controls;
  }
  GotoAudioUpload() {
    this.book.bookType = 'AUDIO';
    this.router.navigate([`apps/product/audio-Upload`, this.book]);
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
