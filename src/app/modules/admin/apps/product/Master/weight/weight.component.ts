import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { ProductService } from '../../product.service';
import { Weight } from '../../productModel/weight';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss']
})
export class WeightComponent implements OnInit {
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('op',{static:true}) op: OverlayPanel;
  addForm!: FormGroup;
  editForm!: FormGroup;
  addDetails: Weight;
  display: boolean;
  editdisplay: boolean = false;
  weight: Weight[];
  product: Weight;
  editDetails: any;
isNotValid: boolean=false;
  //integerOnly: RegExp='^[0-9]*$';
  get getControl(){
    return this.addForm.controls;
  }
  get getEditControl(){
    return this.editForm.controls;
  }
  constructor(public formBuilder: FormBuilder,public weightservice: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.product=new Weight();
  this.addForm = this.formBuilder.group({
    addStartWeight: ['', [Validators.required]],
    addEndWeight: ['', [Validators.required]],
  });
  this.editForm = this.formBuilder.group({
    editStartWeight: ['', [Validators.required]],
    editEndWeight: ['', [Validators.required]],
  });
    this.getWeight();
  }

  getWeight(){
     this.weightservice.getweight().subscribe((response)=>{
      if(response._embedded.weights.length>0){
        this.weight= new Array<Weight>();
        this.weight=response._embedded.weights;
        console.log(this.weight);
      }
       }); 
  }
  newWeight(){
    this.display=true;
  }
  clear(table: Table) {
    table.clear();
}
  addweight(){
    console.log(this.addForm.valid);
    if (this.addForm.valid) {
      this.addDetails= new Weight();
      this.addDetails.startWeight=this.addForm.controls['addStartWeight'].value;
      this.addDetails.endWeight=this.addForm.controls['addEndWeight'].value;
      if(this.addDetails.startWeight>this.addDetails.endWeight)
      {
        this.isNotValid=true;
        console.log('start weight is greater than end weight');
      }
      else{
      console.log(this.addDetails);
    this.weightservice.addweight(this.addDetails).subscribe({
     next: (response)=>{
      // if(response.sTATUS=='SUCCESS'){
        this.getWeight();
        this.cancel();
     },
     error: (err) => {
      this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
      this.getWeight();
      this.cancel();
     }
   });
  }
      }
       else {
        this.validateAllFields(this.addForm);
    }
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
  show(event,product){
    this.product=product;
    this.op.show(event);
  }
  cancel(){
    this.display=false;
    this.addForm.reset();
  }
  edit(product){
    this.editdisplay=true;
   this.product=new Weight();
    this.product=product;
    this.op.hide();
    console.log(this.product);
  }
  editWeight(){
    if (this.editForm.valid) {
      this.editDetails= new Weight();
      this.editDetails.id=this.product.id;
      this.editDetails.startWeight=this.product.startWeight;
      this.editDetails.endWeight=this.product.endWeight;
      console.log(this.editDetails);
    this.weightservice.editweight(this.editDetails.id,this.editDetails).subscribe({
     next: (response)=>{
      // if(response.sTATUS=='SUCCESS'){
        this.getWeight();
        this.editCancel();
     },
     error: (err) => {
      this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
      this.getWeight();
      this.editCancel();
     }
   });
      }
       else {
        this.validateAllFields(this.editForm);
    }
  }

  editCancel(){
  this.editdisplay=false;
  }

  Delete(weight){
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
           this.weightservice.deleteweight(weight.id).subscribe({
            next: (response)=>{
              this.getWeight();
            },
            error: (err) => {
              this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
              this.op.hide();
              this.getWeight();
            }
          });
      },
      reject: () => {
        //Actual logic to perform a confirmation
    }
    });
  }


}
