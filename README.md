# React + TypeScript + Vite + Tailwind

## Overview

A React application that helps you create schedules of your day to day events.

### This project is integrated with 3rd party applications:

- [Auth0](https://auth0.com/)
- [Holidays API](https://holidayapi.com/)

## Installation and running

1. Create an account on Auth0 and holidays API and get the necessary credentials

#### For Auth0

- Create a new application on Auth0:
  - navigate to applications section and create a new application
  - choose the type: Single Page Web Applications and create
- Configure application settings:
  - get the domain and client id. Needed for the env values.
- Set Allowed Callback URLS, Allowed Logout URLS and Allowed Web Origins:
  - set the appropriate URLS to (for local dev use localhost):
    http://localhost:5173

#### For Holidays API

- After creating an account you can directly copy the API Key from the dashboard
  note that free trial account only fetches previous year's data.

##### Project directory

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a .env file and copy the value from .env.example

4. Set the env values accordingly:
   VITE_APP_AUTH0_DOMAIN={value from auth0 domain}
   VITE_APP_AUTH0_CLIENT_ID={value from auth0 client ID}
   VITE_APP_HOLIDAY_API_KEY={value from holiday api key}

5. Run the project:
   ```bash
   npm run dev
   ```
