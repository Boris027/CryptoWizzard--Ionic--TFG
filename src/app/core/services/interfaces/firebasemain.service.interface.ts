import { FirebaseApp } from "firebase/app";
import { Firestore } from "firebase/firestore";

export interface IFirebaseMainService{
    /**
     * Returns the initialized Firestore instance.
     * @returns Firestore instance
     */
    getfirestore():Firestore

    /**
     * Returns the initialized Firebase app instance.
     * @returns FirebaseApp instance
     */
    getfirebaseApp():FirebaseApp

    /**
     * Returns the initialized Firebase Functions instance.
     * @returns Firebase Functions instance (type any)
     */
    getFunctions():any
}