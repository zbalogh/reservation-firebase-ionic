// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyAgBzwaMKv7H9Z_rwH_se5o9CMrqgc2j24",
    authDomain: "reservation-gui.firebaseapp.com",
    projectId: "reservation-gui",
    storageBucket: "reservation-gui.appspot.com",
    messagingSenderId: "550151776440",
    appId: "1:550151776440:web:fdcd027525abf9db4eec4d",
    measurementId: "G-MM9YMY8J01"
  },
  NUMBER_OF_ALL_DESKS: 100 
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
