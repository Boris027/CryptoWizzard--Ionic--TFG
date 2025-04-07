import { Component, Inject } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IonInfiniteScrollCustomEvent } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AdvancedCrypto, BasicCrypto } from 'src/app/core/models/Crypto.model';
import { User } from 'src/app/core/models/User.model';
import { AUTH_TOKEN, CRYPTO_SERVICE_TOKEN, USER_SERVICE_TOKEN } from 'src/app/core/repositories/repository.tokens';
import { TranslationService } from 'src/app/core/services/impl/translation.service';
import { IAuthenticationService } from 'src/app/core/services/interfaces/authentication/authentication.interface';
import { ICryptobaseService } from 'src/app/core/services/interfaces/crypto/Crypto-base-service.interface';
import { IUserbaseService } from 'src/app/core/services/interfaces/user/User-base-service.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  public crypto:AdvancedCrypto[]=[]
  page:number=1;
  perpage:number=250;
  currency:string="usd"
  private suscriptions:Subscription[]=[]
  constructor(
    @Inject(AUTH_TOKEN) private authservice:IAuthenticationService,
    private translate: TranslateService,
    private translation: TranslationService,
    @Inject(USER_SERVICE_TOKEN) private userservice:IUserbaseService<User>,
    @Inject(CRYPTO_SERVICE_TOKEN) private cryptoservice:ICryptobaseService<BasicCrypto>,
    private alertcontroller:AlertController
  ) {
    
    
  }

  ngOnInit(){
    this.currency=this.authservice.getCurrency()
    this.authservice.setmenu(true)
    this.loadData()
  }

  ionViewWillEnter(){
    this.suscriptions.push(this.userservice.GetBasicUser().subscribe())
    this.authservice.setmenu(true)
    
    if(this.authservice.getCurrency()!=this.currency){
      this.currency=this.authservice.getCurrency()
      this.page=1
      this.crypto=[]
      this.loadData()
    }
    
  }

  

  loadData(notify: HTMLIonInfiniteScrollElement | null = null){
    this.suscriptions.push(this.cryptoservice.getAllPaginated(this.page,this.perpage,this.currency).subscribe({
      next:(value)=>{
          this.crypto.push(...value)
          this.page+=1;
          notify?.complete()
      },
    }))
  }

  onIonInfinite($event: IonInfiniteScrollCustomEvent<void>) {
    this.loadData($event.target)
  }

  ngOnDestroy(){
    this.suscriptions.forEach(c=>{
      c.unsubscribe()
    })
  }

  async changecurrency(){
    const alert = await this.alertcontroller.create({
      header: this.translate.instant('CRYPTOVIEW.SELECTCURRENCY'), 
      inputs: [
        {
          name: 'language',
          type: 'radio',
          label: this.translate.instant('CURRENCY.DOLLAR')+" ($)",
          value: 'usd', 
          checked: this.currency === 'usd', 
        },
        {
          name: 'language',
          type: 'radio',
          label: this.translate.instant('CURRENCY.EURO')+" (€)",
          value: 'eur', 
          checked: this.currency === 'eur',
        },
        {
          name: 'language',
          type: 'radio',
          label: this.translate.instant('CURRENCY.LIBRA')+" (£)",
          value: 'gbp', 
          checked: this.currency === 'gbp',
        }
      ],
      buttons: [
        {
          text: this.translate.instant('COMMON.CANCEL'), 
          role: 'cancel',
        },
        {
          text: this.translate.instant('COMMON.SAVE'),
          handler: (data) => {
            if (data) {
              if(data!=this.currency){
                this.page=0;
                this.crypto=[]
                this.currency=data
                this.loadData()
              }
            }
          },
        },
      ],
    });

    await alert.present();
  }

}
