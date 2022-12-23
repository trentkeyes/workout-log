import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { Login } from './pages/Login';
import { Protected } from './components/Protected';
import { Navbar } from './components/Navbar';
import { UserContextProvider } from './context/UserContext';

export default function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
        </Routes>
      </UserContextProvider>
    </div>
  );
}
