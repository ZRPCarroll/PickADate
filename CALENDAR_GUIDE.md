# Custom Calendar Feature - Quick Start Guide

## What's New? 🎉

Your site now has a **fully functional custom calendar booking system** powered by Firebase! Visitors can browse your availability in a beautiful interactive calendar and book time slots directly.

## Key Features Added

### 1. **Interactive Calendar Component**
- Monthly calendar view with navigation
- Visual indicators for available slots (dots on dates)
- Click a date to see available time slots
- Mobile-responsive design

### 2. **Booking System**
- Multi-step booking flow
- Activity type selection (hangout, date, tech help, etc.)
- Contact information collection
- Success confirmation modal

### 3. **Admin Dashboard**
- Secure login with Firebase Authentication
- Create availability slots quickly
- View all bookings in one place
- See customer details and preferences

### 4. **Firebase Backend**
- Firestore database for storing slots and bookings
- Authentication for admin access
- Security rules to protect data
- Real-time updates

## Getting Started (3 Simple Steps)

### Step 1: Set Up Firebase (15 minutes)
Follow the detailed guide in `FIREBASE_SETUP.md`:
1. Create a free Firebase project
2. Enable Firestore and Authentication
3. Copy your Firebase config
4. Add credentials to `.env.local`

### Step 2: Create Your First Availability Slots
1. Run the app: `npm run dev`
2. Go to `http://localhost:5173/admin`
3. Log in with your Firebase admin account
4. Create some availability slots for the coming weeks

### Step 3: Test the Booking Flow
1. Go back to `http://localhost:5173`
2. Click on a date with available slots
3. Select a time
4. Fill out the booking form
5. Check the admin dashboard to see your booking!

## File Structure

```
src/
├── components/
│   ├── Calendar.tsx          # Interactive calendar component
│   ├── Calendar.css
│   ├── BookingForm.tsx       # Booking form with validation
│   ├── BookingForm.css
│   ├── BookingSuccess.tsx    # Success modal
│   ├── BookingSuccess.css
│   ├── Admin.tsx             # Admin dashboard
│   └── Admin.css
├── services/
│   ├── firebase.ts           # Firebase initialization
│   └── calendarService.ts    # Firestore operations
├── types/
│   └── calendar.ts           # TypeScript types
└── App.tsx                   # Updated main app
```

## Customization Ideas

### Change Slot Durations
Edit the admin form in `Admin.tsx` to allow different durations (30 min, 1 hour, 2 hours, etc.)

### Add Email Notifications
Use Firebase Cloud Functions to send confirmation emails when bookings are created.

### Customize Activity Types
Edit `src/types/calendar.ts` to add/remove activity types:
```typescript
export type ActivityType = 
  | 'hangout'
  | 'date'
  | 'your-custom-type'; // Add here
```

### Change Calendar Theme
Colors automatically match your time-of-day themes! Adjust in the respective `.css` files.

## URLs

- **Main Site**: `http://localhost:5173/`
- **Admin Dashboard**: `http://localhost:5173/admin`

## Common Tasks

### Create Multiple Slots Quickly
In the admin dashboard, you can create slots one by one. For bulk creation, you could:
1. Use the Firebase Console directly
2. Build a bulk import feature in the admin panel
3. Create a script to generate recurring availability

### View Bookings
1. Go to `/admin`
2. Click "Refresh" to see latest bookings
3. All booking details are displayed including contact info

### Cancel/Modify a Booking
Currently you'd need to:
1. Mark the slot as available again in Firestore
2. Consider adding a status update feature in the admin panel

## Security Notes

- **Never commit `.env.local`** - it's in `.gitignore`
- Only you can access the admin panel (requires authentication)
- Anyone can view available slots and create bookings (by design)
- Firestore rules protect sensitive data

## Deployment

### Before Deploying:
1. Set up environment variables in your hosting platform
2. Update Firestore rules for production
3. Test the booking flow thoroughly
4. Consider adding email notifications

### For GitHub Pages:
```bash
npm run build
npm run deploy
```

Make sure to set environment variables in GitHub Secrets if using GitHub Actions.

## Next Steps

Consider enhancing with:
- [ ] Email confirmations (Firebase Cloud Functions + SendGrid)
- [ ] SMS reminders (Twilio integration)
- [ ] Calendar file (.ics) downloads
- [ ] Booking cancellation/rescheduling
- [ ] Recurring availability rules
- [ ] Buffer time between bookings
- [ ] Integration with Google Calendar
- [ ] Analytics dashboard
- [ ] Customer reviews/testimonials after meetups

## Troubleshooting

**Calendar not showing slots?**
- Make sure you've created slots in the admin dashboard
- Check that dates are in the future
- Verify `available: true` in Firestore

**Can't log in to admin?**
- Verify user exists in Firebase Authentication
- Check console for errors
- Ensure Firebase is initialized correctly

**Booking not saving?**
- Check browser console for errors
- Verify Firestore rules allow writes
- Check network tab for failed requests

## Support

For detailed Firebase setup instructions, see `FIREBASE_SETUP.md`.
For general project info, see `README.md`.

---

**You're all set!** 🚀 Your custom calendar booking system is ready to help you connect with new people in a more organized and professional way.
