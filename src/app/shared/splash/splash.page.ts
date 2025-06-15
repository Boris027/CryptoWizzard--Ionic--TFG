import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { Subscription, timer } from 'rxjs';
import { AUTH_TOKEN } from 'src/app/core/repositories/repository.tokens';
import { IAuthenticationService } from 'src/app/core/services/interfaces/authentication/authentication.interface';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone:true,
  imports: [LottieComponent,IonicModule]
})
/**
 * Splash screen page that shows a loading animation on app startup.
 * 
 * The component verifies the user authentication status and then
 * navigates to either the "home" page (if authenticated) or the
 * "login" page (if not).
 * 
 * Includes a Lottie animation displayed during the splash screen.
 * 
 * Subscriptions are managed and cleaned up on component destruction.
 */
export class SplashPage implements OnInit {
  constructor(
    private router:Router,
    @Inject(AUTH_TOKEN) private auth:IAuthenticationService
  ) { }

  options: AnimationOptions = {
    path: ('/assets/lottie/loadinglottie.json')
    
  };

  private subscriptions: Subscription[] = [];

  /**
   * Initializes subscriptions to check authentication and
   * navigate accordingly after a timer delay.
   */
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

  /**
   * Called each time the view is about to enter.
   * Re-initializes the subscriptions.
   */
  ionViewWillEnter() {
    this.initSubscriptions()
  }

  /**
   * Angular lifecycle hook for component initialization.
   */
  ngOnInit(): void {
    this.initSubscriptions()
  }

  /**
   * Angular lifecycle hook for component destruction.
   * Cleans up all subscriptions.
   */
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}