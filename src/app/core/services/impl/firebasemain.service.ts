import { Inject, inject, Injectable } from '@angular/core';
import { FIREBASE_CONFIG_TOKEN, USER_REPOSITORY_TOKEN } from '../../repositories/repository.tokens';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { IFirebaseMainService } from '../interfaces/firebasemain.service.interface';

@Injectable({
  providedIn: 'root'
})
export class FirebaseMainService implements IFirebaseMainService {

  private app:FirebaseApp
  private db:Firestore

  constructor(
    @Inject (FIREBASE_CONFIG_TOKEN) firebaseconfig:any,
  ) 
  {
    this.app = initializeApp(firebaseconfig);
    this.db = getFirestore(this.app);
  }


  
  getfirebaseApp(): FirebaseApp {
    return this.app
  }
  
  getfirestore(): Firestore {
    return this.db
  }
  

}
