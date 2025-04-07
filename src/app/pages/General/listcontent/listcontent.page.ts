import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { BasicCrypto } from 'src/app/core/models/Crypto.model';
import { BasicList, CryptoList } from 'src/app/core/models/CryptoList.model';
import { User } from 'src/app/core/models/User.model';
import { AUTH_TOKEN, CRYPTO_SERVICE_TOKEN, USER_SERVICE_TOKEN } from 'src/app/core/repositories/repository.tokens';
import { IAuthenticationService } from 'src/app/core/services/interfaces/authentication/authentication.interface';
import { ICryptobaseService } from 'src/app/core/services/interfaces/crypto/Crypto-base-service.interface';
import { IUserbaseService } from 'src/app/core/services/interfaces/user/User-base-service.interface';
import { SharedService } from 'src/app/shared/sharedservice/shared.service';

@Component({
  selector: 'app-listcontent',
  templateUrl: './listcontent.page.html',
  styleUrls: ['./listcontent.page.scss'],
})
export class ListcontentPage implements OnInit {

  id:string=""
  currency:string=""
  list:CryptoList={id:-1+"",title:"",description:"",cryptos:[]}
  private subscriptions:Subscription[]=[]
  constructor(
    @Inject(AUTH_TOKEN) private authservice:IAuthenticationService,
    private activateroute:ActivatedRoute,
    private router:Router,
    private shared:SharedService,
    private translate:TranslateService,
    @Inject(USER_SERVICE_TOKEN) private userservice:IUserbaseService<User>) { 

    this.authservice.setmenu(true)
    this.activateroute.paramMap.subscribe(params=>{
      this.id=params.get('id')??""
      this.currency=this.authservice.getCurrency()
    })
  }

  ngOnInit() {
    /*this.userservice.GetListFromUser(this.authservice.getToken()).subscribe({
      next:(value)=>{
          this.list=value.find(c=>""+c.id==this.id)?.cryptos??[]
      },
    })*/
  }
  
  ionViewWillEnter() {
    this.subscriptions.push(this.userservice.GetListFromUser(this.id).subscribe({
      next:(value)=>{
          this.list=value.find(c=>c.id==this.id) || {id:-1+"",title:"",description:"",cryptos:[]}  
      },
    }))
  }

  addcrypto(){
    this.router.navigate(['search',this.id])
  }

  deletecrypto(event:string){
    let idcrypto:number=-1
    this.subscriptions.push(this.userservice.findcryptobyid(event).subscribe({
      next:(value)=>{
          if(value!="-1"){
            this.subscriptions.push(this.userservice.removeCryptoFromList(this.id,value).subscribe({
              next:(value)=>{
                  this.shared.showToast("success",this.translate.instant("CRYPTOLIST.CRYPTODELETESUCCESSFUL"))
                  let index=this.list.cryptos.findIndex(c=>c.id==event)
                  this.list.cryptos.splice(index,1)
              },error:(err)=>{
                this.shared.showToast("danger",this.translate.instant("CRYPTOLIST.CRYPTODELETEFAILED"))

              },
            }))
          }
      },
    })) 
  }

  ngOnDestroy(){
    this.subscriptions.forEach(c=>{
      c.unsubscribe()
    })
  }

}
