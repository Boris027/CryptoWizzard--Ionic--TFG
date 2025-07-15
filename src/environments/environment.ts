// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  userapiurl:"http://localhost:1337/api/",
  userapilogin:"http://localhost:1337/api/auth/local",
  registerapiurl:"http://localhost:1337/api/auth/local/register",
  authenticationurl:"http://localhost:1337/api/users/me",
  uploadapi:"http://localhost:1337/api/upload",
  cryptoapiurl:"https://api.coingecko.com/api/v3/",
  cryptoken:"", //Here goes a token from CoinGecko. The token must be a test token.
  userCsv:"https://cryptowizzard-tfg.onrender.com/export-users",
  firebasedata:{
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
