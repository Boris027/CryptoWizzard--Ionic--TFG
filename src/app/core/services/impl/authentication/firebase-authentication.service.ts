import { Inject, Injectable } from "@angular/core";
import { IFirebaseAuthentication } from "../../interfaces/authentication/firebase-authentication.interface";
import { BaseAutenticationService } from "./base-autentication.service";
import { Observable } from "rxjs";
import { AUTENTICATION_URL_TOKEN, AUTH_MAPPING_TOKEN, FIREBASE_MAIN_SERVICE, LOGIN_API_URL_TOKEN, REGISTER_API_URL_TOKEN, USER_API_URL_TOKEN } from "src/app/core/repositories/repository.tokens";
import { IAuthenticationMapping } from "../../interfaces/authentication/auth-mapping.interface";
import { HttpClient } from "@angular/common/http";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, deleteUser } from "firebase/auth";
import { doc, Firestore, setDoc } from "firebase/firestore";
import { User } from "src/app/core/models/User.model";
import { IFirebaseMainService } from "../../interfaces/firebasemain.service.interface";

/**
 * Service to handle user authentication using Firebase.
 * Extends BaseAuthenticationService and implements IFirebaseAuthentication interface.
 */
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

    /**
     * Registers a new user in Firebase Authentication and Firestore.
     * Creates the user using email and password,
     * then stores additional user info in Firestore 'persons' collection.
     * Maps the Firebase response to app's User model.
     * @param authenticationregister - Contains email, password, username, gender.
     * @returns Observable<User> with the registered user's info.
     */
    override Register(authenticationregister: any): Observable<User> {
        const auth = getAuth();
        return new Observable ((observer)=>{
            createUserWithEmailAndPassword(auth, authenticationregister.email, authenticationregister.password)
            .then(async (userCredential) => {
                const user = userCredential.user;

                let firestore:Firestore=this.firebaseservice.getfirestore()
                await setDoc(doc(firestore,"persons",userCredential.user.uid),{
                    name:authenticationregister.username,
                    email:authenticationregister.email,
                    gender:authenticationregister.gender,
                    image:"",
                    isAdmin:false
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

    /**
     * Logs in a user with email and password through Firebase Authentication.
     * Maps Firebase response to app's User model.
     * @param authenticationlogin - Contains email and password.
     * @returns Observable<User> with logged-in user's info.
     */
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

    /**
     * Retrieves the currently authenticated user as an Observable.
     * Emits User model if user is logged in, otherwise emits an error.
     * @returns Observable<User> representing the current user.
     */
    override GetUser(): Observable<User> {
        const auth = getAuth();
        return new Observable ((observer)=>{
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    observer.next(this.mapping.GetUserResponse(user,""))
                    observer.complete()
                } else {
                    observer.error(new Error("there is no user loged"))
                }
            });
        })
    }

    /**
     * Deletes the currently authenticated user from Firebase Authentication.
     * @param token - Not used in this implementation.
     * @param iduser - Not used in this implementation.
     * @returns Observable<void> completing on successful deletion or error.
     */
    override Deleteuser(token: string, iduser: string): Observable<User> {
        const auth = getAuth();
        const user = auth.currentUser;
        return new Observable ((observer)=>{
            deleteUser(user!!).then(() => {
                observer.next()
                observer.complete()
            }).catch((error) => {
                observer.error(error)
            });
        })        
    }

    /**
     * Logs out the current user by signing out from Firebase Authentication
     * and updating the authentication status observable.
     */
    override Logout(): void {
        const auth = getAuth();
        this.setmenu(false)
        auth.signOut()
    }
}