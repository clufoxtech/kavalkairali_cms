import { BindingType } from '@angular/compiler';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import url from 'epubjs/types/utils/url';
import { Language } from 'highlight.js';
import { MessageService } from 'primeng/api';

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
public mindate:string;
public imagePath:string;
public url:any[]=[];
  selectedFiles: File[] = [];
public AutoSP:number=0;
public msg:string;
public authorCountOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
public  titleCountOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  previews: any[];
  constructor(public formBuilder: FormBuilder,private messageService: MessageService,private router: Router) {
    
   }
  
  ngOnInit(){
    this.AddForm = this.formBuilder.group({
      title: ['', [Validators.required]],
     
 
    }) 

}
onFileChanged(event:any) {
   const files: FileList = event.target.files;
     
 this.previews=[];
    if (files) {
      // Add newly selected files to the existing array
      for (let i = 0; i < files.length; i++) {
        const fileReader = new FileReader();
        this.selectedFiles.push(files[i]);
          fileReader.onload = (e: any) => {
      this.url.push(e.target.result);
      console.log(this.url);
    }
    fileReader.readAsDataURL(files[i] );
        
      }
      
      // Clear the input field to allow selecting the same files again if needed
      event.target.value = ''; 
    }
}
get getControl() {
  return this.AddForm.controls;
}

}