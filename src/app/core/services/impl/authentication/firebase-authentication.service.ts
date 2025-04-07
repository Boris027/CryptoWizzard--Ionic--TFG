import { Inject, Injectable } from "@angular/core";
import { IFirebaseAuthentication } from "../../interfaces/authentication/firebase-authentication.interface";
import { BaseAutenticationService } from "./base-autentication.service";
import { Observable, of, throwError } from "rxjs";
import { AUTENTICATION_URL_TOKEN, AUTH_MAPPING_TOKEN, FIREBASE_CONFIG_TOKEN, FIREBASE_MAIN_SERVICE, LOGIN_API_URL_TOKEN, REGISTER_API_URL_TOKEN, USER_API_URL_TOKEN } from "src/app/core/repositories/repository.tokens";
import { IAuthenticationMapping } from "../../interfaces/authentication/auth-mapping.interface";
import { HttpClient } from "@angular/common/http";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, deleteUser } from "firebase/auth";
import { doc, Firestore, getFirestore, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { User } from "src/app/core/models/User.model";
import { IFirebaseMainService } from "../../interfaces/firebasemain.service.interface";



@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthenticationService extends BaseAutenticationService implements IFirebaseAuthentication {


    constructor(
        private httpclient:HttpClient,
        @Inject(USER_API_URL_TOKEN) private userapiurltoken:string,
        @Inject(LOGIN_API_URL_TOKEN) private loginapitoken:string,
        @Inject(REGISTER_API_URL_TOKEN) private registertoken:string,
        @Inject(AUTENTICATION_URL_TOKEN) private authenticationurltoken:string,
        @Inject(AUTH_MAPPING_TOKEN) private mapping:IAuthenticationMapping,
        @Inject(FIREBASE_MAIN_SERVICE) private firebaseservice:IFirebaseMainService
    ){
        super();
    }

    override Register(authenticationregister: any): Observable<User> {
        const auth = getAuth();
        return new Observable ((observer)=>{
            createUserWithEmailAndPassword(auth, authenticationregister.email, authenticationregister.password)
            .then(async (userCredential) => {
                const user = userCredential.user;

                let firestore:Firestore=this.firebaseservice.getfirestore()
                console.log(userCredential)
                console.log(authenticationregister)
                await setDoc(doc(firestore,"persons",userCredential.user.uid),{
                    name:authenticationregister.username,
                    email:authenticationregister.email,
                    gender:authenticationregister.gender,
                    image:""
                })

                observer.next(this.mapping.RegisterResponse(userCredential,authenticationregister.username,authenticationregister.gender))
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                observer.error(errorMessage)
            });
        })        
    }
    override Login(authenticationlogin: any): Observable<any> {
        let response
        const auth = getAuth();
        return new Observable ((observador)=>{
            signInWithEmailAndPassword(auth, authenticationlogin.email, authenticationlogin.password)
            .then((userCredential) => {
                const user = userCredential.user;
                observador.next(this.mapping.LoginResponse(userCredential))
                observador.complete()
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                observador.error(errorMessage)
            });
        }) 
        
    }
    override GetUser(): Observable<User> {

        const auth = getAuth();
        return new Observable ((observer)=>{
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    observer.next(this.mapping.GetUserResponse(user,""))
                    console.log(user)
                    observer.complete()
                } else {
                   observer.error(new Error("there is no user loged"))
                }
            });
        })
        

        let asad:User={id:"sad",username:"",gender:"",email:"",token:"asd"}
        return of(asad)
        return throwError(new Error('Error al obtener usuario'));
        //throw new Error("Method not implemented.");
    }
    override Deleteuser(token: string, iduser: string): Observable<User> {
        const auth = getAuth();
        const user = auth.currentUser;
        return new Observable ((observer)=>{
            deleteUser(user!!).then(() => {
                console.log("user deleted")
                observer.next()
                observer.complete()
            }).catch((error) => {
                console.log("you must be login recently for delete your account")
                observer.error(error)
            });
        })        
    }

    override Logout(): void {
        const auth = getAuth();
        this.setmenu(false)
        auth.signOut()
    }
   

}