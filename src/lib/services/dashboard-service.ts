import { api } from '@/lib/api-client';

export interface DashboardStats {
  totalIncome: number;
  totalExpenses: number;
  netIncome: number;
  accountsBalance: number;
  recentTransactions: any[];
  monthlyTrend: Array<{
    month: string;
    income: number;
    expenses: number;
  }>;
}

export interface DashboardResponse {
  success: boolean;
  data: DashboardStats;
  message: string;
}

/**
 * Fetch dashboard statistics from the API
 */
export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await api.get<DashboardResponse>('/dashboard');
  return response.data;
};
