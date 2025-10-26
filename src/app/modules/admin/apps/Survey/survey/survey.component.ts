import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { SurveyDetails } from '../surveyModel';

@Component({
  providers: [ConfirmationService, MessageService],
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  isLoading: boolean = false;
  display: boolean = false;
  edit: boolean = false;
  user: boolean = false;
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op', { static: true }) op: OverlayPanel;
  @ViewChild('op', { static: true }) ele: ElementRef;
  noSpecial: RegExp = /[A-Za-zÀ-ȕ ]/;
  constructor(public formBuilder: FormBuilder, private messageService: MessageService, private router: Router, private confirmationService: ConfirmationService) { }
  public data = [];
  public product: SurveyDetails;
  AddForm!: FormGroup;
  ngOnInit(): void {
    this.user = false;
    this.AddForm = this.formBuilder.group({
      surveyname: ['', [Validators.required, Validators.maxLength(50)]],
      desc: ['', [Validators.required, Validators.maxLength(100)]],

    })
    this.GetAllSurvey();

  }
  GetAllSurvey() {
    // this.userService.getAllSurvey().subscribe((response)=>{
    //   this.data=response._embedded.survey;
    //    })  
  }
  NewSurvey() {

    this.router.navigate(['apps/Survey/addSurvey']);
  }
  clear(table: Table) {
    table.clear();
  }
  Cancel() {
    this.display = false;
    this.GetAllSurvey();
  }
  show(event, product) {
    this.product = product;
    this.op.show(event);
  }
  Edit(product) {
    this.product = product;
    this.edit = true;
    this.op.hide();
  }
  EditCancel(edit: any) {
    this.edit = edit;
    this.GetAllSurvey();
  }
  Delete(id) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        //   this.userService.deleteSurvey(id).subscribe(
        //     {
        //       next: (response)=>{
        //         this.GetAllSurvey();  
        //   },
        //   error: (err) => {
        //     this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
        //    //this.Cancel();
        //   }
        //  })

      },
      reject: () => {
        //Actual logic to perform a confirmation
      }
    });
  }
  AddSurvey() {
    if (this.AddForm.valid) {
      this.product = new SurveyDetails();
      this.product.name = this.AddForm.controls['surveyname'].value;
      this.product.description = this.AddForm.controls['desc'].value;
      //   this.userService.addSurvey(this.product.name,this.product.description).subscribe({
      //     next: (response)=>{
      //     // if(response.sTATUS=='SUCCESS'){
      //       this.GetAllSurvey();
      //       this.display=false;

      //    },
      //    error: (err) => {
      //     this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
      //    }
      //  })
    }
    else {
      this.validateAllFields(this.AddForm);
    }
  }
  get getControl() {
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
