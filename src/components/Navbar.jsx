import { Link } from 'react-router-dom';
import { UserAuth } from '../context/UserContext';

export const Navbar = () => {
  const { user, logOut } = UserAuth();
  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-between items-center w-full sm:px-6 px-2 py-2 mb-2 border-b-2 border-solid border-blue-600">
      <h1 className="text-center sm:text-2xl text-xl font-bold">Workout Log</h1>
      {user?.displayName ? (
        <div className="flex items-center gap-2 justify-between">
          <h2 className="sm:text-xl text-l ">{user.displayName} </h2>
          <button onClick={handleLogOut}>Log Out</button>
        </div>
      ) : (
        <button>
          <Link to="/">Log in</Link>
        </button>
      )}
    </div>
  );
};
