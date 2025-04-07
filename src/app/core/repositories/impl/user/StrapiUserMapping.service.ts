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

  //para crear el body que se enviará en remoto
  export interface createListRemote{
    data:BodyCreateList
  }
  
  export interface BodyCreateList{
    Title:string,
    Description:string,
    users_permissions_user:number
  }

  //la respuesta de añadir una lista

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
  //el body que se debe enviar para actualizar una lista
  export interface CreateListUpdate{
    data:bodyupdate
  }
  export interface bodyupdate{
    Title:string,
    Description:string
  }

  //el body que se debe crear para eliminar una criptomoneda de una lista
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
  //get findcrypto by id
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
  //para subir una criptomoneda a la api
  export interface addcrypto{
    data:cryptoxd
  }
  export interface cryptoxd{
    cryptoId:string,
    Name:string,
    symbol:string
  }
  //para añadir una criptomoneda en una lista
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
  //interfaz que hay que convertir para actualizar los datos del usuario
  export interface updateuser{
    id:string
    email:string,
    password:string,
    username:string,
    gender:string,
    image:any
  }

  //interfaz de lo que llega al hacer un getuser que viene con la imagen
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


  addlistUser(data:CryptoList,iduser:string):createListRemote{
      return {
          data:{
              Title:data.title,
              Description:data.description,
              users_permissions_user:parseInt(iduser)
          }
      }
  }

  addlistUserResponse(data: addlistresponse): BasicList {
    return {title:data.data.attributes.Title, description:data.data.attributes.Description, id:data.data.id+""}
  }

  updatelistbody(data:BasicList):CreateListUpdate{
    return {
      data:{
        Title:data.title,
        Description:data.description
      }
    }
  }

  deletecryptofromlist(data: string):deletecryptofromfavoritelist {
    return {
      data:{
        cryptos:{
          disconnect:[{id:data}]
        }
      }
    }
  }


  findcryptobyidresponse(data: getallresponse,cryptoid:string) {
    let filter=data.data.filter(c=>c.attributes.cryptoId==cryptoid)
    if(filter.length>=1){
      return filter[0].id;
    }else{
      return -1
    }

  }

  addcryptoresponse(data: any):BasicCrypto {
    return {
      id:data.data.attributes.cryptoId,
      name:data.data.attributes.Name,
      symbol:data.data.attributes.symbol
    }
  }

  addcryptotodatabase(data: BasicCrypto):addcrypto {
    return {data:{
      cryptoId:data.id,
      symbol:data.symbol,
      Name:data.name
    }}
  }

  addcryptotolist(id:string):updatecryptofromfavoritelist{
    return {
      data:{
        cryptos:{
          connect:[{id:parseInt(id)}]
        }
      }
    }
  }

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


  GetBasicUser(data:any):BasicUser{
    if(data.image!=undefined){
      return {
        gender:data.gender,
        id:""+data.id,
        email:data.email,
        username:data.username,
        img:data.image.url
      }
    }else{
      return {
        gender:data.gender,
        id:""+data.id,
        email:data.email,
        username:data.username,
        img:""
      }
    }
    
  }

}