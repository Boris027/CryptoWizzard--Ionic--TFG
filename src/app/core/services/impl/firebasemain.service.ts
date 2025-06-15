import { Inject, Injectable } from '@angular/core';
import { FIREBASE_CONFIG_TOKEN } from '../../repositories/repository.tokens';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { IFirebaseMainService } from '../interfaces/firebasemain.service.interface';
import { getFunctions } from 'firebase/functions';

/**
 * Service responsible for initializing and providing access
 * to the main Firebase app, Firestore database, and Firebase Functions.
 * Implements the IFirebaseMainService interface.
 */
@Injectable({
  providedIn: 'root'
})
export class FirebaseMainService implements IFirebaseMainService {
  private app: FirebaseApp;
  private db: Firestore;
  private functions: any;

  /**
   * Initializes Firebase app, Firestore, and Firebase Functions
   * using the provided Firebase configuration.
   * 
   * @param firebaseConfig - Configuration object for Firebase initialization.
   */
  constructor(
    @Inject(FIREBASE_CONFIG_TOKEN) private firebaseConfig: any
  ) {
    this.app = initializeApp(firebaseConfig);

    this.db = getFirestore(this.app);

    this.functions = getFunctions(this.app);
  }

  /**
   * Returns the initialized Firebase app instance.
   * 
   * @returns FirebaseApp instance
   */
  getfirebaseApp(): FirebaseApp {
    return this.app;
  }

  /**
   * Returns the initialized Firestore database instance.
   * 
   * @returns Firestore instance
   */
  getfirestore(): Firestore {
    return this.db;
  }

  /**
   * Returns the initialized Firebase Functions instance.
   * 
   * @returns Firebase Functions instance
   */
  getFunctions(): any {
    return this.functions;
  }
}