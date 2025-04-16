import { FirebaseApp } from "firebase/app";
import { Firestore } from "firebase/firestore";

export interface IFirebaseMainService{
    getfirestore():Firestore
    getfirebaseApp():FirebaseApp
    getFunctions():any

}