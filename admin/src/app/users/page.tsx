'use client';

import { useState, useMemo } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/lib/services';
import { User, UserStatus } from '@/types';
import { formatDate, formatRelativeTime, cn } from '@/lib/utils';
import { Search, Plus, MoreVertical, Filter } from 'lucide-react';

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  // Fetch users from API
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users', page, limit],
    queryFn: () => getUsers({ page, limit }),
    refetchInterval: 60000, // Refetch every 60 seconds
  });

  // Client-side filtering for search
  const filteredUsers = useMemo(() => {
    if (!users) return [];
    if (!searchQuery) return users;

    const query = searchQuery.toLowerCase();
    return users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(query) ||
        user.lastName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);

  const getStatusBadge = (status: string) => {
    const styles = {
      ACTIVE: 'bg-green-100 text-green-800',
      INACTIVE: 'bg-gray-100 text-gray-800',
      SUSPENDED: 'bg-red-100 text-red-800',
    };

    return (
      <span
        className={cn(
          'inline-flex rounded-full px-2 py-1 text-xs font-semibold',
          styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'
        )}
      >
        {status}
      </span>
    );
  };

  const getRoleBadge = (role: string) => {
    const styles = {
      ADMIN: 'bg-purple-100 text-purple-800',
      MANAGER: 'bg-blue-100 text-blue-800',
      USER: 'bg-gray-100 text-gray-800',
    };

    return (
      <span
        className={cn(
          'inline-flex rounded-full px-2 py-1 text-xs font-semibold',
          styles[role as keyof typeof styles] || 'bg-gray-100 text-gray-800'
        )}
      >
        {role}
      </span>
    );
  };

  return (
    <AdminLayout title="Users">
      <div className="space-y-4">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div className="flex flex-1 items-center gap-4">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>
              Manage and view all users in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="flex h-64 items-center justify-center">
                <div className="text-center">
                  <p className="text-red-600 font-semibold">Failed to load users</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {error instanceof Error ? error.message : 'An error occurred'}
                  </p>
                </div>
              </div>
            ) : isLoading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="text-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                  <p className="mt-2 text-sm text-muted-foreground">Loading users...</p>
                </div>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="flex h-64 items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground">
                    {searchQuery ? 'No users found matching your search' : 'No users found'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                        User
                      </th>
                      <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                        Email
                      </th>
                      <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                        Role
                      </th>
                      <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                        Status
                      </th>
                      <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                        Last Login
                      </th>
                      <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                        Created
                      </th>
                      <th className="pb-3 text-right text-sm font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b last:border-0">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                              {user.firstName.charAt(0)}
                              {user.lastName.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium">
                                {user.firstName} {user.lastName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-sm text-gray-600">{user.email}</td>
                        <td className="py-4">{getRoleBadge(user.role)}</td>
                        <td className="py-4">{getStatusBadge(user.status)}</td>
                        <td className="py-4 text-sm text-gray-600">
                          {user.lastLoginAt
                            ? formatRelativeTime(user.lastLoginAt)
                            : 'Never'}
                        </td>
                        <td className="py-4 text-sm text-gray-600">
                          {formatDate(user.createdAt, 'MMM dd, yyyy')}
                        </td>
                        <td className="py-4 text-right">
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
