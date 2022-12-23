import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { UserAuth } from '../context/UserContext';
import { GoogleButton } from 'react-google-button';

export function Login() {
  const { googleLogin, user } = UserAuth();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      await googleLogin();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate('/home');
    }
  }, [user]);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold py-6">Log in</h1>
      <GoogleButton
        label="Log in with Google"
        className="mx-auto"
        onClick={handleLogin}
      ></GoogleButton>
    </div>
  );
}
