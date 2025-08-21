import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth, onAuthStateChanged, isDemoMode } from './firebase';
import Navbar from './components/Navbar';
import Board from './pages/Board';
import Feed from './pages/Feed';
import Login from './pages/Login';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hamburg-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Hamburg Monopoly Challenge...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {isDemoMode && (
          <div className="bg-blue-100 border-b border-blue-200 p-3 text-center">
            <p className="text-blue-800 text-sm">
              🎮 <strong>Demo Mode</strong> - No Firebase setup required! 
              <span className="ml-2">📝 To use real Firebase, update the config in src/firebase.js</span>
            </p>
          </div>
        )}
        <Navbar user={user} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/" 
              element={<Navigate to="/board" replace />} 
            />
            <Route 
              path="/board" 
              element={user ? <Board user={user} /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/feed" 
              element={user ? <Feed user={user} /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/login" 
              element={user ? <Navigate to="/board" replace /> : <Login />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
