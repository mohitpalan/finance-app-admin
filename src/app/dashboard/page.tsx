'use client';

import { AdminLayout } from '@/components/layout/admin-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '@/lib/services';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { Users, TrendingUp, DollarSign, Activity } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function DashboardPage() {
  // Fetch dashboard stats from API
  const { data: dashboardData, isLoading, error } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStats,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Calculate transaction count from recent transactions
  const transactionCount = dashboardData?.recentTransactions?.length || 0;

  const statCards = [
    {
      title: 'Total Income',
      value: formatCurrency(dashboardData?.totalIncome || 0),
      change: '+12.5%',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(dashboardData?.totalExpenses || 0),
      change: '+8.3%',
      icon: DollarSign,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Net Income',
      value: formatCurrency(dashboardData?.netIncome || 0),
      change: '+23.1%',
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Account Balance',
      value: formatCurrency(dashboardData?.accountsBalance || 0),
      change: '+5.2%',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  if (error) {
    return (
      <AdminLayout title="Dashboard">
        <Card>
          <CardContent className="flex h-64 items-center justify-center">
            <div className="text-center">
              <p className="text-red-600 font-semibold">Failed to load dashboard data</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {error instanceof Error ? error.message : 'An error occurred'}
              </p>
            </div>
          </CardContent>
        </Card>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {isLoading ? (
            // Loading skeleton for stats cards
            [...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                  <div className="h-8 w-8 animate-pulse rounded-lg bg-gray-200" />
                </CardHeader>
                <CardContent>
                  <div className="h-8 w-32 animate-pulse rounded bg-gray-200" />
                  <div className="mt-2 h-3 w-28 animate-pulse rounded bg-gray-200" />
                </CardContent>
              </Card>
            ))
          ) : (
            statCards.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                      <Icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">{stat.change}</span> from last month
                    </p>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Monthly Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trend</CardTitle>
            <CardDescription>Income and expenses over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex h-[300px] items-center justify-center">
                <div className="text-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                  <p className="mt-2 text-sm text-muted-foreground">Loading chart data...</p>
                </div>
              </div>
            ) : dashboardData?.monthlyTrend && dashboardData.monthlyTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dashboardData.monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Income"
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#ef4444"
                    strokeWidth={2}
                    name="Expenses"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-[300px] items-center justify-center">
                <p className="text-sm text-muted-foreground">No data available</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest 5 transactions in the system</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 border-b pb-3">
                    <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                      <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
                    </div>
                    <div className="h-6 w-20 animate-pulse rounded bg-gray-200" />
                  </div>
                ))}
              </div>
            ) : dashboardData?.recentTransactions && dashboardData.recentTransactions.length > 0 ? (
              <div className="space-y-3">
                {dashboardData.recentTransactions.slice(0, 5).map((transaction: any) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between border-b pb-3 last:border-0"
                  >
                    <div>
                      <p className="font-medium">{transaction.description || 'Transaction'}</p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.category?.name || 'Uncategorized'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold ${
                          transaction.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {transaction.type === 'INCOME' ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-32 items-center justify-center">
                <p className="text-sm text-muted-foreground">No recent transactions</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
