import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../context/AuthContext';

const Signin = () => {
  const { googleSignIn } = UserAuth();
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Sign in page</h1>
      <div className="m-auto py-4">
        <GoogleButton onClick={handleGoogleSignIn} />
      </div>
    </div>
  );
};

export { Signin };
