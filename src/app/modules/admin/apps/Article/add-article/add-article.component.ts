import { BindingType } from '@angular/compiler';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Language } from 'highlight.js';
import { MessageService } from 'primeng/api';
import { ArticleService } from '../articleService.services';
import { stubArray } from 'lodash';
import { environment } from 'environments/environment';
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
  articleId: any;
  titleEdit: any;
  authorEdit: any;
  descEdit: any;

  constructor(public formBuilder: FormBuilder, private articleService: ArticleService,
    private messageService: MessageService,
    private router: Router, private aroute: ActivatedRoute) {

  }

  ngOnInit() {
        this.aroute.params.subscribe(params => {
      this.articleId=params['id'];
      if(this.articleId){
      this.titleEdit=params['title'];
      this.authorEdit=params['author'];
      this.descEdit=params['description'];
      const coverImage=params['coverId'];
      this.url=environment.baseUrl+'/uploads/image/'+coverImage;
    console.log(this.url);
      }
    });
    this.AddForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      summary: ['', [Validators.required]],
      author: ['', [Validators.required]],
    })
  }
  AddArticle() {
    console.log(this.AddForm);
    if(this.AddForm.invalid){
      this.AddForm.markAllAsTouched();
      return;
    }
 if(this.articleId){
  
      const title = this.AddForm.get('title').value;
      const desc = this.AddForm.get('summary').value;
      const author = this.AddForm.get('author').value;
  this.articleService.editArticles(this.articleId,title,desc,author).subscribe((response)=>{
    console.log(response);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Article Edited Successfully' });
    this.router.navigate([`apps/Articles/articles`]);
  },(error)=>{
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to edit Article' });
  });
  return;
    

 }
    this.articleService.addCoverImage(this.selectedFiles[0]).subscribe((response) => {
      console.log(response);
      const selectedCover = response.publicId;
      const title = this.AddForm.get('title').value;
      const desc = this.AddForm.get('summary').value;
      const author = this.AddForm.get('author').value;
      this.articleService.addArticles(title, desc, author, selectedCover).subscribe((response) => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Article Added Successfully' });
        this.router.navigate([`apps/Articles/articles`]);
      }, (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add Article' });
      });

    }, (error) => {
      console.log(error);
    });


    if (this.AddForm.invalid) {
      this.AddForm.markAllAsTouched();
      return;
    }
  }

  GoBack() {
    this.AddForm.reset();
    this.router.navigate([`apps/Articles/articles`]);
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

  get getControl() {
    return this.AddForm.controls;
  }
}

