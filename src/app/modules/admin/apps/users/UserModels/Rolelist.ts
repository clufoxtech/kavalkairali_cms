export class RoleList{
    public id:number;
    public type:string;
    public updateTimestamp:Date;
    public member:string;
    public creationTimestamp:Date;
    public description:string;
    public _links:self[];
}
export class self{
    public href:string;
}