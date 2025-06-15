import { BasicCrypto, CryptoGraphPrice } from "../../../models/Crypto.model";

/**
 * Interface for mapping raw crypto data from API responses
 * into application-specific data models.
 * 
 * @template T The generic type representing the crypto data model.
 */
export interface ICryptoBaseMapping<T> {
    /**
     * Maps the raw data from a paginated crypto list API response
     * into the desired format.
     * 
     * @param data The raw API response data.
     * @returns The mapped data, typically transformed for paginated results.
     */
    getAllPaginated(data:any):any

    /**
     * Maps raw crypto list data into an array of BasicCrypto models.
     * 
     * @param data The raw API response containing crypto list information.
     * @returns An array of BasicCrypto objects.
     */
    getAllList(data:any):BasicCrypto[]

    /**
     * Maps raw price list data into an array of CryptoGraphPrice models.
     * 
     * @param data The raw API response containing price history information.
     * @returns An array of CryptoGraphPrice objects.
     */
    getPriceList(data:any):CryptoGraphPrice[]
}