import { Inject, Injectable } from '@angular/core';
import { BaseMediaService } from './base-media.service';
import { from, map, Observable, of, switchMap } from 'rxjs';
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
  StorageReference, 
  FirebaseStorage
} from "firebase/storage";
import { doc, setDoc, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseMediaService extends BaseMediaService {
  

  constructor(
    @Inject(UPLOAD_API_URL_TOKEN) private uploadUrl:string,
    @Inject(AUTH_TOKEN) private auth:IAuthenticationService,
    private httpclient:HttpClient,
    @Inject (FIREBASE_MAIN_SERVICE) private firebasemainservice:IFirebaseMainService
    
  ) 
  {
    super()
  }

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
