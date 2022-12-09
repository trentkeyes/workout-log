// var firebase = require('firebase');
// var firebaseui = require('firebaseui');

// // Initialize the FirebaseUI Widget using Firebase.
// var ui = new firebaseui.auth.AuthUI(firebase.auth());

// export { ui };

// import React, { useEffect } from 'react';
// import * as firebaseui from 'firebaseui';
// import 'firebaseui/dist/firebaseui.css';
// import firebase from 'firebase/compat/app';
// import { auth } from './firebase';

// const Auth = () => {
//   useEffect(() => {
//     const ui =
//       firebaseui.auth.AuthUI.getInstance() ||
//       new firebaseui.auth.AuthUI(firebase.auth());
//     ui.start('.firebase-auth-container', {
//       signInOptions: [
//         {
//           provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
//           requireDisplayName: false,
//         },
//       ],
//       signInSuccessUrl: '/authenticated',
//       privacyPolicyUrl: '<your-privacy-policy-url>',
//     });
//   }, []);
// };

// export { Auth };
