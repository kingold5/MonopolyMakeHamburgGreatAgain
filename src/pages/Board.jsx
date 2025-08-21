import { useState, useEffect } from 'react';
import { boardData } from '../data/boardData';
import { challengesData } from '../data/challengesData';
import ChallengeModal from '../components/ChallengeModal';
import { Dice6 } from 'lucide-react';

const Board = ({ user }) => {
  const [playerPosition, setPlayerPosition] = useState(0);
  const [visitedSquares, setVisitedSquares] = useState(new Set([0]));
  const [diceValue, setDiceValue] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [showChallenge, setShowChallenge] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(null);

  const rollDice = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    setDiceValue(null);
    
    // Simulate dice rolling animation
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
    }, 100);
    
    setTimeout(() => {
      clearInterval(rollInterval);
      const finalValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(finalValue);
      setIsRolling(false);
      
      // Move player
      const newPosition = (playerPosition + finalValue) % boardData.length;
      setPlayerPosition(newPosition);
      setVisitedSquares(prev => new Set([...prev, newPosition]));
      
      // Show challenge if not on start square
      if (newPosition !== 0) {
        const challenges = challengesData[newPosition];
        const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
        setCurrentChallenge({
          location: boardData[newPosition],
          challenge: randomChallenge
        });
        setShowChallenge(true);
      }
    }, 1000);
  };

  const closeChallenge = () => {
    setShowChallenge(false);
    setCurrentChallenge(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Hamburg Monopoly Challenge
        </h1>
        <p className="text-gray-600">
          Roll the dice and explore Hamburg's iconic locations!
        </p>
      </div>

      {/* Game Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Player Info</h3>
          <div className="flex items-center space-x-3">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 bg-hamburg-100 rounded-full flex items-center justify-center">
                <span className="text-hamburg-600 font-semibold">
                  {user.displayName?.charAt(0) || user.email?.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <p className="font-medium">{user.displayName || user.email}</p>
              <p className="text-sm text-gray-500">
                Position: {boardData[playerPosition].name}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Dice</h3>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-16 h-16 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center text-2xl font-bold">
              {diceValue || '?'}
            </div>
            <button
              onClick={rollDice}
              disabled={isRolling}
              className="btn-primary flex items-center space-x-2"
            >
              <Dice6 className="w-5 h-5" />
              <span>{isRolling ? 'Rolling...' : 'Roll Dice'}</span>
            </button>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Progress</h3>
          <div className="text-center">
            <p className="text-2xl font-bold text-hamburg-600">
              {visitedSquares.size - 1}
            </p>
            <p className="text-sm text-gray-500">
              Locations visited
            </p>
            <p className="text-sm text-gray-500">
              {Math.round(((visitedSquares.size - 1) / (boardData.length - 1)) * 100)}% complete
            </p>
          </div>
        </div>
      </div>

      {/* Game Board */}
      <div className="card">
        <div className="grid grid-cols-5 gap-2">
          {boardData.map((square, index) => {
            const isVisited = visitedSquares.has(index);
            const isCurrentPosition = playerPosition === index;
            
            return (
              <div
                key={square.id}
                className={`board-square ${isVisited ? 'board-square-visited' : ''} ${
                  isCurrentPosition ? 'ring-4 ring-hamburg-600' : ''
                } p-4 text-center relative`}
              >
                <div className="text-3xl mb-2">{square.icon}</div>
                <h3 className="font-semibold text-sm mb-1">{square.name}</h3>
                <p className="text-xs text-gray-500">{square.description}</p>
                
                {/* Player Token */}
                {isCurrentPosition && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-hamburg-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    👤
                  </div>
                )}
                
                {/* Visited Indicator */}
                {isVisited && !isCurrentPosition && (
                  <div className="absolute top-1 right-1 w-3 h-3 bg-hamburg-500 rounded-full"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Challenge Modal */}
      {showChallenge && currentChallenge && (
        <ChallengeModal
          challenge={currentChallenge}
          onClose={closeChallenge}
          user={user}
        />
      )}
    </div>
  );
};

export default Board;
