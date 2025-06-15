# URL Shortener

A modern URL shortening service with a React frontend built with Vite and styled with Tailwind CSS.

## Features

- Fast URL shortening with modern UI
- Responsive design with custom gradients
- Google Fonts integration (Roboto & Montserrat)
- Custom Tailwind theme with brand colors
- ESLint code quality enforcement

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS with custom configuration
- **Fonts**: Google Fonts (Roboto, Montserrat)
- **Linting**: ESLint with React plugins
- **Build Tool**: Vite with React plugin

## Project Structure

```
url-shortener/
├── url-shortener-frontend/
│   ├── src/
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── eslint.config.js
└── README.md
```

## Installation

```bash
git clone https://github.com/ag863k/url-shortener.git
cd url-shortener/url-shortener-frontend
npm install
npm run dev
```

## Scripts

```bash
npm run dev      # Start development server (localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Custom Tailwind Configuration

The project includes custom Tailwind settings:

```javascript
// Custom colors
colors: {
  navbarColor: "#ffffff",
  btnColor: "#3364F7", 
  linkColor: "#2a5bd7"
}

// Custom gradients
backgroundImage: {
  "custom-gradient": "linear-gradient(to right, #3b82f6, #9333ea)",
  "custom-gradient-2": "linear-gradient(to left, #3b82f6, #f43f5e)",
  "card-gradient": "linear-gradient(to right, #38b2ac, #4299e1)"
}

// Custom shadows
boxShadow: {
  custom: "0 0 15px rgba(0, 0, 0, 0.3)",
  right: "10px 0px 10px -5px rgba(0, 0, 0, 0.3)"
}
```

## Environment Variables

```env
VITE_API_URL=your_backend_api_url
VITE_APP_NAME=URL Shortener
```

## Build

```bash
npm run build
```

Built files will be in the `dist` directory.

## Development

The project uses Vite for fast development with HMR and React Fast Refresh enabled.