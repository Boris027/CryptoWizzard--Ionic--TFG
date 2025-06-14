import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { delay, Subject, Subscription, timer } from 'rxjs';
import { AUTH_TOKEN } from 'src/app/core/repositories/repository.tokens';
import { IAuthenticationService } from 'src/app/core/services/interfaces/authentication/authentication.interface';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone:true,
  imports: [LottieComponent,IonicModule]
})
export class SplashPage implements OnInit {

  constructor(
    private router:Router,
    @Inject(AUTH_TOKEN) private auth:IAuthenticationService
  ) {
   }
  

  options: AnimationOptions = {
    path: ('/assets/lottie/loadinglottie.json')
    
  };

  private subscriptions: Subscription[] = []; // Lista de suscripciones


  initSubscriptions() {

    let valor=""
    const sub1=this.auth.GetUser().subscribe({
      next:(value)=>{
          valor="home"
      },
      error:(err)=>{
          valor="login"
      },
    })
    this.subscriptions.push(sub1);


    const sub2=timer(1500).subscribe({
      next:(value)=>{
        this.router.navigate(['/'+valor]).then(() => {
          if(valor=="login"){
            location.reload()
          }
        })
      },error:(err)=>{
        this.router.navigate(['/'+valor])
      },
    })


    this.subscriptions.push(sub2);

    
  }

  ionViewWillEnter() {
    this.initSubscriptions()
  }

  ngOnInit(): void {
    this.initSubscriptions()
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

}
