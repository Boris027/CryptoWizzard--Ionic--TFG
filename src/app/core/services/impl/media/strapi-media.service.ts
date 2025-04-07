import { map, Observable } from "rxjs";
import { BaseMediaService } from "./base-media.service";
import { Inject } from "@angular/core";
import { AUTH_TOKEN, UPLOAD_API_URL_TOKEN } from "src/app/core/repositories/repository.tokens";
import { HttpClient } from "@angular/common/http";
import { IAuthenticationService } from "../../interfaces/authentication/authentication.interface";

export class StrapiMediaService extends BaseMediaService{

    constructor(
        @Inject(UPLOAD_API_URL_TOKEN) private uploadUrl:string,
        @Inject(AUTH_TOKEN) private auth:IAuthenticationService,
        private httpclient:HttpClient
    ){
        super();
    }


    private getHeaders() {
        const token = this.auth.getToken();
        return {
            headers: token ? { 'Authorization': `Bearer ${token}` } : undefined
        };
    }

    public override upload(blob: Blob): Observable<number[]> {
        const formData = new FormData();
        formData.append('files', blob);
        return this.httpclient.post<any>(`${this.uploadUrl}`, formData, this.getHeaders()).pipe(map((response:any)=>{
            console.log(response)
            return response
        }));
    }
    
}