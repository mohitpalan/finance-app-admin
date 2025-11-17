import { api } from '@/lib/api-client';
import { Transaction } from '@/types';

export interface TransactionsResponse {
  success: boolean;
  data: Transaction[];
  message: string;
}

export interface TransactionResponse {
  success: boolean;
  data: Transaction;
  message: string;
}

export interface TransactionStatsResponse {
  success: boolean;
  data: {
    totalIncome: number;
    totalExpenses: number;
    netIncome: number;
    transactionCount: number;
    categoryBreakdown: Array<{
      category: string;
      amount: number;
      count: number;
    }>;
  };
  message: string;
}

export interface GetTransactionsParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
}

/**
 * Fetch all transactions
 * @param params - Query parameters for filtering and pagination
 */
export const getTransactions = async (params?: GetTransactionsParams): Promise<Transaction[]> => {
  const queryParams = new URLSearchParams();

  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.search) queryParams.append('search', params.search);
  if (params?.type) queryParams.append('type', params.type);
  if (params?.category) queryParams.append('category', params.category);
  if (params?.startDate) queryParams.append('startDate', params.startDate);
  if (params?.endDate) queryParams.append('endDate', params.endDate);
  if (params?.minAmount) queryParams.append('minAmount', params.minAmount.toString());
  if (params?.maxAmount) queryParams.append('maxAmount', params.maxAmount.toString());

  const url = `/transactions${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const response = await api.get<TransactionsResponse>(url);
  return response.data;
};

/**
 * Fetch a single transaction by ID
 * @param id - Transaction ID
 */
export const getTransactionById = async (id: string): Promise<Transaction> => {
  const response = await api.get<TransactionResponse>(`/transactions/${id}`);
  return response.data;
};

/**
 * Fetch transaction statistics
 * @param params - Query parameters for filtering
 */
export const getTransactionStats = async (params?: Pick<GetTransactionsParams, 'startDate' | 'endDate' | 'category'>): Promise<TransactionStatsResponse['data']> => {
  const queryParams = new URLSearchParams();

  if (params?.startDate) queryParams.append('startDate', params.startDate);
  if (params?.endDate) queryParams.append('endDate', params.endDate);
  if (params?.category) queryParams.append('category', params.category);

  const url = `/transactions/statistics${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const response = await api.get<TransactionStatsResponse>(url);
  return response.data;
};
