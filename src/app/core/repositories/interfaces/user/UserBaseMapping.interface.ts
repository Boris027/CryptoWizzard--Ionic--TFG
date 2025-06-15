import { BasicList, CryptoList } from "src/app/core/models/CryptoList.model";

/**
 * Interface for mapping user-related data transformations
 * between backend API responses and app domain models.
 *
 * @template T The type of User model.
 */
export interface IUserBaseMapping<T>{
    /**
     * Maps raw data from the backend to an array of CryptoList objects.
     * 
     * @param data Raw data to map.
     * @param id Optional user ID.
     * @returns Array of CryptoList.
     */
    GetListFromUser(data:any,id?:string):CryptoList[]

    /**
     * Constructs the request body to add a list to a user.
     * 
     * @param data List data.
     * @param iduser User ID to associate the list with.
     * @returns Request body for the API.
     */
    addlistUser(data:any,iduser:string):any

    /**
     * Maps the API response of adding a list to a BasicList object.
     * 
     * @param data API response data.
     * @returns BasicList object.
     */
    addlistUserResponse(data:any):BasicList

    /**
     * Constructs the request body to update a list.
     * 
     * @param data List data to update.
     * @returns Request body for the API.
     */
    updatelistbody(data:any):any

    /**
     * Constructs the request body to remove a crypto from a list.
     * 
     * @param data Crypto ID or relevant info.
     * @returns Request body for the API.
     */
    deletecryptofromlist(data:any):any

    /**
     * Processes the API response to find a crypto by its ID.
     * 
     * @param data API response data.
     * @param idcrypto Crypto ID to find.
     * @returns Found crypto ID or indicator if not found.
     */
    findcryptobyidresponse(data:any,idcrypto:string):any

    /**
     * Constructs the request body to add a crypto to the database.
     * 
     * @param data Crypto data to add.
     * @returns Request body for the API.
     */
    addcryptotodatabase(data:any):any

    /**
     * Maps the API response after adding a crypto to a BasicCrypto model.
     * 
     * @param data API response data.
     * @returns BasicCrypto object.
     */
    addcryptoresponse(data:any):any

    /**
     * Constructs the request body to add a crypto to a favorite list.
     * 
     * @param data Crypto ID or relevant info.
     * @returns Request body for the API.
     */
    addcryptotolist(data:any):any

    /**
     * Maps data to update user information request body.
     * 
     * @param data User data to update.
     * @returns Request body for the API.
     */
    updateuserdata(data:any):any

    /**
     * Maps raw data to a basic user model.
     * 
     * @param data Raw user data.
     * @param name Optional username override.
     * @param gender Optional gender override.
     * @param image Optional image URL.
     * @param isAdmin Optional admin flag.
     * @returns Basic user model.
     */
    GetBasicUser(data:any,name?:string,gender?:string,image?:string,isAdmin?:boolean):any
}