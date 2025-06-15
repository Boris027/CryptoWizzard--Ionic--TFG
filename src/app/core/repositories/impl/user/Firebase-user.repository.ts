import { Inject, Injectable } from '@angular/core';
import { IUserFirebaseRepository } from '../../interfaces/user/Firebase.interface';
import { UserBaseRepository } from './UserBase.repository';
import { Observable, of } from 'rxjs';
import { BasicCrypto } from 'src/app/core/models/Crypto.model';
import { BasicList } from 'src/app/core/models/CryptoList.model';
import { BasicUser, User } from 'src/app/core/models/User.model';
import { FIREBASE_MAIN_SERVICE, USER_API_URL_TOKEN, USER_MAPPING_TOKEN } from '../../repository.tokens';
import { HttpClient } from '@angular/common/http';
import { IUserBaseMapping } from '../../interfaces/user/UserBaseMapping.interface';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, getDocs, orderBy, query, setDoc, updateDoc,limit,startAfter, startAt } from 'firebase/firestore';
import { IFirebaseMainService } from 'src/app/core/services/interfaces/firebasemain.service.interface';
import { AngularFireFunctions } from '@angular/fire/compat/functions';

/**
 * Repository class for managing User data via Firebase backend.
 * Extends UserBaseRepository and implements IUserFirebaseRepository.
 */
@Injectable({
  providedIn: 'root'
})
export class FirebaseUserRepository extends UserBaseRepository<User> implements IUserFirebaseRepository  {
  constructor(
        httpclient:HttpClient,
        @Inject(USER_API_URL_TOKEN) api:string,
        @Inject(USER_MAPPING_TOKEN) mapping:IUserBaseMapping<User>,
        @Inject (FIREBASE_MAIN_SERVICE) private firebasemainservice:IFirebaseMainService,
        private functions: AngularFireFunctions
    ){
      super(httpclient,api,mapping)
    }

  /**
   * Updates user data as admin, including username, gender, and admin status.
   * 
   * @param token Authentication token.
   * @param iduser User ID to update.
   * @param username New username.
   * @param gender New gender.
   * @param isAdminxd Boolean indicating admin status.
   * @returns Observable emitting updated user info or error if no user logged in.
   */
  override AdminUpdateUser(token: string, iduser: string, username: string, gender: string, isAdminxd: boolean): Observable<any> {
    let database:Firestore=this.firebasemainservice.getfirestore()
    const auth = getAuth();
    return new Observable((observer)=>{
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docref = doc(database, `persons`, iduser);

          let updatedoc:any={};
          if(username!=""){
            updatedoc.name=username
          }
          if(gender!="" && gender!=undefined){
            updatedoc.gender=gender
          }
          if(isAdminxd==true ||isAdminxd==false){
            updatedoc.isAdmin=isAdminxd
          }

          let docupdate=await updateDoc(docref,updatedoc); 
          observer.next({iduser:iduser,username:username,gender:gender,isAdmin:isAdminxd})

        }else {
          observer.error(new Error("there is no user loged"))
        }
      })
    })
  }

  /**
   * Retrieves a paginated list of users ordered by name.
   * 
   * @param token Pagination cursor token.
   * @param page Page number.
   * @param limitxd Number of users per page.
   * @returns Observable emitting array of BasicUser or error.
   */
  override AdminGetUsersPagination(token: string, page: number, limitxd: number): Observable<any> {
    const auth = getAuth();
        return new Observable ((observer)=>{
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                  const db = this.firebasemainservice.getfirestore(); 
                  const personsRef = collection(db, "persons");

                  let docSnap:any="";
                  if(token!=""){
                    docSnap = await getDoc(doc(db, "persons",token));
                  }

                  let q:any=[]
                  if(token!=""){
                    q = query(personsRef, orderBy("name"), limit(limitxd),startAfter(docSnap));
                  }else{
                    q = query(personsRef, orderBy("name"), limit(limitxd),startAt(docSnap));
                  }

                  const documentSnapshots = await getDocs(q);

                  let arrayBasicUser: any[]=[]
                  documentSnapshots.forEach((doc:any) => {
                    arrayBasicUser.push(this.mapping.GetBasicUser({uid:doc.id,email:doc.data().email},doc.data().name,doc.data().gender,"",doc.data().isAdmin))
                  });
                  observer.next(arrayBasicUser)
                  observer.complete()
                    
                } else {
                  observer.error(new Error("there is no user loged"))
                }
            });
        }
      )
  }

  /**
   * Deletes a user by ID.
   * 
   * @param token Authentication token.
   * @param iduser User ID to delete.
   * @returns Observable for HTTP post deletion or error.
   */
  override AdminDeleteUser(token: string, iduser: string): Observable<any> {
    const db = this.firebasemainservice.getfirestore(); 
    deleteDoc(doc(db, "persons", iduser));
    return this.httpclient.post("https://eliminarusuario-bamoiskzbq-uc.a.run.app",{uidAEliminar:iduser})
  }

  /**
   * Gets BasicUser details for currently authenticated user.
   * 
   * @param token Authentication token.
   * @param id User ID (optional).
   * @returns Observable emitting BasicUser or error.
   */
  override GetBasicUser(token: string, id: string): Observable<BasicUser> {
    const auth = getAuth();
        return new Observable ((observer)=>{
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                  let firestore:Firestore=this.firebasemainservice.getfirestore()
                  let personref=doc(firestore,`persons/${user.uid}`)
                  let docsnap=await getDoc(personref)
                  let data:any=docsnap.data()
                  
                  observer.next(this.mapping.GetBasicUser(user,data.name,data.gender,data.image,data.isAdmin))
                  observer.complete()
                } else {
                  observer.error(new Error("there is no user loged"))
                }
            });
        }
      )
  }

  /**
   * Retrieves list(s) associated with the authenticated user.
   * 
   * @param token Authentication token.
   * @param id Optional list ID to get a specific list with cryptos.
   * @returns Observable emitting lists or specific list with cryptos.
   */
  override GetListFromUser(token: string,id?:string): Observable<any> {
    const auth = getAuth();
    const database:Firestore=this.firebasemainservice.getfirestore()
    return new Observable ((observer)=>{
      onAuthStateChanged(auth, async (user) => {
          if (user) {
            if(!id){
              const q = query(collection(database, `persons/${user.uid}/list`))
              const querySnapshot = await getDocs(q);
              let dataxd:any[]=[]
              querySnapshot.forEach((doc) => {
                let data:any=doc.data()
                data.id=doc.id
                dataxd.push(data)
              });
              let data=this.mapping.GetListFromUser(dataxd)
              observer.next(data)
              observer.complete() 
            }else{
              const docRef = doc(database, `persons/${user.uid}/list`, id);
              const docSnap = await getDoc(docRef);
              const querySnapshot = await getDocs(collection(database, `persons/${user.uid}/list/${id}/cryptos` ));
              let cryptos:BasicCrypto[]=[]
              querySnapshot.forEach((doc) => {
                let prueba:any=doc.data()
                cryptos.push({id:doc.id,symbol:prueba.symbol,name:prueba.name})
              });
              
              let data:any=docSnap.data()
              data.cryptos=cryptos
              let array:any[]=[]
              array.push(data)
              data.id=docRef.id
              let finaldata=this.mapping.GetListFromUser(array)
              return observer.next(finaldata)
            }
          } else {
            observer.error(new Error("there is no user loged"))
          }
      });
    })
  }

  /**
   * Adds a list to the authenticated user.
   * 
   * @param token Authentication token.
   * @param list List data to add.
   * @param iduser User ID.
   * @returns Observable emitting added list response.
   */
  override addlistToUser(token: string, list: BasicList, iduser: string): Observable<any> {
    let database:Firestore=this.firebasemainservice.getfirestore()
    const auth = getAuth();
    return new Observable ((observable)=>{
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docRef = await addDoc(collection(database, `persons/${user.uid}/list`), {
            title: list.title,
            description: list.description
          });
          list.id=docRef.id
          observable.next(this.mapping.addlistUserResponse(list))
        }
      })
    })
  }

  /**
   * Removes a list from the authenticated user.
   * 
   * @param token Authentication token.
   * @param listid List ID to remove.
   * @returns Observable that completes after removal.
   */
  override removelistFromUser(token: string, listid: string): Observable<any> {
    let database:Firestore=this.firebasemainservice.getfirestore()
    const auth = getAuth();
    return new Observable ((observer)=>{
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docRef =await deleteDoc(doc(database, `persons/${user.uid}/list`, listid));
          observer.next()
        }
      })
    })
  }

  /**
   * Updates a list from the authenticated user.
   * 
   * @param token Authentication token.
   * @param list List data to update.
   * @returns Observable emitting updated list.
   */
  override updatelistFromUser(token: string, list: BasicList): Observable<any> {
    let database:Firestore=this.firebasemainservice.getfirestore()
    const auth = getAuth();
    return new Observable((observer)=>{
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docref = doc(database, `persons/${user.uid}/list`, list.id);
          let docRef=await updateDoc(docref, {
            title:list.title,
            description:list.description
          });        
        }
        observer.next(list)
      })
    })
  }

  /**
   * Adds a cryptocurrency to a user's list.
   * 
   * @param token Authentication token.
   * @param idlist List ID to add the crypto to.
   * @param idcrypto Cryptocurrency ID.
   * @param crypto Optional BasicCrypto object.
   * @returns Observable emitting an empty string immediately.
   */
  override addCryptoToList(token: string, idlist: string, idcrypto: string,crypto?: BasicCrypto): Observable<any> {
    let database:Firestore=this.firebasemainservice.getfirestore()
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) { 
        await setDoc(doc(database, `persons/${user.uid}/list/${idlist}/cryptos`, crypto?.id!!), {
          name: crypto?.name,
          symbol: crypto?.symbol,
        }); 
      }
    })
    return of("")
  }

  /**
   * Removes a cryptocurrency from a user's list.
   * 
   * @param token Authentication token.
   * @param idlist List ID.
   * @param idcrypto Cryptocurrency ID to remove.
   * @returns Observable emitting an empty string immediately.
   */
  override removeCryptoFromList(token: string, listid: string, cryptoid: string): Observable<any> {
    let database:Firestore=this.firebasemainservice.getfirestore()
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) { 
        await deleteDoc(doc(database, `persons/${user.uid}/list/${listid}/cryptos`, cryptoid));
      }
    })
    return of("")
  }

  override findcryptobyid(token: string, idcrypto: string): Observable<any> {
    return of(idcrypto)
  }

  override addcryptotodatabase(token: string, crypto: BasicCrypto): Observable<any> {
    throw new Error('Method not implemented.');
  }

  /**
   * Updates the authenticated user's basic data, such as username and gender.
   * 
   * @param token Authentication token (not used in this implementation).
   * @param data Object containing fields to update (username, gender).
   * @param userid User ID (not directly used, authenticated user is used instead).
   * @returns Observable emitting the updated BasicUser after the update.
   */
  override updateuserdata(token: string, data: any, userid: string): Observable<any> {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        let firestore:Firestore=this.firebasemainservice.getfirestore()
        if(data.username){
          await updateDoc(doc(firestore,"persons",user.uid),{
            name:data.username
          })
        }

        if(data.gender){
          await updateDoc(doc(firestore,"persons",user.uid),{
            gender:data.gender
          })
        }
      }
  });
    return this.GetBasicUser("","")
  }
}