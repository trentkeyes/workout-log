import { auth } from "./firebase";

import { Button } from 'react-bootstrap';

export function GoogleSignInButton() {
  const handleClick = async () => {
    try {
      const provider = new auth.GoogleAuthProvider();
      const result = await auth().signInWithPopup(provider);
      console.log(result.user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button onClick={handleClick}>
      Sign in with Google
    </Button>
  );
}




