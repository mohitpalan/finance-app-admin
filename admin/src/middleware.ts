import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Check if user has admin role
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Allow access to login page
    if (path.startsWith('/login')) {
      return NextResponse.next();
    }

    // Check if user is authenticated
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Check admin role for protected routes
    if (token.user && (token.user as any).role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/users/:path*',
    '/transactions/:path*',
    '/settings/:path*',
  ],
};
