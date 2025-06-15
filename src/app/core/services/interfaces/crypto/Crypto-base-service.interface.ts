import { Observable } from "rxjs";

export interface ICryptobaseService<T>{
    /**
     * Retrieves a paginated list of items.
     * 
     * @param page - The page number to retrieve.
     * @param pageSize - The number of items per page.
     * @param currency - The currency code for price conversion.
     * @returns Observable emitting the paginated result (usually a list with metadata).
     */
    getAllPaginated(page:number,pageSize:number,currency:string):Observable<any>

    /**
     * Finds an item by its unique identifier.
     * 
     * @param id - The unique identifier of the item.
     * @param currency - The currency code for price conversion.
     * @returns Observable emitting the found item of type T.
     */
    findbyId(id:string,currency:string):Observable<T>

    /**
     * Retrieves a simple list of all items without pagination or filters.
     * 
     * @returns Observable emitting an array of items of type T.
     */
    getAllSimple():Observable<T[]>

    /**
     * Retrieves a price list for a given item over a period of days.
     * 
     * @param id - The unique identifier of the item.
     * @param currency - The currency code for price conversion.
     * @param days - The number of days to retrieve the price list for.
     * @returns Observable emitting the price data (usually an array or object with price history).
     */
    getPriceList(id:string,currency:string,days:string):Observable<any>
}