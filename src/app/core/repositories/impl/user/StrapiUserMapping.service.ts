import { Injectable } from "@angular/core";
import { IUserBaseMapping } from "../../interfaces/user/UserBaseMapping.interface";
import { BasicUser, User } from "src/app/core/models/User.model";
import { BasicList, CryptoList } from "src/app/core/models/CryptoList.model";
import { BasicCrypto } from "src/app/core/models/Crypto.model";

export interface GetAllList {
    id: number
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
    favoritelists: Favoritelist[]
  }
  
  export interface Favoritelist {
    id: number
    Title: string
    Description: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    cryptos: Crypto[]
  }
  
  export interface Crypto {
    id: number
    cryptoId: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    Name: string
    symbol: string
  }

  export interface createListRemote{
    data:BodyCreateList
  }
  
  export interface BodyCreateList{
    Title:string,
    Description:string,
    users_permissions_user:number
  }

  export interface addlistresponse {
    data: Data
    meta: Meta
  }
  
  export interface Data {
    id: number
    attributes: Attributes
  }
  
  export interface Attributes {
    Title: string
    Description: string
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
  
  export interface Meta {}

  export interface CreateListUpdate{
    data:bodyupdate
  }
  export interface bodyupdate{
    Title:string,
    Description:string
  }

  export interface deletecryptofromfavoritelist{
    data:datadelete
  }

  export interface datadelete{
    cryptos:cryptos
  }
  export interface cryptos{
    disconnect:cryptoid[]
  }
  export interface cryptoid{
    id:string
  }
  export interface getallresponse {
    data: Data2[]
    meta: any
  }
  
  export interface Data2 {
    id: number
    attributes: Attributes2
  }
  export interface Attributes2 {
    cryptoId: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    Name: string
    symbol: string
  }
  export interface addcrypto{
    data:cryptoxd
  }
  export interface cryptoxd{
    cryptoId:string,
    Name:string,
    symbol:string
  }
  export interface updatecryptofromfavoritelist{
    data:updateCryptoData
  }
  export interface updateCryptoData{
    cryptos:updateCryptos
  }
  export interface updateCryptos{
    connect:updateCryptoId[]
  }
  export interface updateCryptoId{
    id:number
  }
  export interface updateuser{
    id:string
    email:string,
    password:string,
    username:string,
    gender:string,
    image:any
  }

  export interface basicuseresponse{
    id: number
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
    image: Image
  }
  export interface Image {
    id: number
    name: string
    alternativeText: any
    caption: any
    width: number
    height: number
    formats: Formats
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: any
    provider: string
    provider_metadata: any
    createdAt: string
    updatedAt: string
  }
  export interface Formats {
    large: any
    small: Small
    medium: any
    thumbnail: Thumbnail
  }
  export interface Thumbnail {
    ext: string
    url: string
    hash: string
    mime: string
    name: string
    path: any
    size: number
    width: number
    height: number
    provider_metadata: any
  }

  export interface Small {
    ext: string
    url: string
    hash: string
    mime: string
    name: string
    path: any
    size: number
    width: number
    height: number
    provider_metadata: any
  }

@Injectable({
    providedIn: 'root'
})
export class StrapiUserMapping implements IUserBaseMapping<User>{
  /**
   * Maps the raw response data to an array of CryptoList objects.
   * @param data The response containing user favorite lists.
   * @returns Array of CryptoList mapped from the response.
   */
  GetListFromUser(data: GetAllList): CryptoList[] {
      return data.favoritelists.map(c=>{
          return {
              id:c.id+"",
              title:c.Title,
              description:c.Description,
              cryptos:c.cryptos.map(x=>{
                  return {
                      id:""+x.cryptoId, 
                      name:x.Name, 
                      symbol:x.symbol}
              })
          }
      })
  }

  /**
   * Prepares the request body to create a new favorite list for a user.
   * @param data The CryptoList data to add.
   * @param iduser The user ID.
   * @returns The formatted request body for list creation.
   */
  addlistUser(data:CryptoList,iduser:string):createListRemote{
      return {
          data:{
              Title:data.title,
              Description:data.description,
              users_permissions_user:parseInt(iduser)
          }
      }
  }

  /**
   * Maps the server response after adding a list to a BasicList object.
   * @param data Response from add list request.
   * @returns BasicList with title, description, and id.
   */
  addlistUserResponse(data: addlistresponse): BasicList {
    return {title:data.data.attributes.Title, description:data.data.attributes.Description, id:data.data.id+""}
  }

  /**
   * Prepares the request body for updating a favorite list.
   * @param data The BasicList data with updates.
   * @returns The formatted request body for list update.
   */
  updatelistbody(data:BasicList):CreateListUpdate{
    return {
      data:{
        Title:data.title,
        Description:data.description
      }
    }
  }

  /**
   * Prepares the request body to remove a crypto from a favorite list.
   * @param data The crypto ID to disconnect.
   * @returns The formatted request body to remove crypto.
   */
  deletecryptofromlist(data: string):deletecryptofromfavoritelist {
    return {
      data:{
        cryptos:{
          disconnect:[{id:data}]
        }
      }
    }
  }

  /**
   * Extracts the crypto ID from the response filtering by cryptoId.
   * @param data The response data containing cryptos.
   * @param cryptoid The crypto ID to find.
   * @returns The found crypto ID or -1 if not found.
   */
  findcryptobyidresponse(data: getallresponse,cryptoid:string) {
    let filter=data.data.filter(c=>c.attributes.cryptoId==cryptoid)
    if(filter.length>=1){
      return filter[0].id;
    }else{
      return -1
    }
  }

  /**
   * Maps the response from adding a crypto to the database to BasicCrypto.
   * @param data The response data.
   * @returns BasicCrypto with id, name, and symbol.
   */
  addcryptoresponse(data: any):BasicCrypto {
    return {
      id:data.data.attributes.cryptoId,
      name:data.data.attributes.Name,
      symbol:data.data.attributes.symbol
    }
  }

  /**
   * Prepares the request body to add a crypto to the database.
   * @param data The BasicCrypto to add.
   * @returns The formatted request body.
   */
  addcryptotodatabase(data: BasicCrypto):addcrypto {
    return {data:{
      cryptoId:data.id,
      symbol:data.symbol,
      Name:data.name
    }}
  }

  /**
   * Prepares the request body to add a crypto to a favorite list.
   * @param id The crypto ID to connect.
   * @returns The formatted request body.
   */
  addcryptotolist(id:string):updatecryptofromfavoritelist{
    return {
      data:{
        cryptos:{
          connect:[{id:parseInt(id)}]
        }
      }
    }
  }

  /**
   * Prepares the request body to update user data.
   * @param data Object containing user data to update.
   * @returns Object with updated fields.
   */
  updateuserdata(data: updateuser) {
    let value:any={}
    
    if(data.email!=undefined){
      value.email=data.email
      return {email:data.email,gender:data.gender,username:data.username}
    }
    if(data.password!=undefined){
      value.password=data.email
      return {password:data.password}
    }
    
    if(data.image!=null){
      return {image:data.image}
    }
    return value
  }

  /**
   * Maps the raw user data response to BasicUser model.
   * @param data The raw user data.
   * @returns BasicUser object with user info.
   */
  GetBasicUser(data:any):BasicUser{
    if(data.image!=undefined){
      return {
        gender:data.gender,
        id:""+data.id,
        email:data.email,
        username:data.username,
        img:data.image.url,
        isAdmin:data.isAdmin??false
      }
    }else{
      return {
        gender:data.gender,
        id:""+data.id,
        email:data.email,
        username:data.username,
        img:"",
        isAdmin:data.isAdmin??false
      }
    }
  }
}