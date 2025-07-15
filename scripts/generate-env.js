const fs = require('fs');

const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
  production: true,
  userapiurl: "${process.env.USER_API_URL || 'http://localhost:1337/api/'}",
  userapilogin: "${process.env.USER_API_LOGIN || 'http://localhost:1337/api/auth/local'}",
  registerapiurl: "${process.env.REGISTER_API_URL || 'http://localhost:1337/api/auth/local/register'}",
  authenticationurl: "${process.env.AUTHENTICATION_URL || 'http://localhost:1337/api/users/me'}",
  uploadapi: "${process.env.UPLOAD_API || 'http://localhost:1337/api/upload'}",
  cryptoapiurl: "${process.env.CRYPTO_API_URL || 'https://api.coingecko.com/api/v3/'}",
  cryptoken: "${process.env.CRYPTO_TOKEN || ''}",
  userCsv: "${process.env.USER_CSV || 'https://cryptowizzard-tfg.onrender.com/export-users'}",
  firebasedata: {
    apiKey: "${process.env.FIREBASE_API_KEY || ''}",
    authDomain: "${process.env.FIREBASE_AUTH_DOMAIN || ''}",
    projectId: "${process.env.FIREBASE_PROJECT_ID || ''}",
    storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET || ''}",
    messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID || ''}",
    appId: "${process.env.FIREBASE_APP_ID || ''}",
    measurementId: "${process.env.FIREBASE_MEASUREMENT_ID || ''}"
  }
};
`;

fs.writeFile(targetPath, envConfigFile, (err) => {
  if (err) {
    console.error('Error writing environment.prod.ts file:', err);
  } else {
    console.log('environment.prod.ts file generated successfully.');
  }
});