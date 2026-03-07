import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { BlockedReason } from '../../productModel/blockedreason';
import { ProductService } from '../../product.service';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'app-blocked-reasons',
  templateUrl: './blocked-reasons.component.html',
  styleUrls: ['./blocked-reasons.component.scss']
})
export class BlockedReasonsComponent implements OnInit {

  @ViewChild('op',{static:true}) op: OverlayPanel;
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  public blockreason :Array<BlockedReason>;
  display: boolean = false;
  showEdit:boolean=false;
  public product:BlockedReason;
  AddForm!: FormGroup;
  EditForm!:FormGroup;
  totalRecords: number;
  constructor(private router: Router,public formBuilder: FormBuilder,private messageService: MessageService,private confirmationService: ConfirmationService,private productService:ProductService) { }

  ngOnInit(): void {
    this.product=new BlockedReason();
    this.AddForm = this.formBuilder.group({
      reason: ['', [Validators.required]],
      
    })
    this.EditForm = this.formBuilder.group({
      editreason: ['', [Validators.required]],
      
    })
   this.GetAllBlockReason();
  }
  GetAllBlockReason(){
    this.productService.getBlockReason().subscribe((response)=>{
      this.blockreason=response._embedded.blockReasons;
      this.totalRecords=this.blockreason.length;
       })  
  }
  AddReason(){
    this.display=true;
 
  }
  addBlockedReason(){
        if (this.AddForm.valid) {
      this.product= new BlockedReason();
      this.product.name=this.AddForm.controls['reason'].value;
    this.productService.addReason(this.product.name).subscribe({
      next: (response)=>{
      // if(response.sTATUS=='SUCCESS'){
        this.display=false;
        this.GetAllBlockReason();
        // this.toastr.success('Successfully Added!', 'Success');
        // }
        // else{
        //  this.toastr.error(response.mSG,'Error')
        // }
     },
     error: (err) => {
      this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
     }
   })
      }
       else {
        this.validateAllFields(this.AddForm); 
    } 
  }
  show(event,product){
    this.op.show(event);
    this.product=product;
  }
  Cancel(){
    this.AddForm.reset();
    this.display=false;;
  }
  CancelEdit(){
    this.showEdit=false;
  }
  EditReason(product){
  this.product=new BlockedReason();
  this.product=product;
  console.log(this.product)
this.showEdit=true;
  }
  Delete(data){
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.productService.deleteblockedReason(data.id).subscribe(
          {
            next: (response)=>{
              this.GetAllBlockReason();  
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
  EditedReason(){
    if (this.EditForm.valid) {
      var product=new BlockedReason();
      product.id=this.product.id
      product.name=this.EditForm.controls['editreason'].value;
    this.productService.editblockedReason(product).subscribe(
      {
        next: (response)=>{
          this.GetAllBlockReason(); 
          this.CancelEdit(); 
    },
    error: (err) => {
      this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
     //this.Cancel();
    }
   })
  }
  else {
   this.validateAllFields(this.AddForm); 
} 
  }
  get getControl(){
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
