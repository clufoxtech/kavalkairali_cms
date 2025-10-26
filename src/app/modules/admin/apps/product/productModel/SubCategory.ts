export class  SubCategory {
    public id:number;
    public  name: string;
    public  category: string;
    public _links:self[];
  }
  export class self{
      public href:string;
  }