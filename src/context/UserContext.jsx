import { useContext, createContext } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../services/firebase';
import { useState, useEffect } from 'react';
import { addUser } from '../services/api';
import { Navigate } from 'react-router-dom';

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('User', currentUser);
      if (currentUser) {
        addUser({ id: currentUser.uid, email: currentUser.email });
      }

      <Navigate to="/home" />;
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ googleLogin, logOut, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
