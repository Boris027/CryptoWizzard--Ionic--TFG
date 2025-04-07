import { Observable } from "rxjs";

export interface ICryptobaseService<T>{

    getAllPaginated(page:number,pageSize:number,currency:string):Observable<any>
    findbyId(id:string,currency:string):Observable<T>
    getAllSimple():Observable<T[]>
    getPriceList(id:string,currency:string,days:string):Observable<any>

}