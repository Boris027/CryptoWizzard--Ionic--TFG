import { Inject, Injectable } from "@angular/core";
import { ICryptobaseService } from "../../interfaces/crypto/Crypto-base-service.interface";
import { BasicCrypto } from "../../../models/Crypto.model";
import { Observable } from "rxjs";
import { CRYPTO_REPOSITORY_TOKEN } from "../../../repositories/repository.tokens";
import { ICryptoBase } from "../../../repositories/interfaces/crypto/CryptoBase.interface";

@Injectable({
    providedIn: 'root'
})

export class CryptoBaseService<T extends BasicCrypto> implements ICryptobaseService<T> {


    constructor(
        @Inject (CRYPTO_REPOSITORY_TOKEN) protected repository:ICryptoBase<T>
    ){

    }
    getPriceList(id: string, currency: string, days: string): Observable<T[]> {
        return this.repository.getPriceList(id,currency,days)
    }

    getAllPaginated(page: number, pageSize: number,currency:string): Observable<any> {
        return this.repository.getAllPaginated(page,pageSize,currency)
    }
    findbyId(id: string,currency:string): Observable<T> {
        return this.repository.findbyId(id,currency)
    }
    getAllSimple(): Observable<T[]> {
        return this.repository.getAllSimple()
    }

}