# ZephSite - Personal Connection Hub

A friendly, approachable personal website built with Vite + React + TypeScript, designed for meeting new people and connecting over various activities through easy calendar booking.

## 🌟 Features

- **Casual & Friendly Design**: Welcoming layout that encourages connection
- **Multiple Theme Support**: 6 different color themes to choose from
  - Warm Sunset (default) - Cozy oranges and warm tones
  - Dark Mode - Midnight blue with cool accents
  - Ocean Breeze - Cool blues and teals
  - Forest - Earthy greens
  - Lavender Dream - Soft purples
  - Sunset Glow - Warm pinks and oranges
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
- **Theme System**: Built-in theme switcher with 6 color schemes
  - Themes are saved in localStorage for persistent user preference
  - Easy to add new themes by editing `src/themes.css`

## 🛠 Tech Stack

- **Vite**: Fast build tool and development server
- **React 18**: Modern React with hooks
- **TypeScript**: Type safety and better development experience
- **CSS3**: Modern styling with CSS custom properties for theming
- **ESLint**: Code linting for quality assurance

## 🎨 Theme System

The site includes a comprehensive theming system built with CSS custom properties (variables):

### Available Themes
1. **Warm Sunset** (Default) - Cozy, warm oranges and browns
2. **Dark Mode** - Midnight blue with cool blue accents
3. **Ocean Breeze** - Fresh blues and teals
4. **Forest** - Natural greens and earth tones
5. **Lavender Dream** - Soft purples and lavenders
6. **Sunset Glow** - Warm pinks and oranges

### How It Works
- Click the theme picker button (🎨) in the top-right corner
- Choose from 6 pre-built themes
- Your selection is saved automatically in localStorage
- Theme persists across page refreshes

### Adding New Themes
To add a new theme, edit `src/themes.css` and add a new `[data-theme="your-theme"]` block with your custom color variables. Then update `src/ThemeSwitcher.tsx` to include the new theme in the themes array.

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
