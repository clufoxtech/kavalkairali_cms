import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BookEdit } from '../productModel/BookEdit';
import { ProductService } from '../product.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AudioTitles } from '../productModel/audioUpload';

@Component({
  providers: [MessageService],
  selector: 'app-audio-upload',
  templateUrl: './audio-upload.component.html',
  styleUrls: ['./audio-upload.component.scss']
})
export class AudioUploadComponent implements OnInit {

  constructor(private router: Router,private messageService: MessageService,public formBuilder: FormBuilder,private Aroute: ActivatedRoute, public productservice:ProductService) { }
  public book:AudioTitles;
  public bookid:number;
  public selectedAudioArray: { id: number, fileId: any }[] = [];
  public updatedDataArray: { id: number, fileId: any }[] = [];
  AddForm!: FormGroup;
  public ChapterType:string;
  ngOnInit(): void {
    this.book= new AudioTitles();
    this.selectedAudioArray= [];
    this.updatedDataArray=[];
     this.Aroute.params.subscribe(params => {
       this.bookid=params['id'];
       localStorage.setItem('bookid',JSON.stringify(this.bookid));
     });
     this.GetBookDetails(this.bookid);
     this.AddForm = this.formBuilder.group({
     })
  }
  GetBookDetails(id: number) {
    this.productservice.getAudioUploadTitles(id).subscribe(response => {
      if (response) {
        this.book= new AudioTitles();
        this.book = response;
        this.book.titles.forEach(x=>{
          this.selectedAudioArray.push({'id':x.id,'fileId': x.audioBookFileId})
        })
        this.ChapterType=this.book.titles[0].type;
      }
    })
  }
  
  onAudioChanged(event:any,id:number) {
    const audioFile = event.target.files;
  if (audioFile.length > 0) {
    const fileId = audioFile[0]; // Assuming fileId represents the uploaded file itself, change this as per your requirement
    const existingIndex = this.selectedAudioArray.findIndex(item => item.id === id);
    if (existingIndex !== -1) {
      // If ID already exists, update the fileId
      this.selectedAudioArray[existingIndex].fileId = fileId;
    } else {
      // If ID does not exist, push a new entry
      this.selectedAudioArray.push({ 'id': id, 'fileId': fileId });
    }
    document.getElementById(`file-span-${id}`).style.display = 'none';
  }
  } 

 
  
  UploadAudio() {
    this.updatedDataArray = [];
  
    for (let i = 0; i < this.selectedAudioArray.length; i++) {
      const audioEntry = this.selectedAudioArray[i];
  
      // Check if audioEntry.fileId is a string representing the file ID
      if (typeof audioEntry.fileId === 'string') {
        // If fileId is a string, assume it's already uploaded and push the audioEntry into the updatedDataArray
        this.updatedDataArray.push(audioEntry);
        // If all entries are updated, call the method to submit data to API
        if (this.updatedDataArray.length === this.selectedAudioArray.length) {
          this.submitAudioData();
        }
      } else {
        // If fileId is not a string, assume it's a File object and proceed with file upload
        this.productservice.addBookFile(audioEntry.fileId).subscribe({
          next: (response: any) => {
            audioEntry.fileId = response.publicId;
            // Push the updated audioEntry into the array
            this.updatedDataArray.push(audioEntry);
            // If all entries are updated, call the method to submit data to API
            if (this.updatedDataArray.length === this.selectedAudioArray.length) {
              this.submitAudioData();
            }
          },
          error: (err) => {
            console.error('Error uploading file:', err);
            // Handle error if needed
          }
        });
      }
    }
  }
  
  submitAudioData() {
    // Submit data to API
    this.productservice.uploadAudio(this.updatedDataArray).subscribe({
      next: (response: any) => {
        this.messageService.add({ severity: 'success', summary: response.status, detail: response.error });
        // location.reload();
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: err.error.status, detail: err.error.error });
      }
    });
  }
  
  
  GoBack(){
    this.router.navigate([`apps/product/productlist`]);  
  }
  
}
