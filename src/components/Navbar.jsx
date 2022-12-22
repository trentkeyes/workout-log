import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

export const Navbar = () => {
  const user = useContext(UserContext);
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
        <div>
          <h2>Welcome, {user.displayName} </h2>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <button>
          <Link to="/signin">Sign in</Link>
        </button>
      )}
    </div>
  );
};
