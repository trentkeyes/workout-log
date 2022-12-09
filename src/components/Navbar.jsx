import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between w-full p-4">
      <h1 className="text-center text-2xl font-bold">Navbar</h1>
      {user?.displayName ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <Link to="/signin">Sign in</Link>
      )}
    </div>
  );
};
