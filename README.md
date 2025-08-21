# Hamburg Monopoly Challenge

A React-based web application that turns exploring Hamburg into a fun, interactive game! Players roll dice to move around a virtual board featuring Hamburg's iconic locations, complete challenges, and share their adventures with other players.

## 🎮 Features

### Core Game
- **Monopoly-style Board**: 16 Hamburg locations including Elbphilharmonie, Reeperbahn, Fischmarkt, and more
- **Dice Rolling**: Interactive dice with animation and random movement
- **Player Tracking**: Visual player token and progress tracking
- **Location Challenges**: Unique challenges for each Hamburg location

### Social Features
- **Photo/Video Uploads**: Upload proof of challenge completion
- **Community Feed**: View and vote on other players' submissions
- **Real-time Updates**: Live feed with Firebase real-time database
- **Voting System**: Like and rank the best submissions

### Authentication
- **Google Sign-in**: Secure authentication with Firebase Auth
- **User Profiles**: Display user avatars and names
- **Session Management**: Persistent login state

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MonopolyMakeHamburgGreatAgain
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication (Google provider)
   - Create a Firestore database
   - Enable Storage
   - Get your Firebase config

4. **Configure Firebase**
   - Open `src/firebase.js`
   - Replace the placeholder config with your actual Firebase configuration:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "your-messaging-sender-id",
     appId: "your-app-id"
   };
   ```

5. **Set up Firestore Security Rules**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /submissions/{document} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```

6. **Set up Storage Security Rules**
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /submissions/{userId}/{allPaths=**} {
         allow read: if true;
         allow write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

7. **Start the development server**
   ```bash
   npm run dev
   ```

8. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx      # Navigation bar
│   └── ChallengeModal.jsx # Challenge upload modal
├── data/               # Static data
│   ├── boardData.js    # Hamburg locations
│   └── challengesData.js # Location challenges
├── pages/              # Page components
│   ├── Board.jsx       # Main game board
│   ├── Feed.jsx        # Submissions feed
│   └── Login.jsx       # Authentication page
├── firebase.js         # Firebase configuration
├── App.jsx             # Main app component
├── main.jsx            # App entry point
└── index.css           # Global styles
```

## 🎯 How to Play

1. **Sign In**: Use Google authentication to create an account
2. **Roll Dice**: Click the dice button to move around the board
3. **Complete Challenges**: When you land on a location, complete the assigned challenge
4. **Upload Proof**: Take a photo or video and upload it as proof
5. **Share & Vote**: View other players' submissions and vote for your favorites
6. **Explore**: Visit all 16 Hamburg locations to complete the game!

## 🎨 Customization

### Adding New Locations
Edit `src/data/boardData.js` to add new Hamburg locations:
```javascript
{
  id: 16,
  name: "New Location",
  description: "Description of the location",
  icon: "🎯",
  color: "bg-purple-500"
}
```

### Adding New Challenges
Edit `src/data/challengesData.js` to add challenges for locations:
```javascript
16: [
  "Take a photo with the new landmark",
  "Record a video of the area",
  "Complete a specific task"
]
```

## 🚀 Deployment

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

### Other Platforms
The app can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Hamburg's iconic locations and landmarks
- Firebase for the backend infrastructure
- React and Tailwind CSS communities
- All the players who will explore Hamburg through this game!

---

**Made with ❤️ for Hamburg!** 🇩🇪
