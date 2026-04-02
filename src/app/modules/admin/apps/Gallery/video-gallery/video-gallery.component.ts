import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { GalleryList } from '../galleryModel';
import { Router } from '@angular/router';
import { GalleryService } from '../galleryService.service';
import { environment } from 'environments/environment';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'app-video-gallery',
  templateUrl: './video-gallery.component.html',
  styleUrls: ['./video-gallery.component.scss']
})
export class VideoGalleryComponent implements OnInit {
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
  imageScroll: boolean;
  images: any[];
  constructor(public formBuilder: FormBuilder,private messageService: MessageService, private galleryService: GalleryService,
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
    this.galleryService.getAllVideoGallery().subscribe((response)=>{
      this.data=response._embedded.videoGalleries;
       })  
  }
  NewGallery(){
    this.router.navigate(['apps/Gallery/add-gallery',{type:2}]);
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
this.router.navigate(['apps/Gallery/add-gallery', product]);
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
      this.galleryService.deleteVideoGallery(id).subscribe(
        {
          next: (response)=>{
            this.GetAllGallery();  
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


ShowUser(product){
  this.product=product;
  console.log(this.product);
  this.images = this.product.imageId;
  this.imageScroll=true;

  //this.populateGallery();
}
populateGallery() {
  console.log(this.product);
  const images = this.product.imageId;
  console.log(images);
  const galleryContainer = document.getElementById('image-gallery'); // Your gallery container ID
console.log(galleryContainer);
  images.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = environment.baseUrl+'upload/images/'+image; // Assuming 'url' is the image URL in your API response
    imgElement.alt = 'Gallery image'; // Add alt text for accessibility
    galleryContainer.appendChild(imgElement);
  });
}
}
