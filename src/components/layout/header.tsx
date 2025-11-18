'use client';

import { useSession } from 'next-auth/react';
import { getInitials } from '@/lib/utils';
import { Bell, Menu } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const { data: session } = useSession();

  const userInitials = session?.user
    ? getInitials(session.user.firstName, session.user.lastName)
    : 'AD';

  return (
    <header className="sticky top-0 z-10 border-b bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button className="lg:hidden">
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative rounded-full p-2 hover:bg-gray-100">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {/* User Avatar */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {session?.user.firstName} {session?.user.lastName}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {session?.user.role?.toLowerCase()}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
              {userInitials}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
