import { Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import { Signin } from './views/Signin';
import { Account } from './views/Account';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        {/* Navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </AuthContextProvider>

      <div className="firebase-auth-container">hiii</div>
    </div>
  );
}

export default App;
