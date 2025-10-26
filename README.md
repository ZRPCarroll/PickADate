# ZephSite - Personal Connection Hub

A friendly, approachable personal website built with Vite + React + TypeScript, designed for meeting new people and connecting over various activities through easy calendar booking.

## 🌟 Features

- **Casual & Friendly Design**: Welcoming layout that encourages connection
- **Automatic Time-Based Theming**: Site theme naturally follows the time of day
  - 🌅 Sunrise (5-8 AM): Soft pinks & warm yellows
  - ☀️ Morning (8 AM-12 PM): Warm & fresh
  - 🌤️ Afternoon (12-6 PM): Bright & energetic blues
  - 💜 Evening (6-9 PM): Soft lilac & lavender
  - 🌙 Night (9 PM-5 AM): Deep blues & purples
- **Google Calendar Integration**: Direct booking link for easy scheduling
- **Activity Suggestions**: Clear ideas for potential meetups and activities
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

### Installation & Development
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production
```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🔗 Current Configuration

- **Google Calendar**: Already configured with live booking link
- **Personal Branding**: Customized for Zeph Carroll
- **Activity Focus**: Emphasizes social connection and varied interests
- **Automatic Theming**: Theme changes based on user's local time
  - Updates every minute to ensure accurate time-based theming
  - No user interaction needed - works automatically

## 🛠 Tech Stack

- **Vite**: Fast build tool and development server
- **React 18**: Modern React with hooks
- **TypeScript**: Type safety and better development experience
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

The built static files can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting
- AWS S3 + CloudFront

## 📄 License

This project is open source and available under the MIT License.
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
