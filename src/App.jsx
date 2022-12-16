import { Route, Routes, redirect, Navigate } from 'react-router-dom';
import Home from './views/Home';
import { Signin } from './views/Signin';
import { Account } from './views/Account';
import { Navbar } from './components/Navbar';
import { AuthContextProvider, UserAuth } from './context/AuthContext';

function App() {
  console.log(UserAuth());
  return (
    <div className="App">
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/account" element={<Account />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
