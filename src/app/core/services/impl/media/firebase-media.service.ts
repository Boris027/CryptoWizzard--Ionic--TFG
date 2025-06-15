import { Inject, Injectable } from '@angular/core';
import { BaseMediaService } from './base-media.service';
import { Observable, of } from 'rxjs';
import { AUTH_TOKEN, FIREBASE_MAIN_SERVICE, UPLOAD_API_URL_TOKEN } from 'src/app/core/repositories/repository.tokens';
import { IAuthenticationService } from '../../interfaces/authentication/authentication.interface';
import { HttpClient } from '@angular/common/http';
import { IFirebaseMainService } from '../../interfaces/firebasemain.service.interface';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { 
  getStorage, 
  ref, 
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { doc, updateDoc } from 'firebase/firestore';

/**
 * Service for uploading media files to Firebase Storage.
 * Extends the BaseMediaService abstract class.
 */
@Injectable({
  providedIn: 'root'
})
export class FirebaseMediaService extends BaseMediaService {
  /**
   * Creates an instance of FirebaseMediaService.
   * @param uploadUrl - The URL endpoint token for upload API (injected).
   * @param auth - Authentication service instance (injected).
   * @param httpclient - Angular HttpClient for HTTP requests.
   * @param firebasemainservice - Service to access Firebase app and Firestore (injected).
   */
  constructor(
    @Inject(UPLOAD_API_URL_TOKEN) private uploadUrl:string,
    @Inject(AUTH_TOKEN) private auth:IAuthenticationService,
    private httpclient:HttpClient,
    @Inject (FIREBASE_MAIN_SERVICE) private firebasemainservice:IFirebaseMainService
  ) 
  {
    super()
  }

  /**
   * Uploads a media Blob to Firebase Storage under 'uploads/' with a unique filename.
   * Upon successful upload, updates the Firestore 'persons' collection document for the current user
   * with the new image download URL.
   * 
   * @param blob - The media file Blob to upload.
   * @returns An Observable emitting an empty object currently. (Note: upload result is handled asynchronously inside onAuthStateChanged)
   */
  public override upload(blob: Blob): Observable<any> {
    let app=this.firebasemainservice.getfirebaseApp()
    let storage=getStorage(app);
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if(user){
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}`;
        const storageRef: any = ref(storage, `uploads/${fileName}`);
        const metadata = {
          contentType: blob.type,
          customMetadata: {
            'uploaded-by': user.uid || 'anonymous'
          }
        };
        const uploadTask = await uploadBytes(storageRef, blob, metadata);
        const downloadURL = await getDownloadURL(uploadTask.ref);
        let firestore=this.firebasemainservice.getfirestore()
        await updateDoc(doc(firestore,"persons",user.uid),{
          image:downloadURL
        })
        let uploadedblob:any[]=[]
        uploadedblob.push(downloadURL)
      }else{
        throw new Error('Method not implemented.');
      }
    })
    return of({})
  }
}