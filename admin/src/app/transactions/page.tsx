'use client';

import { useState, useMemo } from 'react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { getTransactions, getTransactionStats } from '@/lib/services';
import { Transaction } from '@/types';
import { formatDate, formatCurrency, cn } from '@/lib/utils';
import { Search, Filter, Download, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  // Fetch transactions from API
  const { data: transactions, isLoading, error } = useQuery({
    queryKey: ['transactions', page, limit],
    queryFn: () => getTransactions({ page, limit }),
    refetchInterval: 60000, // Refetch every 60 seconds
  });

  // Fetch transaction statistics
  const { data: stats } = useQuery({
    queryKey: ['transaction-stats'],
    queryFn: () => getTransactionStats(),
    refetchInterval: 60000,
  });

  // Client-side filtering for search
  const filteredTransactions = useMemo(() => {
    if (!transactions) return [];
    if (!searchQuery) return transactions;

    const query = searchQuery.toLowerCase();
    return transactions.filter(
      (transaction) =>
        transaction.description?.toLowerCase().includes(query) ||
        transaction.category?.toLowerCase().includes(query)
    );
  }, [transactions, searchQuery]);

  const getStatusBadge = (status: string) => {
    const styles = {
      COMPLETED: 'bg-green-100 text-green-800',
      PENDING: 'bg-yellow-100 text-yellow-800',
      FAILED: 'bg-red-100 text-red-800',
      CANCELLED: 'bg-gray-100 text-gray-800',
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

  const getTypeIcon = (type: string) => {
    if (type === 'INCOME') {
      return <ArrowDownLeft className="h-4 w-4 text-green-600" />;
    } else if (type === 'EXPENSE') {
      return <ArrowUpRight className="h-4 w-4 text-red-600" />;
    }
    return <ArrowUpRight className="h-4 w-4 text-blue-600" />;
  };

  const getTypeBadge = (type: string) => {
    const styles = {
      INCOME: 'bg-green-100 text-green-800',
      EXPENSE: 'bg-red-100 text-red-800',
      TRANSFER: 'bg-blue-100 text-blue-800',
    };

    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold',
          styles[type as keyof typeof styles] || 'bg-gray-100 text-gray-800'
        )}
      >
        {getTypeIcon(type)}
        {type}
      </span>
    );
  };

  return (
    <AdminLayout title="Transactions">
      <div className="space-y-4">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div className="flex flex-1 items-center gap-4">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search transactions..."
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
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Income</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(stats?.totalIncome || 0)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(stats?.totalExpenses || 0)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Net Income</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(stats?.netIncome || 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Transactions</CardTitle>
            <CardDescription>
              View and manage all transactions in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="flex h-64 items-center justify-center">
                <div className="text-center">
                  <p className="text-red-600 font-semibold">Failed to load transactions</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {error instanceof Error ? error.message : 'An error occurred'}
                  </p>
                </div>
              </div>
            ) : isLoading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="text-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Loading transactions...
                  </p>
                </div>
              </div>
            ) : filteredTransactions.length === 0 ? (
              <div className="flex h-64 items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground">
                    {searchQuery
                      ? 'No transactions found matching your search'
                      : 'No transactions found'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                        Description
                      </th>
                      <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                        Type
                      </th>
                      <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                        Category
                      </th>
                      <th className="pb-3 text-right text-sm font-medium text-muted-foreground">
                        Amount
                      </th>
                      <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b last:border-0">
                        <td className="py-4 text-sm">
                          {transaction.description || 'No description'}
                        </td>
                        <td className="py-4">{getTypeBadge(transaction.type)}</td>
                        <td className="py-4 text-sm text-gray-600">
                          {transaction.category || 'Uncategorized'}
                        </td>
                        <td className="py-4 text-right font-medium">
                          <span
                            className={cn(
                              transaction.type === 'INCOME'
                                ? 'text-green-600'
                                : transaction.type === 'EXPENSE'
                                ? 'text-red-600'
                                : 'text-blue-600'
                            )}
                          >
                            {transaction.type === 'INCOME' ? '+' : '-'}
                            {formatCurrency(transaction.amount)}
                          </span>
                        </td>
                        <td className="py-4 text-sm text-gray-600">
                          {formatDate(transaction.createdAt, 'MMM dd, yyyy HH:mm')}
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
