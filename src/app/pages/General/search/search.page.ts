import { Component, Inject, OnInit } from '@angular/core';
import { BasicCrypto } from 'src/app/core/models/Crypto.model';
import { AUTH_TOKEN, CRYPTO_SERVICE_TOKEN, USER_SERVICE_TOKEN } from 'src/app/core/repositories/repository.tokens';
import { ICryptobaseService } from 'src/app/core/services/interfaces/crypto/Crypto-base-service.interface';
import { IAuthenticationService } from 'src/app/core/services/interfaces/authentication/authentication.interface';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserbaseService } from 'src/app/core/services/interfaces/user/User-base-service.interface';
import { User } from 'src/app/core/models/User.model';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/app/shared/sharedservice/shared.service';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { Capacitor } from '@capacitor/core';

declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
/**
 * Component that provides search functionality for cryptocurrencies.
 * It allows navigation to detail views or adding cryptos to a user list.
 * Includes voice search via Capacitor or WebKit-based recognition.
 */
export class SearchPage implements OnInit {
  idlist:string=""
  searchinput:string=""
  private susbscriptions:Subscription[]=[]

  /**
   * Constructor to inject services and initialize route params.
   *
   * @param authservice Auth service for user session and config.
   * @param translate Translate service for i18n.
   * @param shared Shared service for common helpers like toast.
   * @param activateroute Current activated route.
   * @param router Angular router for navigation.
   * @param userservice User-related data service.
   * @param cryptoservice Crypto service for querying data.
   */
  constructor(
    @Inject(AUTH_TOKEN) private authservice:IAuthenticationService,
    private translate: TranslateService,
    private shared:SharedService,
    private activateroute:ActivatedRoute,
    private router:Router,
    @Inject(USER_SERVICE_TOKEN) private userservice:IUserbaseService<User>,
    @Inject(CRYPTO_SERVICE_TOKEN) private cryptoservice:ICryptobaseService<BasicCrypto>,
  ) { 
    this.authservice.setmenu(true)
    this.activateroute.paramMap.subscribe(params=>{
      this.idlist=params.get('id')??""
    })
  }

  hardlist:BasicCrypto[]=[]
  list:BasicCrypto[]=[]
  currency=this.authservice.getCurrency()

  /**
   * Lifecycle hook that initializes voice recognition and fetches the list of cryptos.
   */
  ngOnInit() {
    this.init()
    this.susbscriptions.push(this.cryptoservice.getAllSimple().subscribe({
      next:(value)=>{
        this.hardlist.push(...value)
        this.list=value
      },
    }))
  }

  /**
   * Filters the crypto list based on search input value.
   *
   * @param event Event containing the search string.
   */
  filterfinal(event: any){
    let value=event.detail.value
    
    this.list=this.hardlist.filter(c=>c.name.includes(value))
  }

  /**
   * Handles click on a crypto. Navigates or adds crypto to user list.
   *
   * @param id ID of the selected crypto.
   */
  async click(id:string){
    if(this.idlist==""){
      this.router.navigate(['/cryptoview',id,this.currency])
    }else{
      let idfinal=await this.getcryptobyid(""+id)
      if(idfinal+""!="-1"){
        let data=await this.addcryptotolist(this.idlist,idfinal+"",id)
        this.shared.showToast("success",this.translate.instant("CRYPTOLIST.CRYPTOADDEDSUCCESSFUL"))
        this.router.navigate(['/listcontent',this.idlist])
      }else{
        idfinal=await this.addcryptotodatabase(id)
        this.click(id)
      }
    }
  }

  /**
   * Returns the ID of a crypto from the user database, or -1 if not found.
   *
   * @param idcrypto ID of the crypto to search.
   * @returns Promise resolving to the database crypto ID.
   */
  async getcryptobyid(idcrypto:string):Promise<number>{
    return new Promise<number>((resolve,reject)=>{
      this.susbscriptions.push(this.userservice.findcryptobyid(idcrypto).subscribe({
        next:(value)=>{
            resolve(value)
        },
      }))
    })
  }

  /**
   * Adds a crypto to the user database.
   *
   * @param id Crypto ID to add.
   * @returns Promise that resolves when complete.
   */
  async addcryptotodatabase(id:string){
    return new Promise<any>((resolve,reject)=>{
      this.susbscriptions.push(this.userservice.addcryptotodatabase(this.list.filter(c=>c.id==id)[0]).subscribe({
        next:(value)=>{
            resolve(value)
        },
      }))
    })
  }

  /**
   * Adds a crypto to a user list.
   *
   * @param idlist ID of the list.
   * @param idcrypto ID of the crypto in DB.
   * @param idcryptoxd External ID of the crypto (e.g., from API).
   * @returns Promise that resolves when added.
   */
  async addcryptotolist(idlist:string,idcrypto:string,idcryptoxd:string){
    let crypto=this.list.filter(c=>c.id==idcryptoxd)[0]
    return new Promise<any>((resolve,reject)=>{
      this.susbscriptions.push(this.userservice.addCryptoToList(idlist,idcrypto,crypto).subscribe({
        next:(value)=>{
          resolve(value)
        },
      }))
    })
  }

  /**
   * Starts voice recognition using Capacitor or WebKit fallback.
   * Updates the search input once speech is detected.
   */
  async takevoice() {
    if(Capacitor.isNativePlatform()){
      try{
        await SpeechRecognition.requestPermissions();
      
        await SpeechRecognition.available();
    
        const result = await SpeechRecognition.start({
          language: "es-ES",
          maxResults: 1,
        });
        
        const spokenText = result.matches[0];
        
        this.searchinput=spokenText
        this.filterfinal({detail:{value:spokenText}})
      } catch (error) {
        console.error('Error en el reconocimiento de voz:', error);
      }
    }else{
      this.start()
      this.susbscriptions.push(this.textemporal.subscribe({
        next:(value)=>{
          if(value!=""){
            this.searchinput=value
            this.filterfinal({detail:{value:value}})
          }
        },
      }))
    }
    
  }

  /**
   * Angular lifecycle hook called when the component is destroyed.
   * Unsubscribes from all active subscriptions to prevent memory leaks.
   */
  ngOnDestroy(){
    this.susbscriptions.forEach(c=>{
      c.unsubscribe()
    })
  }

  inactivitytimeout:any
  recognition = new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  textemporal: BehaviorSubject<string> =new BehaviorSubject<string>("");
  text: string = '';

  /**
   * Initializes speech recognition configuration and timeout handler.
   */
  init() {
    this.recognition.addEventListener('result', (event: any) => {
      const transcript = event.results[0][0].transcript
      if (event.results[0].isFinal) {
        this.textemporal.next(transcript);
      }

      clearTimeout(this.inactivitytimeout);
      this.inactivitytimeout = setTimeout(() => {
        this.stop();
      }, 3000); 
    });
  }

  /**
   * Starts speech recognition using WebKit engine.
   */
  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
  }

  /**
   * Stops speech recognition and stores the last spoken text.
   */
  stop() {
    this.isStoppedSpeechRecog = true;
    this.juntartexto();
    this.recognition.stop();
  }

  /**
   * Combines spoken text results and resets the temporary buffer.
   */
  juntartexto() {
    this.text = `${this.text} ${this.textemporal}.`;
    this.textemporal.next('');
  }
}