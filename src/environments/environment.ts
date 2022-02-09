/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // apiUrl: 'http://meddylex-001-site1.itempurl.com',
  apiUrl: 'http://localhost:3001',
  firebase: {
    apiKey: "AIzaSyBsZneAtAa52L5UkPe7bQlP9sVbq--Wc0M",
    authDomain: "baseparkway-stemcell.firebaseapp.com",
    databaseURL: "https://baseparkway-stemcell-default-rtdb.firebaseio.com",
    projectId: "baseparkway-stemcell",
    storageBucket: "baseparkway-stemcell.appspot.com",
    messagingSenderId: "960193853545",
    appId: "1:960193853545:web:94e05764e2249bda498af8",
    measurementId: "G-9C4TWCKQBL"
  }
};