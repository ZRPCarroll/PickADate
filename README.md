# PickADate - Personal Connection Hub

A friendly, approachable personal website built with Vite + React + TypeScript + Firebase, designed for meeting new people and connecting over various activities through an interactive calendar booking system.

## 🌟 Features

- **Casual & Friendly Design**: Welcoming layout that encourages connection
- **Interactive Calendar Booking**: Custom-built calendar showing real-time availability
- **Firebase Backend**: Secure booking system with Firestore database
- **Automatic Time-Based Theming**: Site theme naturally follows the time of day
  - 🌅 Sunrise (5-8 AM): Soft pinks & warm yellows
  - ☀️ Morning (8 AM-12 PM): Warm & fresh
  - 🌤️ Afternoon (12-6 PM): Bright & energetic blues
  - 💜 Evening (6-9 PM): Soft lilac & lavender
  - 🌙 Night (9 PM-5 AM): Deep blues & purples
- **Booking Management**: Full booking form with activity type selection
- **Admin Dashboard**: Protected interface for managing availability and viewing bookings
- **Responsive Design**: Mobile-friendly and accessible across all screen sizes
- **Fast Performance**: Built with Vite for lightning-fast loading times
- **TypeScript**: Fully typed for better development experience

## 🎯 Purpose

This website serves as Zeph's personal connection hub - a place to meet new people and book time for various activities including:

- **Dating & Social**: Book for dates or set up blind dates for friends
- **Events**: Need a +1 for an event? Book here!
- **Help & Support**: Assistance with furniture assembly, computer help, etc.
- **Casual Hangouts**: Just want to hang out and meet someone new
- **Custom Activities**: Open to suggestions and other creative ideas

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn
- Firebase account (free tier works great)

### Installation & Development

1. **Clone and install dependencies:**
   ```bash
   git clone https://github.com/ZRPCarroll/PickADate.git
   cd PickADate
   npm install
   ```

2. **Set up Firebase:**
   - Follow the detailed guide in [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
   - Copy `.env.example` to `.env.local` and fill in your Firebase credentials

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:5173](http://localhost:5173) in your browser**

### Building for Production
```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🔗 Current Configuration

- **Firebase Firestore**: Real-time booking database
- **Firebase Authentication**: Secure admin access
- **Interactive Calendar**: Custom-built with date-fns
- **Personal Branding**: Customized for Zeph Carroll
- **Activity Focus**: Emphasizes social connection and varied interests
- **Automatic Theming**: Theme changes based on user's local time
  - Updates every minute to ensure accurate time-based theming
  - No user interaction needed - works automatically

## 📅 Using the Calendar System

### For Visitors (Booking Time)
1. Browse the interactive calendar
2. Click on a date with available slots (marked with a dot)
3. Select a time slot
4. Fill out the booking form with your details
5. Receive confirmation

### For Admin (Managing Availability)
1. Navigate to `/admin` route (you'll need to add React Router)
2. Log in with your Firebase admin credentials
3. Create availability slots
4. View and manage bookings
5. See booking details including contact info and preferences

## 🛠 Tech Stack

- **Vite**: Fast build tool and development server
- **React 19**: Modern React with hooks
- **TypeScript**: Type safety and better development experience
- **Firebase**: Backend services (Firestore + Authentication)
- **date-fns**: Powerful date utility library
- **CSS3**: Modern styling with CSS custom properties for theming
- **ESLint**: Code linting for quality assurance

## 🎨 Automatic Theme System

The site features an intelligent time-based theming system that automatically adjusts based on the user's local time to match the natural progression of the day:

### Time-Based Theme Schedule
- **🌅 Sunrise (5:00 AM - 7:59 AM)**: Soft pinks and warm yellows - gentle wake-up colors
- **☀️ Morning (8:00 AM - 11:59 AM)**: Warm and fresh tones - energizing start to the day  
- **🌤️ Afternoon (12:00 PM - 5:59 PM)**: Bright energetic blues - peak daylight energy
- **💜 Evening (6:00 PM - 8:59 PM)**: Soft lilac and lavender - calming twilight
- **🌙 Night (9:00 PM - 4:59 AM)**: Deep blues and purples - easy on the eyes for late browsing

### How It Works
- Automatically detects user's local time
- Updates theme every minute to ensure accuracy
- Smooth transitions between themes mirror natural daylight progression
- No user interaction required
- Works on all devices and time zones

### Customizing Theme Times
To adjust the time ranges, edit `src/AutoTheme.tsx` and modify the `getThemeByTime()` function.

## 🎨 Design Philosophy

The site maintains a balance between:
- **Professional appearance** - Clean, modern design
- **Approachable tone** - Casual, friendly copy that encourages interaction
- **Clear call-to-action** - Prominent booking button for easy scheduling
- **Transparency** - Honest about intentions and open to various activities

## 📱 Browser Support

This website supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

### GitHub Pages (Recommended - Free)

This site is configured for automatic deployment to GitHub Pages. Here's how to deploy:

#### First-Time Setup:
1. **Enable GitHub Pages** in your repository:
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Build and deployment", select **GitHub Actions** as the source
   - Save the settings

2. **Push your code** to the master branch:
   ```bash
   git add .
   git commit -m "Deploy website"
   git push origin master
   ```

3. **Automatic deployment** will begin immediately
   - GitHub Actions will build and deploy your site
   - Find your live site at: `https://zrpcarroll.github.io/PersonalSite/`
   - Check deployment status in the "Actions" tab on GitHub

#### Manual Deployment (Alternative):
```bash
npm run deploy
```

This will build and deploy to the gh-pages branch.

### Other Hosting Options

The built static files (`dist/` folder) can also be deployed to:
- **Netlify**: Drag & drop the `dist` folder at [netlify.com](https://netlify.com)
- **Vercel**: Connect your GitHub repo at [vercel.com](https://vercel.com)
- **Cloudflare Pages**: Deploy via GitHub integration
- **Firebase Hosting**: `npm install -g firebase-tools && firebase init`

## 📄 License

This project is open source and available under the MIT License.

---

Built with ❤️ by Zeph Carroll
