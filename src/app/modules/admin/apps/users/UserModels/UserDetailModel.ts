export class UserDetails{
    public id:number;
    public name:string;
    public email:string;
    public phone:number;
    public roleName:string;
    public departmentName:string;
    public creationTimestamp:Date;
    public updateTimestamp:Date;
    public status:string;
    public password:string;
    public userName:string;
    public department:DepartmentDetails;
    public role:RoleDetails;
}
export class DepartmentDetails{
    public id:number;
    public name:string; 
    public _links:any;
}
export class RoleDetails{
    public id:number;
    public name:string;
    public _links:any; 
}