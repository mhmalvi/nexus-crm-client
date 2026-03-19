# Nexus CRM Client

The primary frontend dashboard for the **Nexus CRM** microservices platform. This React-based application provides a comprehensive interface for managing leads, sales teams, payments, analytics, and day-to-day CRM operations.

## Features

- **Dashboard & Analytics** — Real-time overview of lead pipelines, sales performance, and campaign metrics with interactive charts
- **Lead Management** — Full lead lifecycle tracking including assignment, status updates, quality scoring, and communication history
- **Sales Team Management** — Assign and manage sales employees, track individual performance, and monitor workloads
- **Campaign Tracking** — Create and monitor marketing campaigns with lead attribution and conversion analytics
- **Payment & Billing** — Integrated Stripe payment processing, invoice generation, and subscription management
- **Email & Communication** — Built-in email composer with customizable templates and mail merge capabilities
- **Student & Course Management** — Specialized modules for education-sector CRM workflows
- **Calendar & Reminders** — Schedule follow-ups and track appointments with calendar integration
- **Notifications** — Real-time push notifications via WebSocket integration
- **Reporting** — Export data to CSV/Excel and generate PDF reports

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| State Management | Redux Toolkit |
| UI Library | Ant Design 4 |
| Styling | Tailwind CSS 3 |
| HTTP Client | Axios |
| Charts | Recharts |
| Payments | Stripe.js / React Stripe |
| Real-time | Socket.IO |
| Rich Text Editor | TinyMCE |
| Authentication | Firebase |
| PDF Generation | jsPDF + html2canvas |
| Routing | React Router 6 |
| Guided Tours | Reactour |

## Prerequisites

- Node.js >= 16
- npm or Yarn

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/mhmalvi/nexus-crm-client.git
   cd nexus-crm-client
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env.development.local
   ```

   Update the `.env.development.local` file with your API endpoints and service keys.

4. **Start the development server**

   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000`.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start local development server |
| `npm run start-prod` | Start with production environment |
| `npm run build-local` | Build for local/staging deployment |
| `npm run build-prod` | Build for production deployment |
| `npm test` | Run the test suite |

## Project Structure

```
src/
├── Components/       # Reusable UI components
├── Pages/            # Route-level page components
│   ├── Analytics/
│   ├── Authentication/
│   ├── Billing/
│   ├── Campaigns/
│   ├── Dashboard/
│   ├── LeadDetails/
│   ├── Messages/
│   ├── Notifications/
│   ├── Payments/
│   ├── SalesEmployee/
│   ├── Settings/
│   └── ...
├── app/              # Redux store configuration
├── assets/           # Static assets
└── features/         # Redux slices and feature logic
```

## Microservices Integration

This frontend communicates with the following Nexus CRM backend services:

| Service | Purpose |
|---------|---------|
| nexus-crm-users | Authentication, user profiles, and role management |
| nexus-crm-leads | Lead CRUD, assignment, and pipeline operations |
| nexus-crm-payments | Payment processing, invoices, and subscriptions |
| nexus-crm-orgs | Company/organization management and team structure |
| nexus-crm-alerts | Real-time notifications and follow-up reminders |
| nexus-crm-b2b | B2B student and agency management |

## License

This project is proprietary software. All rights reserved.
