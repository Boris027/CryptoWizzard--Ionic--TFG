import { Observable } from "rxjs"

/**
 * Generic interface for basic cryptocurrency operations.
 * @template T The type of cryptocurrency data handled by the implementation.
 */
export interface ICryptoBase<T>{
    /**
     * Retrieves a paginated list of cryptocurrency items.
     * @param page The page number to retrieve (starting from 1).
     * @param pageSize The number of items per page.
     * @param currency The currency code to use for price conversion (e.g., "USD").
     * @returns An Observable emitting an array of cryptocurrency items.
     */
    getAllPaginated(page:number,pageSize:number,currency:string):Observable<T[]>

    /**
     * Finds a cryptocurrency item by its ID.
     * @param id The unique identifier of the cryptocurrency.
     * @param currency The currency code for price conversion.
     * @returns An Observable emitting the cryptocurrency item.
     */
    findbyId(id:string,currency:string):Observable<T>

    /**
     * Retrieves all cryptocurrency items without pagination or filtering.
     * @returns An Observable emitting an array of all cryptocurrency items.
     */
    getAllSimple():Observable<T[]>
    
    /**
     * Retrieves the price history for a cryptocurrency over a specified number of days.
     * @param id The unique identifier of the cryptocurrency.
     * @param currency The currency code for price conversion.
     * @param days The time span (in days) for the price history (e.g., "30").
     * @returns An Observable emitting an array of price data points.
     */
    getPriceList(id:string,currency:string,days:string):Observable<T[]>
}