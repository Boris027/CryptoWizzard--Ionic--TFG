import { Observable } from "rxjs";
import { BasicCrypto, CryptoGraphPrice } from "../../../models/Crypto.model";

export interface ICryptoBaseMapping<T> {

    getAllPaginated(data:any):any
    getAllList(data:any):BasicCrypto[]
    getPriceList(data:any):CryptoGraphPrice[]
}