import { BindingType } from '@angular/compiler';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Language } from 'highlight.js';
import { MessageService } from 'primeng/api';

@Component({
  providers: [MessageService],
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.scss']
})
export class AddSurveyComponent implements OnInit {
  AddForm!: FormGroup;
  selectedFiles: any;
  imagePath: any;
  url: string | ArrayBuffer;
  inputFields: string[] = [''];

  constructor(public formBuilder: FormBuilder, private messageService: MessageService, private router: Router) {

  }

  ngOnInit() {
    this.AddForm = this.formBuilder.group({
      surveyName: ['', []],
      question: ['', []],
      time: ['', []],
    });
  }
  AddSurvey() {

  }
  addInput() {
    this.inputFields.push('');
    console.log(this.inputFields);
  }
  
  removeInput(index: number) {
    this.inputFields.splice(index, 1);
  }
  GoBack() {
    this.AddForm.reset();
    this.router.navigate([`apps/Survey/survey`]);
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

