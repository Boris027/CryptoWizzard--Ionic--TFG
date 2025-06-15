import { Inject, Injectable } from "@angular/core";
import { ICryptobaseService } from "../../interfaces/crypto/Crypto-base-service.interface";
import { BasicCrypto } from "../../../models/Crypto.model";
import { Observable } from "rxjs";
import { CRYPTO_REPOSITORY_TOKEN } from "../../../repositories/repository.tokens";
import { ICryptoBase } from "../../../repositories/interfaces/crypto/CryptoBase.interface";

/**
 * Service to handle cryptocurrency data operations using a repository.
 * @template T - Type extending BasicCrypto model.
 */
@Injectable({
    providedIn: 'root'
})
export class CryptoBaseService<T extends BasicCrypto> implements ICryptobaseService<T> {
    constructor(
        @Inject (CRYPTO_REPOSITORY_TOKEN) protected repository:ICryptoBase<T>
    ){ }

    /**
     * Retrieves the price list of a cryptocurrency for a given period.
     * @param id - The cryptocurrency identifier.
     * @param currency - The currency code (e.g., USD, EUR).
     * @param days - Number of days for price history.
     * @returns An Observable emitting an array of cryptocurrency price data.
     */
    getPriceList(id: string, currency: string, days: string): Observable<T[]> {
        return this.repository.getPriceList(id,currency,days)
    }

    /**
     * Retrieves paginated cryptocurrency data.
     * @param page - The page number to retrieve.
     * @param pageSize - The number of items per page.
     * @param currency - The currency code for price values.
     * @returns An Observable emitting the paginated data (format depends on implementation).
     */
    getAllPaginated(page: number, pageSize: number,currency:string): Observable<any> {
        return this.repository.getAllPaginated(page,pageSize,currency)
    }

    /**
     * Finds a cryptocurrency by its identifier and currency.
     * @param id - The cryptocurrency identifier.
     * @param currency - The currency code for the price.
     * @returns An Observable emitting the cryptocurrency data of type T.
     */
    findbyId(id: string,currency:string): Observable<T> {
        return this.repository.findbyId(id,currency)
    }

    /**
     * Retrieves a simple list of all cryptocurrencies.
     * @returns An Observable emitting an array of cryptocurrencies of type T.
     */
    getAllSimple(): Observable<T[]> {
        return this.repository.getAllSimple()
    }
}