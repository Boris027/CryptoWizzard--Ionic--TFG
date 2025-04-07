import { Model } from "./base.model";

export interface User extends Model{
    username:string,
    email:string,
    gender:string
    token:string
}

export interface BasicUser extends Model{
    username:string,
    gender:string
    email:string,
    img:string
}