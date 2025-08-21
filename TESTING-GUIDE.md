# Testing Guide - Hamburg Monopoly Challenge

## 🎮 Demo Mode Testing

The app runs in **Demo Mode** by default, so you can test all features without setting up Firebase!

### Current Status
- **Dev Server**: http://localhost:5173/
- **Mode**: Demo (no Firebase required)
- **Features**: All functional with mock data

## 🧪 Test Procedures

### 1. **Basic Navigation Test**
1. Open http://localhost:5173/
2. Should redirect to `/board`
3. Check demo mode banner appears
4. Navigate between Board and Feed pages

### 2. **Authentication Test (Demo)**
1. Click "Sign In" or go to `/login`
2. Click "Continue with Google"
3. Should sign in as "Demo Player"
4. Check user avatar appears in navbar
5. Test sign out functionality

### 3. **Board Game Test**
1. Go to `/board` (signed in)
2. Click "Roll Dice" button
3. Watch dice animation (1-6)
4. Player token should move
5. Check progress tracking updates
6. Test visiting multiple locations

### 4. **Challenge Modal Test**
1. Roll dice and land on any location (not Start)
2. Challenge modal should appear
3. Try uploading a test image/video
4. Check file validation (size/type)
5. Submit challenge or skip

### 5. **Feed Test**
1. Go to `/feed`
2. Should see demo submissions
3. Test voting on submissions
4. Check real-time updates
5. Verify submission display

### 6. **Responsive Design Test**
1. Test on mobile viewport (DevTools)
2. Check tablet viewport
3. Verify all buttons are accessible
4. Test navigation on mobile

## 🎯 Expected Behaviors

### ✅ What Should Work
- [x] Dice rolling with animation
- [x] Player movement around board
- [x] Challenge modal display
- [x] File upload simulation
- [x] Demo authentication
- [x] Feed with mock submissions
- [x] Voting system
- [x] Responsive design
- [x] Navigation between pages

### 📝 Demo Limitations
- File uploads are simulated (not actually saved)
- Authentication uses mock Google sign-in
- Submissions are pre-populated demo data
- No real-time sync between browser instances

## 🔧 Real Firebase Testing

To test with real Firebase:

1. **Set up Firebase Project**:
   ```bash
   # Use the setup script
   node setup-firebase.js
   
   # Or manually edit src/firebase.js
   ```

2. **Configure Firebase Console**:
   - Enable Authentication (Google provider)
   - Create Firestore Database
   - Enable Storage
   - Set up security rules

3. **Test Real Features**:
   - Real Google authentication
   - Actual file uploads to Storage
   - Live Firestore data
   - Real-time synchronization

## 🚀 Deployment Testing

### Build Test
```bash
npm run build
# Should complete without errors
```

### Local Production Test
```bash
npm run preview
# Test production build locally
```

### Firebase Hosting
```bash
npm run deploy
# Deploys to Firebase Hosting
```

## 🐛 Troubleshooting

### Common Issues
1. **Server not responding**: Check npm run dev is running
2. **Demo mode not working**: Check console for errors
3. **Styling issues**: Verify Tailwind CSS is loaded
4. **Build failures**: Check for TypeScript/linting errors

### Console Messages
- Demo mode: "🎮 Running in DEMO MODE"
- File operations: "Mock: [operation] [details]"
- Authentication: Demo user login/logout

## 📊 Test Results Template

Use this checklist when testing:

```
Hamburg Monopoly Challenge - Test Results
Date: ___________

✅ Basic Navigation
✅ Demo Authentication  
✅ Board Game Mechanics
✅ Challenge Modal
✅ File Upload Simulation
✅ Feed Display
✅ Voting System
✅ Responsive Design
✅ Build Process
✅ Demo Mode Banner

Issues Found:
- [ ] Issue 1: ___________
- [ ] Issue 2: ___________

Overall Status: ✅ PASS / ❌ FAIL
```

## 🔄 Next Steps After Testing

1. **If Demo Works**: Configure real Firebase
2. **If Issues Found**: Check console errors, fix bugs
3. **For Production**: Deploy and test live environment
4. **For Customization**: Add more locations/challenges
