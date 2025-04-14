import { Component, Inject } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { AUTH_TOKEN, USER_SERVICE_TOKEN } from './core/repositories/repository.tokens';
import { IAuthenticationService } from './core/services/interfaces/authentication/authentication.interface';
import { Router } from '@angular/router';
import { TranslationService } from './core/services/impl/translation.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { UserBaseService } from './core/services/impl/user/base-user.service';
import { BasicUser, User } from './core/models/User.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    @Inject(AUTH_TOKEN) private auth:IAuthenticationService,
    @Inject(USER_SERVICE_TOKEN) private userservice:UserBaseService<User>,
    private alertcontroller:AlertController,
    private menuController: MenuController,
    private router:Router,
    private translation:TranslationService,
    private translate: TranslateService,
  ) {
    /*this.translate.use(translation.getCurrentLanguage()).subscribe(() => {
    });*/
    this.subscriptions.push(this.translate.onLangChange.subscribe((event:LangChangeEvent)=>{
      // Cambia el idioma al detectar un cambio en este
      this.setMenuTitles(this.translation.getCurrentLanguage()); 
    }))
  }

  subscriptions:Subscription[]=[]
  user:BasicUser={id:"",username:"",email:"",img:"",gender:'',isAdmin:false}

  private setMenuTitles(lang:string) {
    this.subscriptions.push(this.translate.use(lang).subscribe(() => {
      this.translate.get('MAINMENU.HOME').subscribe((translation) => {
        this.appPages[0].title = translation;
      });
      this.translate.get('MAINMENU.SEARCH').subscribe((translation) => {
        this.appPages[1].title = translation;
      });
      this.translate.get('MAINMENU.LIST').subscribe((translation) => {
        this.appPages[2].title = translation;
      });
      this.translate.get('MAINMENU.PROFILE').subscribe((translation) => {
        this.appPages[3].title = translation;
      });
      this.translate.get('MAINMENU.LANGUAGE').subscribe((translation) => {
        this.appPages[4].title = translation;
      });
      this.translate.get('MAINMENU.ABOUTUS').subscribe((translation) => {
        this.appPages[5].title = translation;
      });
      this.translate.get('MAINMENU.ADMINPANEL').subscribe((translation) => {
        this.appPages[6].title = translation;
      });
      this.translate.get('MAINMENU.LOGOUT').subscribe((translation) => {
        this.appPages[7].title = translation;
      });
    }));


    
  }
  

  public appPages = [
    { title: this.translate.get("MAINMENU.HOME"), url: '/home', icon: 'Home' },
    { title: this.translate.instant("MAINMENU.SEARCH"), url: '/search', icon: 'Search' },
    { title: this.translate.instant("MAINMENU.LIST"), url: '/list', icon: 'star' },
    { title: this.translate.instant("MAINMENU.PROFILE"), url: '/profile', icon: 'person' },
    { title: this.translate.instant("MAINMENU.LANGUAGE"), url: '/language', icon: 'language' },
    { title: this.translate.instant("MAINMENU.ABOUTUS"), url: '/about', icon: 'information' },
    { title: this.translate.instant("MAINMENU.ADMINPANEL"), url: '/admin-panel', icon: 'people' },
    { title: this.translate.instant("MAINMENU.LOGOUT"), url: '/logout', icon: 'log-out' }
  ];

  


  ngOnInit(){
    this.subscriptions.push(this.translate.get("COMMON.LANGUAGE").subscribe({
      next:(value)=>{
      },
    }))



    this.subscriptions.push(this.auth.verificateUser().subscribe({
      next:(value)=>{
          this.vermenu=value
      },
    }))

    this.subscriptions.push(this.userservice.GetBasicUser().subscribe({
      next:(value)=>{
        if(value.isAdmin==false){
          this.appPages=this.appPages.filter(c=>c.url!="/admin-panel")
        }
      },
    }))

    this.subscriptions.push(this.userservice.GetBehaviourUser().subscribe({
      next:(value)=>{
        
          this.user=value
      },
    }))

  }

  vermenu:boolean=true

  openMenu() {
    this.menuController.open(); 
  }


  async navigate(argu: string) {
    if(argu=="/logout"){
      const alert=await this.alertcontroller.create({
        header:this.translate.instant("COMMON.CLOSESESSION"),
        buttons:[{
          text:this.translate.instant("COMMON.YES"),
          handler:()=>{
            this.auth.Logout()
            this.router.navigate(["/splash"])
          },
        },{
          text:this.translate.instant("COMMON.NO"),
          handler:()=>{
            
          }
        }]
      })
      alert.dismiss()
      await alert.present()
    }else if(argu=="/language"){
      console.log(this.translation.getCurrentLanguage())
      const alert = await this.alertcontroller.create({
        header: this.translate.instant('MAINMENU.SELECTLANGUAGE'), 
        inputs: [
          {
            name: 'language',
            type: 'radio',
            label: this.translate.instant('COMMON.ENGLISH'),
            value: 'en', 
            checked: this.translation.getCurrentLanguage() === 'en', 
          },
          {
            name: 'language',
            type: 'radio',
            label: this.translate.instant('COMMON.SPANISH'),
            value: 'es', 
            checked: this.translation.getCurrentLanguage() === 'es',
          },
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
                this.translation.setLanguage(data)
                this.translate.use(data)
                this.setMenuTitles(data)
                console.log(data)
              }
            },
          },
        ],
      });
  
      await alert.present();
    }else{
      this.router.navigate([argu])
    }
  }


  ngOnDestroy(){
    this.subscriptions.forEach(c=>{
      c.unsubscribe()
    })
  }

}
