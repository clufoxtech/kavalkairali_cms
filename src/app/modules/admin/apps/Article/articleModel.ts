export class ArticleList{
        public id:string;
        public title:string;
        public author:string;
        public creationTimestamp:Date;
        public description:string;
        public _links:self[];
}
export class self{
    public href:string;
}