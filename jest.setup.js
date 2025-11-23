// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    };
  },
  useSearchParams() {
    return {
      get: jest.fn(),
    };
  },
  usePathname() {
    return '/';
  },
}));

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: null,
    status: 'unauthenticated',
  })),
  signIn: jest.fn(),
  signOut: jest.fn(),
  SessionProvider: ({ children }) => children,
}));

// Mock environment variables
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000/api/v1';
process.env.NEXTAUTH_URL = 'http://localhost:3001';
process.env.NEXTAUTH_SECRET = 'test-secret';

// Suppress console errors during tests (optional)
global.console = {
  ...console,
  // Uncomment to suppress logs
  // error: jest.fn(),
  // warn: jest.fn(),
};
