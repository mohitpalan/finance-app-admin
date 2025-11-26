import 'next-auth';
import { User } from './index';

declare module 'next-auth' {
  interface Session {
    user: User;
    accessToken: string;
  }

  interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    user?: User;
  }
}
