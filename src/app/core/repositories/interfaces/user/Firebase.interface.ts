import { User } from "src/app/core/models/User.model";
import { IUserbaseRepositoy } from "./User-base.interface";

export interface IUserFirebaseRepository extends IUserbaseRepositoy<User>{
}