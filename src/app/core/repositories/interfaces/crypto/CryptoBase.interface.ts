import { Observable } from "rxjs"

export interface ICryptoBase<T>{
    getAllPaginated(page:number,pageSize:number,currency:string):Observable<T[]>
    findbyId(id:string,currency:string):Observable<T>
    getAllSimple():Observable<T[]>
    getPriceList(id:string,currency:string,days:string):Observable<T[]>

}