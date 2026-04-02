export class GalleryList{
        public id:number; 
        public title:string;
        public youtubeUrl:string;
        public imageId:any[];
        public creationTimestamp:Date;
        public _links:self[];
}
export class self{
    public href:string;
}