import { useState, useEffect, createContext, useContext } from 'react';
import { Route, Routes, redirect, Navigate } from 'react-router-dom';
import Home from './views/Home';
import { Login } from './views/Signin';
import { Account } from './views/Account';
import { Navbar } from './components/Navbar';
import { AuthContextProvider, UserAuth } from './context/AuthContext';
import { auth } from './services/firebase';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  const handleLogin = async () => {
    console.log('click');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      console.log(result.user);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(user);
  // useEffect(() => {
  //   const unsubscribe = auth().onAuthStateChanged((user) => {
  //     setUser(user);
  //   });
  //   return () => unsubscribe();
  // }, []);

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login handleLogin={handleLogin} />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/account" element={<Account />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
export { UserContext };
