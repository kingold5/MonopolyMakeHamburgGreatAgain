import { Link, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { LogOut, User } from 'lucide-react';

const Navbar = ({ user }) => {
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/board" className="flex items-center space-x-2">
            <div className="text-2xl">🏠</div>
            <span className="text-xl font-bold text-hamburg-600">
              Hamburg Monopoly Challenge
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/board"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/board'
                  ? 'bg-hamburg-100 text-hamburg-700'
                  : 'text-gray-600 hover:text-hamburg-600 hover:bg-hamburg-50'
              }`}
            >
              Board
            </Link>
            <Link
              to="/feed"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/feed'
                  ? 'bg-hamburg-100 text-hamburg-700'
                  : 'text-gray-600 hover:text-hamburg-600 hover:bg-hamburg-50'
              }`}
            >
              Feed
            </Link>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-hamburg-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-hamburg-600" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">
                    {user.displayName || user.email}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:block text-sm">Sign Out</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="btn-primary"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
