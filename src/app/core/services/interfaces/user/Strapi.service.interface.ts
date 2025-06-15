import { User } from "../../../models/User.model"
import { IUserbaseService } from "./User-base-service.interface";

export interface IStrapiService extends IUserbaseService<User>{
}