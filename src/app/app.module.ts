import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AUTENTICATION_URL_TOKEN, AUTH_MAPPING_TOKEN, AUTH_TOKEN, BACKEND_TOKEN, CRYPTOTOKEN_TOKEN, CRYPTO_API_URL_TOKEN, CRYPTO_MAPPING_TOKEN, CRYPTO_SERVICE_TOKEN, FIREBASE_CONFIG_TOKEN, FIREBASE_MAIN_SERVICE, LOGIN_API_URL_TOKEN, REGISTER_API_URL_TOKEN, UPLOAD_API_URL_TOKEN, USER_API_URL_TOKEN, USER_MAPPING_TOKEN, USER_SERVICE_TOKEN } from './core/repositories/repository.tokens';
import { StrapiAutenticationService } from './core/services/impl/authentication/strapi-autentication.service';
import { AuthenticationMappingServiceFactory, AuthenticationServiceFactory, cryptofactoryservice, MediaServiceFactory, userfactoryservice, UserMappingFactory, UserServiceFactory } from './core/repositories/factory';
import { StrapiAuthMappingService } from './core/services/impl/authentication/strapi-auth-mapping.service';
import { provideLottieOptions } from 'ngx-lottie';
import { CryptoGeko } from './core/services/impl/crypto/CryptoGeko.service';
import { CoinGekoMapping } from './core/repositories/impl/crypto/CoinGekoMapping.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { FirebaseMainService } from './core/services/impl/firebasemain.service';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,AngularFireFunctionsModule  , IonicModule.forRoot(), AppRoutingModule,BrowserAnimationsModule,
    TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [HttpClient],
    }
  }),
  BrowserModule,
  BrowserAnimationsModule,
  
],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(),
    provideLottieOptions({
      player: () => import('lottie-web'),
    }),
    {provide: USER_API_URL_TOKEN, useValue:environment.userapiurl},
    {provide:LOGIN_API_URL_TOKEN, useValue:environment.userapilogin},
    {provide:REGISTER_API_URL_TOKEN,useValue:environment.registerapiurl},
    {provide:AUTENTICATION_URL_TOKEN,useValue:environment.authenticationurl},
    {provide:CRYPTO_API_URL_TOKEN,useValue:environment.cryptoapiurl},
    {provide:UPLOAD_API_URL_TOKEN,useValue:environment.uploadapi},
    {provide:CRYPTOTOKEN_TOKEN,useValue:environment.cryptoken},
    {provide:CRYPTO_SERVICE_TOKEN,useClass:CryptoGeko},
    {provide:CRYPTO_MAPPING_TOKEN,useClass:CoinGekoMapping},
    {provide:FIREBASE_MAIN_SERVICE,useClass:FirebaseMainService},
    {provide:FIREBASE_CONFIG_TOKEN, useValue:{
      apiKey: "AIzaSyA9vAyI9vLZwGm5uKy4gDwf3D5VAqoONgY",
      authDomain: "cryptowizzard-ef8fd.firebaseapp.com",
      projectId: "cryptowizzard-ef8fd",
      storageBucket: "cryptowizzard-ef8fd.firebasestorage.app",
      messagingSenderId: "643452286872",
      appId: "1:643452286872:web:5bc55e732f97813fa4dded",
      measurementId: "G-623G40JNKJ"
    }},
    {provide:BACKEND_TOKEN,useValue:'firebase'},
    AuthenticationMappingServiceFactory,
    AuthenticationServiceFactory,
    UserMappingFactory,
    cryptofactoryservice,
    userfactoryservice,
    MediaServiceFactory,
    UserServiceFactory,

    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
