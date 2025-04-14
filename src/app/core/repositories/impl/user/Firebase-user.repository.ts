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
import { getAuth, onAuthStateChanged, updateEmail } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, getDocs, getFirestore, query, setDoc, updateDoc } from 'firebase/firestore';
import { IFirebaseMainService } from 'src/app/core/services/interfaces/firebasemain.service.interface';
import { FirebaseApp } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseUserRepository extends UserBaseRepository<User> implements IUserFirebaseRepository  {

  constructor(
        httpclient:HttpClient,
        @Inject(USER_API_URL_TOKEN) api:string,
        @Inject(USER_MAPPING_TOKEN) mapping:IUserBaseMapping<User>,
        @Inject (FIREBASE_MAIN_SERVICE) private firebasemainservice:IFirebaseMainService
    ){
      super(httpclient,api,mapping)
    }

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
              console.log(finaldata)
              return observer.next(finaldata)
            }

            
          } else {
             observer.error(new Error("there is no user loged"))
          }
      });
      
    })
  }
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


  override updateuserdata(token: string, data: any, userid: string): Observable<any> {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
          
          let firestore:Firestore=this.firebasemainservice.getfirestore()
          if(data.username){
                await updateDoc(doc(firestore,"persons",user.uid),{
                    name:data.username
                })
                console.log(data.username)
          }

          if(data.gender){
            await updateDoc(doc(firestore,"persons",user.uid),{
              gender:data.gender
            })
          }


          
          console.log(user)
      } else {
         //observer.error(new Error("there is no user loged"))
      }
  });
    return this.GetBasicUser("","")
  }
}
