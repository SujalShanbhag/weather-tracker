# Weather Tracker

A React + Vite + TypeScript weather web application project.

## Features
- Current weather and dynamic weather theme
- Browser GPS location
- City/location search with OpenStreetMap Nominatim
- 24-hour forecast
- 7-day forecast
- Air quality (US AQI)
- UV index, humidity, pressure, sunrise and sunset
- Responsive desktop/mobile browser UI
- No API key required for the included Open-Meteo/Nominatim integrations

## Run locally
```bash
npm install
npm run dev
```
Then open the local Vite URL shown in the terminal.

## Production build
```bash
npm run build
npm run preview
```

## Vercel
Import the GitHub repository into Vercel.
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

## Render
Create a **Static Site** from the GitHub repository.
- Build command: `npm install && npm run build`
- Publish directory: `dist`

No Python server is required for the current web version.

## Browser location
The browser asks for location permission. Geolocation generally requires HTTPS in deployed environments; localhost is also treated as a secure context by modern browsers.

## Data providers
Weather/forecast/AQI: Open-Meteo.
Location search/reverse geocoding: OpenStreetMap Nominatim.
Please follow each provider's current usage policies and attribution requirements for production/high-traffic use.
