export class DepartmentList{
    public id:number;
    public name:string;
    public date:Date;
    public member:string;
    public creationTimestamp:Date;
    public description:string;
    public _links:self[];
}
export class self{
    public href:string;
}