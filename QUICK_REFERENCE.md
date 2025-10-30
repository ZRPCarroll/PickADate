# PickADate - Quick Reference

## 🚀 Development Commands

```bash
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run deploy   # Deploy to GitHub Pages
```

## 📍 Routes

- `/` - Main booking page (public)
- `/admin` - Admin dashboard (requires login)

## 🔑 Environment Variables

Required in `.env.local`:
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

## 📦 Key Dependencies

- `react` - UI framework
- `react-router-dom` - Routing
- `firebase` - Backend services
- `date-fns` - Date utilities
- `vite` - Build tool

## 🗂️ Firestore Collections

### `availableSlots`
```javascript
{
  date: "2025-11-15",        // YYYY-MM-DD
  startTime: "14:00",        // HH:mm (24h)
  endTime: "15:00",          // HH:mm (24h)
  duration: 60,              // minutes
  available: true,           // boolean
  createdAt: timestamp
}
```

### `bookings`
```javascript
{
  slotId: "abc123",          // reference
  date: "2025-11-15",
  startTime: "14:00",
  endTime: "15:00",
  name: "John Doe",
  email: "john@example.com",
  phone: "555-1234",         // optional
  activityType: "hangout",   // see types below
  message: "Looking forward to meeting!",
  status: "pending",         // pending|confirmed|cancelled|completed
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## 🎯 Activity Types

- `hangout` - Just hang out
- `date` - Date
- `blind-date` - Blind date for a friend
- `event-plus-one` - +1 for an event
- `help-furniture` - Help with furniture
- `help-tech` - Computer/tech help
- `other` - Something else

## 🎨 Theme Times

- **Sunrise** 🌅: 5:00 AM - 7:59 AM
- **Morning** ☀️: 8:00 AM - 11:59 AM
- **Afternoon** 🌤️: 12:00 PM - 5:59 PM
- **Evening** 💜: 6:00 PM - 8:59 PM
- **Night** 🌙: 9:00 PM - 4:59 AM

## 📖 Documentation Files

- `README.md` - Project overview
- `FIREBASE_SETUP.md` - Firebase configuration guide
- `CALENDAR_GUIDE.md` - Calendar feature walkthrough
- `QUICK_REFERENCE.md` - This file

## 🔒 Security Rules (Firestore)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /availableSlots/{slotId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /bookings/{bookingId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

## 🐛 Common Issues

**Issue:** Calendar shows no slots
**Fix:** Create slots in admin dashboard first

**Issue:** Can't login to admin
**Fix:** Add user in Firebase Console → Authentication

**Issue:** Build error about Firebase
**Fix:** Ensure `.env.local` exists with correct values

**Issue:** Dates not showing as available
**Fix:** Check `available: true` and date is in future

## 🎯 Typical Workflow

1. **Initial Setup** (one-time)
   - Set up Firebase project
   - Configure `.env.local`
   - Create admin user

2. **Creating Availability**
   - Login to `/admin`
   - Create time slots for upcoming weeks
   - Verify slots appear on main calendar

3. **Managing Bookings**
   - Check admin dashboard regularly
   - Review booking details
   - Reach out to bookers

4. **Deployment**
   - Test locally first
   - Set environment variables in hosting platform
   - Build and deploy
   - Test production site

## 💡 Pro Tips

- Create slots in batches for multiple weeks
- Check bookings daily during busy periods
- Customize activity types for your needs
- Use consistent time slots for easier management
- Consider buffer time between bookings
- Back up your Firestore data regularly

---

Last updated: October 30, 2025
