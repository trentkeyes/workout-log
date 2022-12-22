import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { auth } from '../services/firebase';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

export function Login({ handleLogin }) {
  return <GoogleButton onClick={handleLogin}>Sign in with Google</GoogleButton>;
}
