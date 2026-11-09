# FromHost

> **Originally built in July–August 2022.** Uploaded to GitHub in November 2026 as an archive of my early work. The commit dates match the original file timestamps. The code is as it was in 2022, except that the credentials in `fh-backend/cfg/` were replaced with placeholders and the contents of the sample file `files/testProduct/server.lua` were replaced.

FromHost is a licensing and delivery platform for FiveM script developers. A product's files live on the FromHost server, and a game server can only use a product once its IP address has been activated for it. Customers log in with Discord to see their products, and admins manage products, clients and activations from a dashboard with statistics.

## Features
- **Discord login** through Passport OAuth2, with sessions
- **Client dashboard:** "My products" lists each client's activated products
- **Admin dashboard:** manage products, clients and activations, with usage statistics charts
- **Verification API:** `GET /verification/:product` checks whether the requesting server's IP is activated for that product
- **Product file hosting:** files are served from `fh-backend/files/<product>/`

## Stack
- **Backend:** Node.js, Express, Passport (`passport-discord`), express-session, MySQL (`mysql2`)
- **Frontend:** React 18, React Router 6, styled-components, Recharts

## Structure
```
fh-backend/
  cfg/                 database, Discord OAuth and web server settings
  files/               hosted product files
  src/main.js          entry point
  src/web/routers/     auth, clients, statistics, verification, admin (products, clients, activations)
  src/web/middlewares/ authentication and admin checks
  src/database/        MySQL connection and table manager
fh-frontend/
  src/pages/           login, client and admin dashboard pages
  src/components/      sidebar, modals, select menu
```

## Running it
Backend: fill in `fh-backend/cfg/*.js`, then `cd fh-backend && yarn install && yarn start`.
Frontend: `cd fh-frontend && yarn install && yarn start`.

## Author
Ghaith (icxaith), 2022
