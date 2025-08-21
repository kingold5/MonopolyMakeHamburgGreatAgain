// Demo Firebase configuration for local testing
// This allows you to test the app without setting up Firebase

// Mock Firebase Auth
export const mockAuth = {
  currentUser: null,
  signInWithPopup: async (provider) => {
    // Simulate successful Google sign-in
    const mockUser = {
      uid: 'demo-user-123',
      displayName: 'Demo Player',
      email: 'demo@hamburg-monopoly.com',
      photoURL: 'https://via.placeholder.com/40x40/0284c7/white?text=D'
    };
    mockAuth.currentUser = mockUser;
    // Trigger auth state change
    if (mockAuth.onAuthStateChanged) {
      mockAuth.onAuthStateChanged(mockUser);
    }
    return { user: mockUser };
  },
  signOut: async () => {
    mockAuth.currentUser = null;
    if (mockAuth.onAuthStateChanged) {
      mockAuth.onAuthStateChanged(null);
    }
  },
  onAuthStateChanged: null
};

// Mock Firestore
export const mockDb = {
  collection: (collectionName) => ({
    addDoc: async (data) => {
      console.log(`Mock: Adding document to ${collectionName}:`, data);
      return { id: `mock-doc-${Date.now()}` };
    },
    query: () => ({
      orderBy: () => ({
        onSnapshot: (callback) => {
          // Return mock submissions
          const mockSubmissions = [
            {
              id: 'demo-submission-1',
              data: () => ({
                userId: 'demo-user-456',
                userName: 'Hamburg Explorer',
                userPhotoURL: 'https://via.placeholder.com/40x40/0369a1/white?text=H',
                locationName: 'Elbphilharmonie',
                challenge: 'Take a photo with the Elbphilharmonie in the background',
                fileURL: 'https://via.placeholder.com/400x300/0ea5e9/white?text=Demo+Photo',
                fileType: 'image/jpeg',
                votes: 5,
                timestamp: { toDate: () => new Date(Date.now() - 86400000) }
              })
            },
            {
              id: 'demo-submission-2',
              data: () => ({
                userId: 'demo-user-789',
                userName: 'Reeperbahn Fan',
                userPhotoURL: 'https://via.placeholder.com/40x40/ef4444/white?text=R',
                locationName: 'Reeperbahn',
                challenge: 'Take a photo with the Reeperbahn sign',
                fileURL: 'https://via.placeholder.com/400x300/ef4444/white?text=Demo+Video',
                fileType: 'video/mp4',
                votes: 3,
                timestamp: { toDate: () => new Date(Date.now() - 43200000) }
              })
            }
          ];
          
          setTimeout(() => {
            callback({
              docs: mockSubmissions
            });
          }, 500);
          
          // Return unsubscribe function
          return () => console.log('Mock: Unsubscribed from submissions');
        }
      })
    })
  }),
  doc: (collection, docId) => ({
    updateDoc: async (data) => {
      console.log(`Mock: Updating document ${docId} in ${collection}:`, data);
    }
  })
};

// Mock Storage
export const mockStorage = {
  ref: (path) => ({
    uploadBytes: async (file) => {
      console.log(`Mock: Uploading file to ${path}:`, file.name);
      return { ref: { fullPath: path } };
    },
    getDownloadURL: async () => {
      // Return a placeholder image URL
      return `https://via.placeholder.com/400x300/0ea5e9/white?text=${encodeURIComponent('Demo Upload')}`;
    }
  })
};

// Demo mode flag
export const isDemoMode = true;

// Export the demo services
export const auth = mockAuth;
export const db = mockDb;
export const storage = mockStorage;
export const googleProvider = {};

export default null;
