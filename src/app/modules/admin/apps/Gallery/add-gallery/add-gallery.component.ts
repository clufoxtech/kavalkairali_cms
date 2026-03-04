import { BindingType } from '@angular/compiler';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import url from 'epubjs/types/utils/url';
import { Language } from 'highlight.js';
import { MessageService } from 'primeng/api';
import { GalleryList } from '../galleryModel';
import { GalleryService } from '../galleryService.service';
import { forkJoin, Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  providers: [MessageService],
  selector: 'app-add-gallery',
  templateUrl: './add-gallery.component.html',
  styleUrls: ['./add-gallery.component.scss']
})
export class AddGalleryComponent implements OnInit {
  selectable = true;
  removable = true;
  AddForm!: FormGroup;
  AdditionalForm!: FormGroup;
  AuthorCount = [];
  TitleCount = [];
  SingleTitle: boolean = true;
  SingleAuthor: boolean = true;
  MultipleTA: boolean = false;
  SingleTA: boolean = false;
  Translation: string;
  MOQ: string;
  IsTranslation: boolean = false;
  IsMoq: boolean = false;
  thirdParty: boolean = false;
  public isbnlength: number = 0;
  public selectedcount: number;
  public BindingType: Array<BindingType>;
  public language: Array<Language>;
  public mindate: string;
  public imagePath: string;
  public url: any[] = [];
  selectedFiles: File[] = [];
  public AutoSP: number = 0;
  public msg: string;
  public authorCountOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public titleCountOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  previews: any[];
  imageIds: any[];
  gallery: any
  galleryId: any;
  product: GalleryList;
  galleryTitle: any;
  editImages: any[];
  noOfImages: any;
  constructor(public formBuilder: FormBuilder, private messageService: MessageService, private http: HttpClient,
    private galleryService: GalleryService,
    private router: Router, private aroute: ActivatedRoute) {

  }

  ngOnInit() {
    this.aroute.params.subscribe(params => {
      this.galleryId = params['id'];
      //this.galleryId= params['title'];
    });

    this.selectedFiles = [];
    this.url = [];
    this.editImages = [];
    console.log(this.galleryId);
    this.GetAllGallery(this.galleryId);
    this.previews = [];
    this.AddForm = this.formBuilder.group({
      title: ['', [Validators.required]],
    })

  }
  GetAllGallery(id: any) {
    this.galleryService.getAllGallery().subscribe((response) => {
      this.gallery = response._embedded.galleries.find(gallery => gallery.id == id);
      this.galleryTitle = this.gallery.title;
      console.log(this.gallery);
      this.noOfImages=this.gallery.imageId.length;
      for (const imageId of this.gallery.imageId) {
        this.url.push(environment.baseUrl + '/uploads/image/' + imageId);
        this.editImages.push(imageId);
      }
    })
  }
  onFileChanged(event: any) {
    const files: FileList = event.target.files;

    this.previews = [];
    if (files) {
      // Add newly selected files to the existing array
      for (let i = 0; i < files.length; i++) {
        const fileReader = new FileReader();
        this.selectedFiles.push(files[i]);
        fileReader.onload = (e: any) => {
          this.url.push(e.target.result);
          console.log(this.url);
        }
        fileReader.readAsDataURL(files[i]);

      }

      // Clear the input field to allow selecting the same files again if needed
      event.target.value = '';
    }
    this.noOfImages=this.selectedFiles.length + this.editImages.length;
    console.log(this.selectedFiles);
  }
  AddGallery() {
    this.imageIds = new Array();
    if(this.selectedFiles.length==0){
      this.SubmitGallery();
      return;
    }
    this.processItems().subscribe({
      next: (results: any[]) => {
        // All HTTP calls are complete, 'results' contains the data from each call
        console.log('All HTTP calls completed:', results);
        // Now you can perform your desired operations or return a value
        // For example, you could transform the results and return them
        this.transformResults(results);

        console.log(this.imageIds);
        this.SubmitGallery();

        // Return or emit processedValue
      },
      error: (error: any) => {
        console.error('Error during HTTP calls:', error);
      }
    });
  }
  processItems(): Observable<any[]> {
    const httpCalls: Observable<any>[] = [];
    console.log(this.selectedFiles);
    for (const item of this.selectedFiles) {
      // Assuming you have an API endpoint to call for each item
      const apiEndpoint = `/uploads/images`;
      var formData = new FormData();
      formData.append('file', item);
      httpCalls.push(this.http.post(environment.baseUrl + apiEndpoint, formData,));
    }
    return forkJoin(httpCalls); // Combine all Observables
  }
  transformResults(results: any[]): any {
    // Implement your logic to process the results
    this.imageIds = results.map(result => result.publicId);
  }
  SubmitGallery() {
    console.log(this.imageIds);
    console.log(this.editImages);
    console.log(this.AddForm);
    if (this.AddForm.valid) {
      this.product = new GalleryList();
      this.product.title = this.AddForm.controls['title'].value;
      this.product.imageId = [...this.editImages, ...this.imageIds];
      if (this.galleryId != null && this.galleryId != undefined) {
        this.galleryService.editGallery(this.galleryId, this.product.title, this.product.imageId).subscribe({
          next: (response) => {
            this.router.navigate(['apps/Gallery/gallery']);
          }
        });
      }
      else {
        this.galleryService.addGallery(this.product.imageId, this.product.title).subscribe({
          next: (response) => {
            this.router.navigate(['apps/Gallery/gallery']);

          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: err.error.status, detail: err.error.error });
          }
        })
      }
    }
  }

get getControl() {
  return this.AddForm.controls;
}
GoBack() {
  this.AddForm.reset();
  this.router.navigate([`apps/Gallery/gallery`]);
}
removeImage(url: any){
  console.log(url);
  const index = this.url.indexOf(url);
  if (index > -1) {
    this.url.splice(index, 1);
    this.editImages.splice(index, 1);
  }
  console.log(this.editImages);
  console.log(this.imageIds);
  this.noOfImages=this.imageIds?.length ?? 0  + this.editImages?.length;
}
}