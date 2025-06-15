import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

/**
 * Abstract base service for media operations.
 * Provides a contract for uploading media as a Blob.
 */
@Injectable({
    providedIn: 'root'
  })
export abstract class BaseMediaService {
  /**
   * Uploads a media file represented as a Blob.
   * @param blob - The media data to upload.
   * @returns An Observable that emits the upload result.
   */
  public abstract upload(blob:Blob):Observable<any>;
}