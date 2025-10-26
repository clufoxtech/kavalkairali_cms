import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Table } from 'primeng/table';
import { BookDetails } from '../../product/productModel/bookdetails';
import { UserDetails } from '../../users/UserModels/UserDetailModel';
import { UserserviceService } from '../../users/userservice.service';
import { RecommendationService } from '../recommendation.service';

@Component({
  providers: [ConfirmationService,MessageService],
  selector: 'app-recommendationlist',
  templateUrl: './recommendationlist.component.html',
  styleUrls: ['./recommendationlist.component.scss']
})
export class RecommendationlistComponent implements OnInit {
  isLoading: boolean = false;
  display: boolean = false;
  edit: boolean = false;
  user: boolean = false;
  searchInputControl: UntypedFormControl = new UntypedFormControl();
  @ViewChild('ops',{static:true}) ops: OverlayPanel;
  @ViewChild('om',{static:true}) om: OverlayPanel;
  @ViewChild('al',{static:true}) al: OverlayPanel;
  constructor(public recommendationService:RecommendationService,private userService:UserserviceService,private router: Router,private confirmationService: ConfirmationService) { }
  public TrendingPrintList :Array<BookDetails>;
  public BestsellerPrintList :Array<BookDetails>;
  public NewReleasesPrintList :Array<BookDetails>;
  public RecommendedPrintList :Array<BookDetails>;
  public TrendingEBookList :Array<BookDetails>;
  public BestsellerEBookList :Array<BookDetails>;
  public NewReleasesEBookList :Array<BookDetails>;
  public RecommendedEBookList :Array<BookDetails>;
  public TrendingAudioList :Array<BookDetails>;
  public BestsellerAudioList :Array<BookDetails>;
  public NewReleasesAudioList :Array<BookDetails>;
  public RecommendedAudioList :Array<BookDetails>;
  public product:UserDetails;
  public bookDetail:BookDetails;
  public archiveuser:UserDetails;
  msgs: Message[] = [];
  public status:string;
  public bookType:string;
  public recommendationType:string;
  public Mainindex:number;
  public index:number;
  public data:any[];
  public currentPosition:number;
  ngOnInit(): void {
    this.Mainindex=0;
    this.index=0;
    //this.data=[{'title':'Bhumiyude Avakashikal','version':'Audio','author':'Basheer','edition':2,'volume':1,'productCode':'HP4785','isbn':'47858569','language':'Malayalam','mrp':'540 INR','revenue':'100 INR','stock':20,'sales':420,'noOfReaders':325,'totalHours':536}]
 this.GetAll();
  }
  GetAll(){
    this.GetPrintTrending();
    this.GetPrintBestseller();
    this.GetPrintNewReleases();
    this.GetPrintRecommended();
    this.GetEBookTrending();
    this.GetEBookBestseller();
    this.GetEBookNewReleases();
    this.GetEBookRecommended();
    this.GetAudioTrending();
    this.GetAudioBestseller();
    this.GetAudioNewReleases();
    this.GetAudioRecommended();
  }
  GetPrintTrending(){
    this.recommendationService.getRecommendation('PRINT','TRENDING').subscribe((response)=>{
     
        this.TrendingPrintList= new Array<BookDetails>();
        this.TrendingPrintList=response.content;
        console.log(this.TrendingPrintList);
     
       })
  }
 
  GetPrintBestseller(){
    this.recommendationService.getRecommendation('PRINT','BESTSELLER').subscribe((response)=>{
     
        this.BestsellerPrintList= new Array<BookDetails>();
        this.BestsellerPrintList=response.content;
        console.log(this.BestsellerPrintList);
     
       })
  }
  GetPrintNewReleases(){
    this.recommendationService.getRecommendation('PRINT','NEWRELEASES').subscribe((response)=>{
     
        this.NewReleasesPrintList= new Array<BookDetails>();
        this.NewReleasesPrintList=response.content;
        console.log(this.NewReleasesPrintList);
     
       })
  }
  GetPrintRecommended(){
    this.recommendationService.getRecommendation('PRINT','RECOMMENDED').subscribe((response)=>{
        this.RecommendedPrintList= new Array<BookDetails>();
        this.RecommendedPrintList=response.content;
        console.log(this.RecommendedPrintList);
     
       })
  }
  
  GetEBookTrending(){
    this.recommendationService.getRecommendation('EBOOK','TRENDING').subscribe((response)=>{
     
        this.TrendingEBookList= new Array<BookDetails>();
        this.TrendingEBookList=response.content;
        console.log(this.TrendingEBookList);
     
       })
  }
 
  GetEBookBestseller(){
    this.recommendationService.getRecommendation('EBOOK','BESTSELLER').subscribe((response)=>{
     
        this.BestsellerEBookList= new Array<BookDetails>();
        this.BestsellerEBookList=response.content;
        console.log(this.BestsellerEBookList);
     
       })
  }
  GetEBookRecommended(){
    this.recommendationService.getRecommendation('EBOOK','RECOMMENDED').subscribe((response)=>{
     
        this.RecommendedEBookList= new Array<BookDetails>();
        this.RecommendedEBookList=response.content;
        console.log(this.RecommendedEBookList);
     
       })
  }
  GetEBookNewReleases(){
    this.recommendationService.getRecommendation('EBOOK','NEWRELEASES').subscribe((response)=>{
     
        this.NewReleasesEBookList= new Array<BookDetails>();
        this.NewReleasesEBookList=response.content;
        console.log(this.NewReleasesEBookList);
     
       })
  }
  GetAudioTrending(){
    this.recommendationService.getRecommendation('AUDIO','TRENDING').subscribe((response)=>{
     
        this.TrendingAudioList= new Array<BookDetails>();
        this.TrendingAudioList=response.content;
        console.log(this.TrendingAudioList);
     
       })
  }
 
  GetAudioBestseller(){
    this.recommendationService.getRecommendation('AUDIO','BESTSELLER').subscribe((response)=>{
     
        this.BestsellerAudioList= new Array<BookDetails>();
        this.BestsellerAudioList=response.content;
        console.log(this.BestsellerAudioList);
     
       })
  }
  GetAudioNewReleases(){
    this.recommendationService.getRecommendation('AUDIO','NEWRELEASES').subscribe((response)=>{
     
        this.NewReleasesAudioList= new Array<BookDetails>();
        this.NewReleasesAudioList=response.content;
        console.log(this.NewReleasesAudioList);
     
       })
  } 
  GetAudioRecommended(){
    this.recommendationService.getRecommendation('AUDIO','RECOMMENDED').subscribe((response)=>{
     
        this.RecommendedAudioList= new Array<BookDetails>();
        this.RecommendedAudioList=response.content;
        console.log(this.RecommendedAudioList);
     
       })
  } 
  clear(table: Table) {
    table.clear();
}
handleMainTab(e){
this.Mainindex= e.index;
this.index=0;
}
handleIndex(e){
  this.index= e.index;
  }

show(event,bookdetail,position,recommendationType){
  this.bookDetail=bookdetail;
  this.currentPosition=position;
  this.recommendationType=recommendationType;
  this.ops.show(event);
}
List(bookdetails){
  this.bookDetail=bookdetails;
  this.ops.hide();
this.display=true;
}

AddPosition(){
  this.recommendationService.addRecommendationPosition(this.bookDetail,this.currentPosition,this.recommendationType).subscribe({
    next: (response)=>{
    this.display=false; 
   this.GetAll();   
},
error: (err) => {
 //this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
} 
})
}

RemoveRecommendation(bookdetails){
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
      this.recommendationService.removeRecommendation(bookdetails,this.recommendationType).subscribe((response)=>{
        //this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
        this.GetAll(); 
       
         })
    },
    reject: () => {
       //this.messageService.add({severity:'error', summary:err.error.status, detail:err.error.error});
  }
}); 
}




NewRecommendation(){
  if(this.index==0 ){
    this.recommendationType='TRENDING';
  }
  else if(this.index==1 ){
    this.recommendationType='BESTSELLER';
  }
  else if(this.index==2 ){
    this.recommendationType='NEWRELEASES';
  }
  else if(this.index==3){
    this.recommendationType='RECOMMENDED';
  }
 
  if(this.Mainindex==0){
    this.bookType='PRINT';
  }
  else if(this.Mainindex==1){
    this.bookType='EBOOK';
  }
  else if(this.Mainindex==2){
    this.bookType='AUDIO';
  }
  this.router.navigate([`apps/Recommendation/addrecommendation/`,this.bookType,this.recommendationType]);
}
}
