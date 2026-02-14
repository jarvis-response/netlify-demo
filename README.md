# Netlify Demo

A collection of 6 proof-of-concept (POC) pages demonstrating fast, modern frontend patterns deployable on Netlify. Built with vanilla HTML, CSS, and JavaScript—no frameworks, no build step.

🚀 **Live Site:** https://sweet-custard-a719d3.netlify.app/

## Pages

| Page | Description | URL |
|------|-------------|-----|
| **Home** | Table of Contents with filterable cards linking to all POCs | `/index.html` |
| **Travel Dashboard** | Time/weather for Maui + your current location via geolocation | `/travel-dashboard.html` |
| **Business Card** | Digital profile with social links and "Currently in" geolocation | `/business-card.html` |
| **API Playground** | Interactive request builder for testing Netlify Functions | `/api-playground.html` |
| **Blog** | Minimalist blog with search, markdown rendering, and post navigation | `/blog.html` |
| **About** | Project overview and contact section | `/about.html` |

## Features

- 🎨 **Consistent purple gradient theme** across all pages
- 📱 **Responsive design** with mobile-first approach
- 🧭 **Sticky navigation** with links to all pages
- ⚡ **Zero build step** — pure HTML/CSS/JS
- 🔒 **Secure API handling** via Netlify Functions

## Weather API Setup

The Travel Dashboard uses a Netlify Function to proxy OpenWeatherMap API calls securely.

### 1. Get API Key

1. Sign up at [OpenWeatherMap](https://openweathermap.org/api) (free tier = 1,000 calls/day)
2. Go to "My API Keys" and generate a new key
3. Wait ~10 minutes for activation

### 2. Configure Netlify

1. Go to your Netlify Dashboard → Site settings → Environment variables
2. Add variable: `OPENWEATHER_API_KEY` = your API key
3. Redeploy the site (Netlify auto-detects functions in `netlify/functions/`)

### Weather Function

**File:** `netlify/functions/weather.js`

Accepts `GET /.netlify/functions/weather?lat={lat}&lon={lon}` and returns OpenWeatherMap JSON response with CORS headers.

## Project Structure

```
netlify-demo/
├── index.html              # Home / Table of Contents
├── travel-dashboard.html   # Weather + time dashboard
├── business-card.html      # Digital profile page
├── api-playground.html     # API testing UI
├── blog.html               # Markdown blog POC
├── about.html              # Project about page
├── netlify/
│   └── functions/
│       └── weather.js      # Weather API proxy
└── README.md               # This file
```

## Deployment

This site deploys automatically from GitHub to Netlify on every push to `main`.

### Manual Deploy

```bash
# Push to GitHub
git add .
git commit -m "Your changes"
git push origin main

# Netlify will auto-deploy
```

## Local Development

```bash
# Clone the repo
git clone https://github.com/jarvis-response/netlify-demo.git
cd netlify-demo

# Serve locally (any static server works)
python3 -m http.server 8000
# or
npx serve .

# For Netlify Functions locally:
npx netlify-cli dev
```

## Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Serverless:** Netlify Functions (Node.js)
- **APIs:** OpenWeatherMap, OpenStreetMap Nominatim
- **Hosting:** Netlify

## License

MIT — Feel free to fork and adapt for your own demos.

---

Built with 🦞 by a helpful digital crustacean.
