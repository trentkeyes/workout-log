import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAbhUmDXmckiiF0I0vpxUERnWAD4-0PZ0M',
  authDomain: 'workout-tracker-53d60.firebaseapp.com',
  projectId: 'workout-tracker-53d60',
  storageBucket: 'workout-tracker-53d60.appspot.com',
  messagingSenderId: '646501551161',
  appId: '1:646501551161:web:6f26f49c489afe13b811e8',
  measurementId: 'G-Q0YCC9KJTD',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
