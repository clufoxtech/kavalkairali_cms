import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProductService } from '../product.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserserviceService } from '../../users/userservice.service';
import { Table } from 'primeng/table';

@Component({
  providers:[MessageService],
  selector: 'app-massupload',
  templateUrl: './massupload.component.html',
  styleUrls: ['./massupload.component.scss']
})
export class MassuploadComponent implements OnInit {
  loading = false;
  selectedCover?: FileList;
  selectedEpub?: FileList;
  MassForm!: FormGroup;
  fileInfos:any[]=[];
  errorList:string[]=[];
  array1:string[]=[];
  array2:string[]=[];
  statuses=[];
  public completedCount=0;
  public faliedCount=0;
  @ViewChild('dt1') table: Table;
  constructor(private messageService: MessageService,public userservice:UserserviceService,public uploadService:ProductService,public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.MassForm = this.formBuilder.group({
      cover: ['', [Validators.required]],
      epub: ['', [Validators.required]],
      
    })
    this.statuses=[
      {label:'Completed',value:'Completed'},
      {label:'Failed',value:'Failed'}]
      this.completedCount=0;
      this.faliedCount=0;
      if(sessionStorage.getItem('list')){
        this.fileInfos= JSON.parse(sessionStorage.getItem('list'))
      }
  }
  
  selectCover(event){
    this.fileInfos=[];
    this.errorList=[];
    this.selectedCover = event.target.files;
    if(this.selectedCover.length>50){
      this.messageService.add({severity:'error', summary:'Upload Limits', detail:'50 files can be uploaded at a time'});  
    }
  }
  selectEpub(event){
    this.fileInfos=[];
    this.errorList=[];
    this.selectedEpub = event.target.files;
    if(this.selectedEpub.length>50){
      this.messageService.add({severity:'error', summary:'Upload Limits', detail:'50 files can be uploaded at a time'});  
    }
  }
  Submit(){ 
    this.fileInfos=[];
    if (this.MassForm.valid) {
      if (this.selectedCover && this.selectedEpub) {
        this.loading=true;
       this.NonIntersectValue().then(() => {
        for (let i = 0; i < this.selectedCover.length; i++) {
          let covername = this.selectedCover[i].name.split('.');
            let CoverWithoutExtension = covername.slice(0, -1).join('.');
          for (let j = 0; j < this.selectedEpub.length; j++) { 
            let epubname = this.selectedEpub[j].name.split('.');
            let EpubWithoutExtension = epubname.slice(0, -1).join('.');
            if(CoverWithoutExtension==EpubWithoutExtension) {
              this.upload(i, this.selectedCover[i],this.selectedEpub[j]);
            }
          }
         
        }
        console.log('list1',this.fileInfos)
        const arrayString = JSON.stringify(this.fileInfos);
        console.log('list',arrayString)
       sessionStorage.setItem('list',JSON.stringify(this.fileInfos))
       }) 
        
      }
      
    }
    else {
      this.validateAllFields(this.MassForm); 
  }   
        this.loading=false;
        // this.clear();

  }
  
 
  NonIntersectValue(): Promise<any>{
   
    if (this.selectedCover && this.selectedEpub) {
      return new Promise<any[]>((resolve, reject) => {
    for (let k = 0; k < this.selectedEpub.length; k++) { 
      let epubname = this.selectedEpub[k].name.split('.');
      let EpubWithoutExtension = epubname.slice(0, -1).join('.'); 
     this.array1.push(EpubWithoutExtension)
    }
    for (let l = 0; l < this.selectedCover.length; l++) { 
      let covername = this.selectedCover[l].name.split('.');
      let CoverWithoutExtension = covername.slice(0, -1).join('.'); 
     this.array2.push(CoverWithoutExtension)
    }
    const nonIntersectValues = Array.from(new Set(this.array1.filter(value => !this.array2.includes(value))
    .concat(this.array2.filter(value => !this.array1.includes(value)))));
    for (let i = 0; i < nonIntersectValues.length; i++) {
      this.fileInfos.push({'name':nonIntersectValues[i],'status':'Failed'})
    }
    resolve(this.fileInfos);
  });
  }
  
  }
  upload(idx: number, cover: File,epub:File): void {
    let covername = cover.name.split('.');
    let CoverWithoutExtension = covername.slice(0, -1).join('.');
    this.uploadService.massUpload(cover,epub).subscribe({
      next:(response)=>{
        console.log(response)
        this.fileInfos.push({'name':CoverWithoutExtension,'status':'Completed'})
      },
      error: (err) => {
        this.fileInfos.push({'name':CoverWithoutExtension,'status':'Failed'})
      }
    });
    
    this.completedCount=this.fileInfos.filter(item => item.status === 'Completed').length;
    this.faliedCount=this.fileInfos.filter(item => item.status === 'Failed').length;  
    console.log('complete',this.completedCount)
  }
  clear(){
    this.MassForm.reset();
    this.fileInfos=[];
    this.errorList=[];
    this.selectedEpub=new FileList();
    this.selectedCover=new FileList();
    this.completedCount=0;
    this.faliedCount=0;
  }
  export(){
    import("xlsx").then(xlsx => {
      const filteredData=this.table.filteredValue;
      const worksheet = xlsx.utils.json_to_sheet(filteredData?filteredData:this.fileInfos);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.userservice.saveAsExcelFile(excelBuffer, "BulkUploadList");
  });
  }
  get getControl(){
    return this.MassForm.controls;
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


