# Admin Dashboard Testing Guide

Quick guide for testing the admin dashboard with real API integration.

## Prerequisites

1. **Start the Backend Server**
   ```bash
   # From project root
   npm run backend:dev
   ```
   Backend should be running on `http://localhost:3000`

2. **Verify Database is Set Up**
   ```bash
   cd backend
   npm run prisma:migrate    # Run migrations if needed
   npm run prisma:seed       # Seed data if needed
   ```

3. **Start the Admin Dashboard**
   ```bash
   # From project root
   npm run admin:dev
   ```
   Dashboard should be running on `http://localhost:3001`

## Test Scenarios

### 1. Dashboard Page Test

**URL**: `http://localhost:3001/dashboard`

**What to Test**:
- [ ] Stats cards display real numbers (Total Income, Total Expenses, Net Income, Account Balance)
- [ ] Monthly trend chart shows 6 months of data
- [ ] Recent transactions section shows last 5 transactions
- [ ] All data loads without errors
- [ ] Loading skeletons appear briefly during initial load
- [ ] Charts render correctly with actual data

**Expected Behavior**:
- Data auto-refreshes every 30 seconds
- No console errors
- All amounts formatted as currency
- Chart tooltips work correctly

### 2. Users Page Test

**URL**: `http://localhost:3001/users`

**What to Test**:
- [ ] Users table displays all users from database
- [ ] User avatars show initials correctly
- [ ] Role badges display correct colors
- [ ] Status badges show correct status (ACTIVE, INACTIVE, SUSPENDED)
- [ ] Last login shows "relative time" (e.g., "2 hours ago")
- [ ] Created date formatted correctly
- [ ] Search box filters users by name or email
- [ ] Search is case-insensitive
- [ ] Empty state shows when no users match search

**Expected Behavior**:
- Data auto-refreshes every 60 seconds
- Search filters client-side (instant results)
- Table is responsive and scrolls horizontally on mobile

### 3. Transactions Page Test

**URL**: `http://localhost:3001/transactions`

**What to Test**:
- [ ] Summary cards show correct totals (Total Income, Total Expenses, Net Income)
- [ ] Transactions table displays real transactions
- [ ] Transaction types show correct badges (INCOME green, EXPENSE red)
- [ ] Amounts display with + or - prefix based on type
- [ ] Amounts colored correctly (green for income, red for expenses)
- [ ] Category shows correctly (or "Uncategorized")
- [ ] Date formatted as "MMM dd, yyyy HH:mm"
- [ ] Search filters by description or category
- [ ] Empty state shows when no transactions match

**Expected Behavior**:
- Data auto-refreshes every 60 seconds
- Statistics cards update with real totals
- Search filters client-side

### 4. Settings Page Test

**URL**: `http://localhost:3001/settings`

**What to Test**:
- [ ] Info banner appears at top explaining local-only storage
- [ ] All settings fields are editable
- [ ] Toggle switches work for boolean settings
- [ ] API Configuration section shows correct API URL
- [ ] Save button shows "Saving..." state when clicked
- [ ] Settings persist during session (but not after refresh)

**Expected Behavior**:
- No API calls made (local state only)
- Banner clearly states backend integration is pending

## Error Scenarios to Test

### Scenario 1: Backend Offline

1. Stop the backend server
2. Refresh any page in admin dashboard
3. **Expected**: Error message appears: "Failed to load [resource]"
4. **Expected**: Error is user-friendly, not a raw stack trace

### Scenario 2: Invalid Authentication

1. Clear browser cookies/session
2. Try to access protected pages
3. **Expected**: Redirect to login page
4. **Expected**: Can't access dashboard without authentication

### Scenario 3: Slow Network

1. Open Chrome DevTools > Network tab
2. Set throttling to "Slow 3G"
3. Refresh dashboard
4. **Expected**: Loading spinners appear
5. **Expected**: Data eventually loads
6. **Expected**: No timeout errors (within 30 seconds)

## API Endpoints Being Called

### Dashboard Page
- `GET /api/v1/dashboard`

### Users Page
- `GET /api/v1/users`

### Transactions Page
- `GET /api/v1/transactions`
- `GET /api/v1/transactions/statistics`

## Troubleshooting

### Problem: "Failed to load dashboard data"

**Possible Causes**:
- Backend server not running
- Database not initialized
- CORS issues
- JWT token expired

**Solutions**:
1. Check backend server is running: `npm run backend:dev`
2. Check backend logs for errors
3. Verify `.env.local` has correct API URL: `NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1`
4. Try logging out and back in (refresh token)

### Problem: "No data available" or empty tables

**Possible Causes**:
- Database is empty
- User doesn't have transactions yet

**Solutions**:
1. Seed the database: `npm run prisma:seed` (from backend directory)
2. Create test transactions via backend API
3. Check backend logs for query errors

### Problem: Console errors about CORS

**Possible Causes**:
- Backend CORS not configured for admin URL
- Admin running on wrong port

**Solutions**:
1. Check backend `.env` has: `CORS_ORIGIN=http://localhost:3001,http://localhost:19006`
2. Restart backend after changing CORS settings
3. Verify admin is running on port 3001

### Problem: Authentication redirect loop

**Possible Causes**:
- NextAuth misconfigured
- JWT secret mismatch
- Session expired

**Solutions**:
1. Clear browser cookies
2. Restart admin dashboard
3. Check NextAuth configuration in `admin/src/app/api/auth/[...nextauth]/route.ts`
4. Verify JWT secrets match between backend and admin

## Browser DevTools Tips

### Check API Calls
1. Open DevTools (F12)
2. Go to Network tab
3. Filter by "Fetch/XHR"
4. Refresh page
5. Look for API calls to `localhost:3000/api/v1/...`
6. Check response status (should be 200)
7. Preview response data

### Check Console Errors
1. Open DevTools (F12)
2. Go to Console tab
3. Look for red error messages
4. React Query errors will show with query keys
5. Network errors will show with request details

### Check React Query Cache
1. Look for React Query Devtools button (bottom-left corner)
2. Click to open devtools
3. See all queries and their states
4. Check cache data
5. Manually trigger refetch

## Performance Checks

- [ ] Dashboard loads in under 2 seconds (with backend running)
- [ ] Users page loads in under 2 seconds
- [ ] Transactions page loads in under 2 seconds
- [ ] No memory leaks (check Chrome Task Manager)
- [ ] Auto-refresh doesn't cause UI flicker
- [ ] Tables scroll smoothly with 100+ rows

## Success Criteria

All tests pass when:
1. All pages load without errors
2. Real data displays correctly
3. Loading states appear appropriately
4. Error states handle failures gracefully
5. Search and filtering work as expected
6. Auto-refresh updates data smoothly
7. UI remains responsive during data fetching

## Next Steps After Testing

If all tests pass:
- [ ] Document any bugs found
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile viewport sizes
- [ ] Test with large datasets (100+ users, 1000+ transactions)
- [ ] Performance profiling with React DevTools
- [ ] Accessibility testing with screen reader

If tests fail:
- [ ] Check backend logs
- [ ] Verify database state
- [ ] Check browser console for errors
- [ ] Review API responses in Network tab
- [ ] Verify authentication is working
- [ ] Check environment variables are correct
