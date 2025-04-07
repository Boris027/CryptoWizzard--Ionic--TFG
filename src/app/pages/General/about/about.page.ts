import { Component, Inject, OnInit } from '@angular/core';
import { AUTH_TOKEN } from 'src/app/core/repositories/repository.tokens';
import { IAuthenticationService } from 'src/app/core/services/interfaces/authentication/authentication.interface';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(
    @Inject(AUTH_TOKEN) private authservice:IAuthenticationService,
  ) { }

  ngOnInit() {
    this.authservice.setmenu(true)
  }

}
