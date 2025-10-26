import { BindingType } from '@angular/compiler';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Language } from 'highlight.js';
import { MessageService } from 'primeng/api';
@Component({
  providers: [MessageService],
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {
  AddForm!: FormGroup;
  selectedFiles: any;
  imagePath: any;
  url: string | ArrayBuffer;

  constructor(public formBuilder: FormBuilder, private messageService: MessageService, private router: Router) {

  }

  ngOnInit() {

  }
  AddArticle() {

  }

  GoBack() {
    this.AddForm.reset();
    this.router.navigate([`apps/Article/articles`]);
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
}

