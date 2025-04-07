import { ChangeDetectorRef, Component, HostListener, Inject, OnInit } from '@angular/core';
import { BasicCrypto } from 'src/app/core/models/Crypto.model';
import { AUTH_TOKEN, CRYPTO_SERVICE_TOKEN, USER_SERVICE_TOKEN } from 'src/app/core/repositories/repository.tokens';
import { TranslationService } from 'src/app/core/services/impl/translation.service';
import { ICryptobaseService } from 'src/app/core/services/interfaces/crypto/Crypto-base-service.interface';
import { IAuthenticationService } from 'src/app/core/services/interfaces/authentication/authentication.interface';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
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

export class SearchPage implements OnInit {


  

  idlist:string=""
  searchinput:string=""
  private susbscriptions:Subscription[]=[]
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


  ngOnInit() {
    this.init()
    this.susbscriptions.push(this.cryptoservice.getAllSimple().subscribe({
      next:(value)=>{
        this.hardlist.push(...value)
        this.list=value
      },
    }))
  }

  filterfinal(event: any){
    let value=event.detail.value
    
    this.list=this.hardlist.filter(c=>c.name.includes(value))
  }

  async click(id:string){
    if(this.idlist==""){
      this.router.navigate(['/cryptoview',id,this.currency])
    }else{
      
      let idfinal=await this.getcryptobyid(""+id)
      if(idfinal+""!="-1"){
        let data=await this.addcryptotolist(this.idlist,idfinal+"",id)
        console.log(data)
        this.shared.showToast("success",this.translate.instant("CRYPTOLIST.CRYPTOADDEDSUCCESSFUL"))
        this.router.navigate(['/listcontent',this.idlist])
      }else{
        idfinal=await this.addcryptotodatabase(id)
        this.click(id)
      }
    }
  }

  async getcryptobyid(idcrypto:string):Promise<number>{
    return new Promise<number>((resolve,reject)=>{
      this.susbscriptions.push(this.userservice.findcryptobyid(idcrypto).subscribe({
        next:(value)=>{
            resolve(value)
        },
      }))
    })
  }

  async addcryptotodatabase(id:string){
    return new Promise<any>((resolve,reject)=>{
      this.susbscriptions.push(this.userservice.addcryptotodatabase(this.list.filter(c=>c.id==id)[0]).subscribe({
        next:(value)=>{
            resolve(value)
        },
      }))
    })
  }

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

  async takevoice() {
    //comprueba si capacitor esta disponible, en cuyo caso usa capacitor para reconocer la voz, si no funciona o esta disponible usará una opción del navegador, pero la verdad que no va muy bien
    if(Capacitor.isNativePlatform()){
      try{
        //pide los permisos
        await SpeechRecognition.requestPermissions();
      
        // comprueba si el reconocimiento de voz se puede usar
        await SpeechRecognition.available();
    
        //inicia el reconocimiento de voz
        const result = await SpeechRecognition.start({
          language: "es-ES", //para cambiar el idioma
          maxResults: 1,     //para obtener solo un resultado
        });
    
        //se guarda el resultado del reconocimiento de voz
        const spokenText = result.matches[0]; //el unico resultado que da
    
        //cambiar el texto en el input
        this.searchinput=spokenText
        //filtrar en la lista
        this.filterfinal({detail:{value:spokenText}})
      } catch (error) {
        console.error('Error en el reconocimiento de voz:', error);
      }
    }else{
      //empieza a captar audio, cuando termine de hacerlo la suscripción al behavioursubject saltará y se cambiara el texto del input
      //y también se buscará
      this.start()
      this.susbscriptions.push(this.textemporal.subscribe({
        next:(value)=>{
          if(value!=""){
            //cambiar el texto en el input
            this.searchinput=value
            //filtrar en la lista
            this.filterfinal({detail:{value:value}})
          }
        },
      }))
    }
    
  }

 ngOnDestroy(){
  this.susbscriptions.forEach(c=>{
    c.unsubscribe()
  })
 }


 /*Todos los métodos para grabar la voz, desde navegador*/
 inactivitytimeout:any
 recognition = new webkitSpeechRecognition();
 isStoppedSpeechRecog = false;
 textemporal: BehaviorSubject<string> =new BehaviorSubject<string>("");
 text: string = '';
 init() {
    //esta pendiente todo viendo si entra audio
    this.recognition.addEventListener('result', (event: any) => {
      console.log(event)
      //se extrae el texto del audio
      const transcript = event.results[0][0].transcript
      console.log(transcript)
      // Si es el resultado final, guarda la transcripción
      if (event.results[0].isFinal) {
        this.textemporal.next(transcript);
        console.log('Texto final:', this.textemporal); // Muestra el texto final
      } else {
        console.log('Texto intermedio:', transcript); // Muestra los resultados intermedios (opcional)
      }

      // Reinicia el temporizador de inactividad cuando recibe nuevos resultados
      clearTimeout(this.inactivitytimeout);
      this.inactivitytimeout = setTimeout(() => {
        // Detiene el reconocimiento despues de 3 segundos de inactividad
        this.stop();
      }, 3000); 
    });
  }

  //función que pone la variable de que ha parado en falso, activa el reconocimiento
  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log('Reconocimiento empezado');
  }

  //función que pone la variable de que ha parado en true, desactiva el reconocimiento
  stop() {
    this.isStoppedSpeechRecog = true;
    this.juntartexto();
    this.recognition.stop();
    console.log('Reconocimiento terminado');
  }
  //función que va concatenando el texto
  juntartexto() {
    this.text = `${this.text} ${this.textemporal}.`;
    this.textemporal.next('');
  }

  

}
