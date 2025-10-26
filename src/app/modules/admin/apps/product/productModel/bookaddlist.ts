export class  booklist {
    public id:number;
    public title: string;
    public subtitle: string;
    public type: string;
    public author:number;
    public edition: number;
    public laungage:number;
    public productCode:string;
    public expirydate:Date;
    public royalyPercent:number;
    public volume:number;
    public isbnCode:number;
    public isbnFormat:string;
    public summary:string;
    public authorType:string;
    public titleType:string;
    public superKey:string;
    public isTranslation:boolean;
    public englishTitle:string;
    public originalTitle:string;
    public originalLanguage:number;
    public CountryOfOrigin:number;
    public publisher:number;
    public editor:number;
    public translator:any;
    public illustrator:any;
    public compiler:any;
    public categories:any;
    public subCategories:any;
    public imprint:number;
    public moq:number;
    public isMoq:boolean;
    public moqDuration:string;
    public mrp:number;
    public taxPercent:number;
    public storePrice:number;
    public discountPercent:number;
    public readTime:string;
    public listenTime:string;
    public copyrightType:string;
    public copyright:number;
    public narrator:any;
    public narratorlist:any;
    public chapter:Array<chapter>;
    public cover:any;
    public ebookFile:any;
    public audioFile:any;S
    public MTSA:Array<any>;
    public STMA:Array<any>;
    public MTMA:Array<any>;
    //public chapter:Array<chapter>;
  }
  export class chapter{
    public royalyPercent:number;
    public author:number;
    public title:number;
    public narrator:any;
  }