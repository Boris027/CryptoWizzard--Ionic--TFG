import { Inject, Injectable } from '@angular/core';
import { FIREBASE_CONFIG_TOKEN } from '../../repositories/repository.tokens';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { IFirebaseMainService } from '../interfaces/firebasemain.service.interface';
import { getFunctions, httpsCallable } from 'firebase/functions'; // Asegúrate de que esta línea está aquí.

@Injectable({
  providedIn: 'root'
})
export class FirebaseMainService implements IFirebaseMainService {

  private app: FirebaseApp;
  private db: Firestore;
  private functions: any;

  constructor(
    @Inject(FIREBASE_CONFIG_TOKEN) private firebaseConfig: any
  ) {
    // Initialize Firebase app
    this.app = initializeApp(firebaseConfig);

    // Initialize Firestore
    this.db = getFirestore(this.app);

    // Initialize Firebase Functions
    this.functions = getFunctions(this.app);  // Correct usage here
  }
 

  getfirebaseApp(): FirebaseApp {
    return this.app;
  }

  getfirestore(): Firestore {
    return this.db;
  }

  getFunctions(): any {
    return this.functions;  // Expose functions for use in other parts of the app
  }
}
