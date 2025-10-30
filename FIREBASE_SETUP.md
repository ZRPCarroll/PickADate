# Firebase Setup Guide for PickADate

This guide will help you set up Firebase for your PickADate calendar booking system.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "pickadate")
4. Disable Google Analytics (optional)
5. Click "Create project"

## Step 2: Set Up Firestore Database

1. In Firebase Console, click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in production mode"
4. Select a location close to your users
5. Click "Enable"

### Configure Firestore Rules

Go to the "Rules" tab and replace with these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read available slots
    match /availableSlots/{slotId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Allow anyone to create bookings, but only admins can read/update
    match /bookings/{bookingId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

## Step 3: Set Up Authentication

1. Click "Authentication" in the left sidebar
2. Click "Get started"
3. Click "Email/Password" under Sign-in method
4. Enable "Email/Password" (leave Email link disabled)
5. Click "Save"

### Add Admin User

1. Go to the "Users" tab
2. Click "Add user"
3. Enter your email and password
4. Click "Add user"

## Step 4: Get Firebase Configuration

1. Click the gear icon ⚙️ next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps"
4. Click the web icon (`</>`)
5. Register your app (give it a nickname like "pickadate-web")
6. Copy the configuration object

## Step 5: Configure Your App

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in the values from your Firebase config:
   ```env
   VITE_FIREBASE_API_KEY=your-api-key-here
   VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
   ```

3. **Important**: Add `.env.local` to `.gitignore` (it should already be there)

## Step 6: Initialize Firestore Collections

You can create the initial collections through the Firebase Console or they will be created automatically when you use the app.

### Create Sample Availability Slots (Optional)

In Firestore Console, create a collection called `availableSlots` with documents like:

```json
{
  "date": "2025-11-15",
  "startTime": "14:00",
  "endTime": "15:00",
  "duration": 60,
  "available": true,
  "createdAt": [Firebase Timestamp]
}
```

## Step 7: Access Admin Panel

1. Run your app: `npm run dev`
2. Navigate to `/admin` (you'll need to add routing - see below)
3. Log in with your admin credentials
4. Create availability slots
5. View bookings

## Step 8: Add Routing for Admin (Optional but Recommended)

Install React Router:
```bash
npm install react-router-dom
```

Then update your `main.tsx` to include routing between the main app and admin panel.

## Security Best Practices

1. **Never commit `.env.local`** to version control
2. Keep your Firebase API key secure
3. Use Firebase Firestore Rules to restrict data access
4. Only add trusted users as admin accounts
5. Consider adding email verification for bookings
6. Set up Firebase App Check for additional security

## Deployment Notes

### For GitHub Pages:

Update your `.env.local` values to production values before building:
```bash
npm run build
```

### For Vercel/Netlify:

Add environment variables in your hosting platform's dashboard.

## Firestore Data Structure

### Collections

#### `availableSlots`
- `date` (string): ISO date (YYYY-MM-DD)
- `startTime` (string): HH:mm (24-hour format)
- `endTime` (string): HH:mm (24-hour format)
- `duration` (number): minutes
- `available` (boolean): true if not booked
- `createdAt` (timestamp)

#### `bookings`
- `slotId` (string): Reference to availableSlots doc
- `date` (string): ISO date
- `startTime` (string): HH:mm
- `endTime` (string): HH:mm
- `name` (string): Booker's name
- `email` (string): Booker's email
- `phone` (string): Optional phone number
- `activityType` (string): Type of activity
- `message` (string): Optional message
- `status` (string): 'pending' | 'confirmed' | 'cancelled' | 'completed'
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

## Troubleshooting

### "Permission denied" errors
- Check your Firestore Rules
- Make sure you're authenticated for admin operations

### Slots not showing up
- Check that `available` is set to `true`
- Verify date format is correct (YYYY-MM-DD)
- Check browser console for errors

### Can't log in to admin
- Verify user exists in Firebase Authentication
- Check that email/password is correct
- Look for errors in browser console

## Next Steps

Consider adding:
- Email notifications using Firebase Cloud Functions
- SMS reminders using Twilio
- Calendar invites (ICS files)
- Automatic slot generation
- Booking confirmations
- Payment integration
