import { Category } from "./Category";
import { Imprint } from "./Imprint";
import { Language } from "./language";
import { SubCategory } from "./SubCategory";

export class BookEdit{
    public id:number;
    public title: Array<TitleDetails>;
    public titleType:string;
    public authorType:string;
    public superKey:string;
    public language:Language;
    public categories:Array<Category>;
    public subCategories:Array<SubCategory>;
    public summary:string;
    public isTranslation:boolean;
    public translationTitle:TranslationTitle;
    public countryOfOrigin: { id: number, name: string };
    public publisher:any;
    public copyrightType:string;
    public copyright:any;
    public editor:any;
    public translator:any;
    public illustrator:any;
    public compiler:any;
    public imprint:Imprint;
    public edition: number;
    public volume: number;
    public ebook:ebook;
    public audiobook:ebook;
    public printBook:ebook;
    public status:string;
    public prePublish:any;
    public preBook:any;
    public audioBook:any;
    public narrator:any;
    public bookType:string;
  public subtitle: any;
  public isbnCode: any;
  public name: any;
  public expiryDate: any;
  public pages: any;
  public mrp: any;
  public taxPercent: any;
  public purchaseCost: any;
  public sellingPrice: any;
  public isMoq: any;
  public isbnFormat: any;
  public bindingType: any;
  public deliveryPeriod: any;
  public storePrice: any;
  public cover: any;
  public hsnCode: any;
  public limitation: any;
  public readhour: any;
  public readmin: any;
  public ebookFile: any;
    
  }
  export class TitleDetails{
    public id:number;
    public name:string;
    public type:string;
    public titleAuthorRoyalty:Array<titleAuthorRoyalty>;
    public audioBookRoyalty:number;
    public printBookRoyalty:number;
    public ebookRoyalty:number;
    public narrator:any;
  }
  export class ebook{
    public id:number;
    public moq:number;
    public isMoq:boolean;
    public moqDuration:string;
    public mrp:number;
    public taxPercent:number;
    public storePrice:number;
    public discountPercent:number;
    public isbnCode:number;
    public isbnFormat:string;
    public productCode:string;
    public expiryDate:Date;
    public readTime:string;
    public purchaseCost:number;
    public cover:any;
    public coverId:any;
    public fileId:any;
    public pages: any;
  }
  export class titleAuthorRoyalty{
    public id:number;
    public author:any;
    public audioBookRoyalty:number;
    public printBookRoyalty:number;
    public ebookRoyalty:number;
  }
export class TranslationTitle{
  public id:number;
  public englishTitle:string;
  public originalTitle:string;
  public originalLanguage:any;
}