export class GalleryList{
        public id:number; 
        public title:string;
        public youtubeUrl:string;
        public imageId:any[];
        public creationTimestamp:Date;
        public _links:self[];
        public type:number;
}
export class self{
    public href:string;
}