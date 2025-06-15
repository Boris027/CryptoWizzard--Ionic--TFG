import { map, Observable } from "rxjs";
import { BaseMediaService } from "./base-media.service";
import { Inject } from "@angular/core";
import { AUTH_TOKEN, UPLOAD_API_URL_TOKEN } from "src/app/core/repositories/repository.tokens";
import { HttpClient } from "@angular/common/http";
import { IAuthenticationService } from "../../interfaces/authentication/authentication.interface";

/**
 * Service for uploading media files to a Strapi backend.
 * Extends the BaseMediaService abstract class.
 */
export class StrapiMediaService extends BaseMediaService{
    /**
     * Creates an instance of StrapiMediaService.
     * @param uploadUrl - The URL endpoint token for the Strapi upload API (injected).
     * @param auth - Authentication service instance (injected).
     * @param httpclient - Angular HttpClient for HTTP requests.
     */
    constructor(
        @Inject(UPLOAD_API_URL_TOKEN) private uploadUrl:string,
        @Inject(AUTH_TOKEN) private auth:IAuthenticationService,
        private httpclient:HttpClient
    ){
        super();
    }

    /**
     * Generates HTTP headers including authorization if a token is present.
     * @returns An object with headers including the Authorization bearer token if available.
     */
    private getHeaders() {
        const token = this.auth.getToken();
        return {
            headers: token ? { 'Authorization': `Bearer ${token}` } : undefined
        };
    }

    /**
     * Uploads a media Blob to the Strapi upload endpoint.
     * The blob is appended to a FormData object as 'files'.
     * 
     * @param blob - The media file Blob to upload.
     * @returns An Observable emitting the server response mapped to a number array (as per implementation).
     */
    public override upload(blob: Blob): Observable<number[]> {
        const formData = new FormData();
        formData.append('files', blob);
        return this.httpclient.post<any>(`${this.uploadUrl}`, formData, this.getHeaders()).pipe(map((response:any)=>{
            return response
        }));
    }
}