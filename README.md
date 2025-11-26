# Finance App - Admin Dashboard

Next.js-based admin dashboard for managing the Finance App ecosystem.

## Overview

Modern admin dashboard built with Next.js 14 App Router, providing comprehensive administrative capabilities for managing users, transactions, and viewing system analytics.

## Tech Stack

- **Framework**: Next.js 14.2 (App Router)
- **Language**: TypeScript 5.x
- **UI Library**: Custom components with Tailwind CSS
- **Styling**: Tailwind CSS 3.4+
- **Data Fetching**: TanStack Query (React Query) 5.x
- **Charts**: Recharts 2.12+
- **Authentication**: NextAuth.js 4.24+
- **HTTP Client**: Axios 1.6+
- **Icons**: Lucide React
- **Utilities**: date-fns, clsx, tailwind-merge, zod

## Project Structure

```
finance-app-admin/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home (redirects to dashboard)
│   │   ├── providers.tsx        # React Query & NextAuth providers
│   │   ├── globals.css          # Global Tailwind styles
│   │   ├── login/               # Login page
│   │   ├── dashboard/           # Dashboard with charts
│   │   ├── users/               # User management
│   │   ├── transactions/        # Transaction management
│   │   ├── settings/            # Settings page
│   │   └── api/auth/            # NextAuth API routes
│   ├── components/               # Reusable components
│   │   ├── ui/                  # Base UI components
│   │   └── layout/              # Layout components (Sidebar, Header)
│   ├── lib/                      # Utility libraries
│   │   ├── api-client.ts        # Axios client with interceptors
│   │   ├── auth-api.ts          # Auth API functions
│   │   ├── auth.ts              # NextAuth configuration
│   │   └── utils.ts             # Helper functions
│   ├── types/                    # TypeScript types
│   └── middleware.ts             # Route protection middleware
├── public/                       # Static assets
├── next.config.js               # Next.js config
├── tailwind.config.ts           # Tailwind config
├── package.json
├── tsconfig.json
└── README.md
```

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Running backend API (finance-app-backend)

## Installation

```bash
cd finance-app-admin
npm install
```

## Configuration

Create a `.env.local` file:

```env
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3001
NODE_ENV=development

# API
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1

# Authentication
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret-key-change-in-production

# Features
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

## Development

```bash
# Start development server
npm run dev

# Dashboard available at http://localhost:3001
```

## Implemented Features

### Authentication
- NextAuth.js with credentials provider
- JWT-based session management
- Protected routes with middleware
- Auto token refresh
- Login page with validation

### Dashboard
- Key metrics cards (users, revenue, transactions)
- Revenue overview line chart
- User status distribution pie chart
- Transaction types bar chart
- Responsive grid layout

### User Management
- User listing table with search
- User status badges (Active, Inactive, Suspended)
- Role badges (Admin, User)
- Sortable columns

### Transaction Management
- Transaction listing with details
- Type indicators (Income, Expense, Transfer)
- Status tracking
- Summary cards (Total Income, Expenses, Net Balance)
- Amount formatting

### Settings
- General application settings
- Security configuration
- API configuration display

### Layout & UI
- Responsive sidebar navigation
- Header with user info
- Custom Tailwind theme
- Loading states and error handling

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Lint code

## Dashboard Navigation

```
├── Overview (Dashboard)
├── Users
├── Transactions
├── Settings
└── Logout
```

## API Integration

All API calls use:
- Axios client with interceptors
- Bearer token authentication
- Automatic error handling
- Loading states

## Test Credentials

- **Admin**: `admin@financeapp.com` / `Admin123!`

## Deployment

Recommended platforms:
- Vercel (optimized for Next.js)
- AWS Amplify
- Self-hosted with Docker

## License

MIT
