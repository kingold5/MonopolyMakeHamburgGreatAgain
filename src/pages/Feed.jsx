import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { Heart, MessageCircle, Calendar, MapPin } from 'lucide-react';

const Feed = ({ user }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [votedSubmissions, setVotedSubmissions] = useState(new Set());

  useEffect(() => {
    // Subscribe to submissions collection
    const q = query(collection(db, 'submissions'), orderBy('votes', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const submissionsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSubmissions(submissionsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleVote = async (submissionId) => {
    if (votedSubmissions.has(submissionId)) {
      return; // Already voted
    }

    try {
      const submissionRef = doc(db, 'submissions', submissionId);
      await updateDoc(submissionRef, {
        votes: increment(1)
      });
      
      setVotedSubmissions(prev => new Set([...prev, submissionId]));
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Just now';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hamburg-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Challenge Submissions
        </h1>
        <p className="text-gray-600">
          See how other players are completing their Hamburg challenges!
        </p>
      </div>

      {submissions.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">📸</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No submissions yet
          </h3>
          <p className="text-gray-600">
            Be the first to complete a challenge and share your adventure!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {submissions.map((submission) => (
            <div key={submission.id} className="card">
              {/* Header */}
              <div className="flex items-center space-x-3 mb-4">
                {submission.userPhotoURL ? (
                  <img
                    src={submission.userPhotoURL}
                    alt={submission.userName}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 bg-hamburg-100 rounded-full flex items-center justify-center">
                    <span className="text-hamburg-600 font-semibold">
                      {submission.userName?.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {submission.userName}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{submission.locationName}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatTimestamp(submission.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Challenge */}
              <div className="bg-hamburg-50 rounded-lg p-4 mb-4">
                <p className="text-gray-700 font-medium">
                  "{submission.challenge}"
                </p>
              </div>

              {/* Media */}
              <div className="mb-4">
                {submission.fileType?.startsWith('image/') ? (
                  <img
                    src={submission.fileURL}
                    alt="Challenge submission"
                    className="w-full rounded-lg max-h-96 object-cover"
                  />
                ) : (
                  <video
                    src={submission.fileURL}
                    controls
                    className="w-full rounded-lg max-h-96"
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleVote(submission.id)}
                    disabled={votedSubmissions.has(submission.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      votedSubmissions.has(submission.id)
                        ? 'bg-red-100 text-red-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${
                      votedSubmissions.has(submission.id) ? 'fill-current' : ''
                    }`} />
                    <span>{submission.votes || 0}</span>
                  </button>
                  
                  <div className="flex items-center space-x-2 text-gray-500">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">0</span>
                  </div>
                </div>

                <div className="text-sm text-gray-500">
                  {submission.fileType?.startsWith('image/') ? '📸 Photo' : '🎥 Video'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
