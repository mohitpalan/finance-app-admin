# Finance App - Admin Dashboard

Next.js-based admin dashboard for managing the Finance App.

## Overview

Modern admin dashboard built with Next.js, providing comprehensive administrative capabilities for managing users, transactions, and system settings.

## Tech Stack

- **Framework**: Next.js 14.2.3 (App Router)
- **Language**: TypeScript 5.4+
- **UI Library**: Custom components with Tailwind CSS & shadcn/ui inspired design
- **Styling**: Tailwind CSS 3.4+
- **Data Fetching**: TanStack Query (React Query) 5.28+
- **Charts**: Recharts 2.12+
- **Authentication**: NextAuth.js 4.24+
- **HTTP Client**: Axios 1.6+
- **Icons**: Lucide React
- **Utilities**: date-fns, clsx, tailwind-merge, zod

## Project Structure

```
admin/
├── src/
│   ├── app/                      # Next.js app directory (App Router)
│   │   ├── layout.tsx           # Root layout with metadata
│   │   ├── page.tsx             # Home (redirects to dashboard)
│   │   ├── providers.tsx        # React Query & NextAuth providers
│   │   ├── globals.css          # Global Tailwind styles
│   │   ├── login/               # Login page
│   │   ├── dashboard/           # Dashboard page with charts
│   │   ├── users/               # User management page
│   │   ├── transactions/        # Transaction management page
│   │   ├── settings/            # Settings page
│   │   └── api/
│   │       └── auth/            # NextAuth.js API routes
│   ├── components/               # Reusable components
│   │   ├── ui/                  # Base UI components (Button, Card, Input, Label)
│   │   └── layout/              # Layout components (Sidebar, Header, AdminLayout)
│   ├── lib/                      # Utility libraries
│   │   ├── api-client.ts        # Axios API client with interceptors
│   │   ├── auth-api.ts          # Authentication API functions
│   │   ├── auth.ts              # NextAuth configuration
│   │   └── utils.ts             # Helper functions (format, utils)
│   ├── types/                    # TypeScript types & interfaces
│   │   ├── index.ts             # Main type definitions
│   │   └── next-auth.d.ts       # NextAuth type extensions
│   └── middleware.ts             # Protected route middleware
├── public/                       # Static assets
├── tests/                        # Test files
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── .env.local                   # Environment variables (local)
├── .env.example                 # Environment variables template
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

## Installation

From the root directory:
```bash
npm install
```

Or install admin dependencies only:
```bash
npm install --workspace=admin
```

## Configuration

Create a `.env.local` file in the admin directory:

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

Start the development server:
```bash
npm run admin:dev
```

The dashboard will be available at `http://localhost:3001`

## Testing

Run all tests:
```bash
npm run admin:test
```

Run tests with coverage:
```bash
npm run admin:test:coverage
```

Run e2e tests:
```bash
npm run admin:test:e2e
```

## Building

Build for production:
```bash
npm run admin:build
```

Start production server:
```bash
npm run admin:start
```

## Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Lint code
- `npm run format` - Format code with Prettier

## Implemented Features

### Authentication
- NextAuth.js with credentials provider
- JWT-based session management
- Protected routes with middleware
- Auto token refresh and error handling
- Login page with form validation

### Dashboard
- Key metrics cards (users, revenue, transactions)
- Revenue overview line chart
- User status distribution pie chart
- Transaction types bar chart
- Responsive grid layout

### User Management
- User listing table with search
- User status badges (Active, Inactive, Suspended)
- Role badges (Admin, Manager, User)
- User avatars with initials
- Sortable and filterable columns

### Transaction Management
- Transaction listing with details
- Type indicators (Income, Expense, Transfer)
- Status tracking (Completed, Pending, Failed, Cancelled)
- Summary cards (Total Income, Expenses, Net Balance)
- Export functionality placeholder
- Amount formatting with color coding

### Settings
- General application settings
- Security configuration
- Maintenance mode toggle
- API configuration display
- Form validation and save functionality

### Layout & UI
- Responsive sidebar navigation
- Header with user info and notifications
- Custom Tailwind CSS theme
- shadcn/ui inspired components
- Loading states and error handling

## Key Features (To Be Implemented)

### User Management
- View all users
- User details and activity
- User verification and KYC
- User blocking/suspension
- Role and permission management

### Transaction Management
- View all transactions
- Transaction filtering and search
- Transaction details
- Flagged transactions review
- Transaction reports

### Financial Oversight
- System-wide financial analytics
- Revenue tracking
- Commission management
- Reconciliation tools

### Reports and Analytics
- Dashboard with key metrics
- User analytics
- Transaction analytics
- Custom report generation
- Data export capabilities

### System Administration
- Application settings
- Feature flags management
- Email template management
- Notification management
- Audit logs
- System health monitoring

### Security
- Activity monitoring
- Fraud detection alerts
- Security event logs
- IP whitelisting
- Two-factor authentication

## Dashboard Layout

```
- Login Page
- Main Dashboard
  - Sidebar Navigation
    - Overview
    - Users
    - Transactions
    - Reports
    - Settings
    - System Logs
  - Top Navigation
    - Search
    - Notifications
    - Profile Menu
  - Main Content Area
  - Footer
```

## API Integration

All API calls will be made to the backend service with:
- Admin authentication tokens
- Role-based access control
- Request/response interceptors
- Error handling
- Loading states

## Styling

- Responsive design for desktop and tablet
- Consistent design system
- Dark mode support
- Accessibility compliance (WCAG 2.1)

## Security Considerations

- Secure authentication with NextAuth.js
- Role-based access control (RBAC)
- CSRF protection
- XSS prevention
- Secure session management
- Audit logging for admin actions

## Performance Optimization

- Server-side rendering (SSR) for critical pages
- Static generation for public pages
- Image optimization with next/image
- Code splitting
- Caching strategy
- Performance monitoring

## Deployment

Recommended platforms:
- Vercel (optimized for Next.js)
- AWS Amplify
- Netlify
- Self-hosted with Docker

## Contributing

1. Create feature branch
2. Write tests for new features
3. Ensure all tests pass
4. Follow Next.js best practices
5. Test responsive design
6. Submit pull request

## License

MIT
