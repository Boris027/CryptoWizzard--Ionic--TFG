import { Component, Inject, OnInit } from '@angular/core';
import { AUTH_TOKEN } from 'src/app/core/repositories/repository.tokens';
import { IAuthenticationService } from 'src/app/core/services/interfaces/authentication/authentication.interface';

/**
 * AboutPage component.
 * 
 * This component represents the About page of the application.
 * On initialization, it sets the menu visibility to true using the authentication service.
 */
@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  /**
   * Creates an instance of AboutPage.
   * @param authservice The authentication service used to manage auth state and UI.
   */
  constructor(
    @Inject(AUTH_TOKEN) private authservice:IAuthenticationService,
  ) { }

  /**
   * Lifecycle hook called on component initialization.
   * Sets the menu to be visible.
   */
  ngOnInit() {
    this.authservice.setmenu(true)
  }
}