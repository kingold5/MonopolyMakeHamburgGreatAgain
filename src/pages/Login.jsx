import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { Chrome } from 'lucide-react';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setError('Failed to sign in with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="text-6xl mb-4">🏠</div>
          <h2 className="text-3xl font-bold text-gray-900">
            Hamburg Monopoly Challenge
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to start your Hamburg adventure!
          </p>
        </div>

        <div className="card">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Welcome to the Game
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Explore Hamburg's most iconic locations, complete challenges, and share your adventures with other players!
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-3 bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-hamburg-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
              ) : (
                <Chrome className="w-5 h-5" />
              )}
              <span className="font-medium">
                {loading ? 'Signing in...' : 'Continue with Google'}
              </span>
            </button>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                By signing in, you agree to our terms of service and privacy policy.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
            <div className="text-2xl">🎵</div>
            <div className="text-2xl">🎭</div>
            <div className="text-2xl">🐟</div>
            <div className="text-2xl">🏛️</div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Discover Elbphilharmonie, Reeperbahn, Fischmarkt, and more!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
