import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CryptoList } from 'src/app/core/models/CryptoList.model';
import { User } from 'src/app/core/models/User.model';
import { AUTH_TOKEN, USER_SERVICE_TOKEN } from 'src/app/core/repositories/repository.tokens';
import { IAuthenticationService } from 'src/app/core/services/interfaces/authentication/authentication.interface';
import { IUserbaseService } from 'src/app/core/services/interfaces/user/User-base-service.interface';
import { SharedService } from 'src/app/shared/sharedservice/shared.service';

/**
 * ListcontentPage component.
 * 
 * Displays the content of a specific crypto list by id.
 * Allows adding cryptos via navigation and deleting cryptos from the list.
 */
@Component({
  selector: 'app-listcontent',
  templateUrl: './listcontent.page.html',
  styleUrls: ['./listcontent.page.scss'],
})
export class ListcontentPage {
  id:string=""
  currency:string=""
  list:CryptoList={id:-1+"",title:"",description:"",cryptos:[]}
  private subscriptions:Subscription[]=[]

  /**
   * Creates an instance of ListcontentPage.
   * @param authservice Authentication service to get session info and currency
   * @param activateroute Route service to get route parameters
   * @param router Router to navigate to other pages
   * @param shared Shared service for utilities like toast messages
   * @param translate TranslateService for i18n
   * @param userservice User service to fetch and modify user data
   */
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
  
  /**
   * Ionic lifecycle hook called when the view is about to enter.
   * Loads the list content by id.
   */
  ionViewWillEnter() {
    this.subscriptions.push(this.userservice.GetListFromUser(this.id).subscribe({
      next:(value)=>{
          this.list=value.find(c=>c.id==this.id) || {id:-1+"",title:"",description:"",cryptos:[]}  
      },
    }))
  }

  /**
   * Navigates to the search page to add a crypto to the current list.
   */
  addcrypto(){
    this.router.navigate(['search',this.id])
  }

  /**
   * Deletes a crypto from the current list.
   * First finds the crypto by id, then calls the removal API and updates UI.
   * @param event Id of the crypto to delete
   */
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

  /**
   * Lifecycle hook called on component destroy.
   * Unsubscribes all subscriptions to avoid memory leaks.
   */
  ngOnDestroy(){
    this.subscriptions.forEach(c=>{
      c.unsubscribe()
    })
  }
}