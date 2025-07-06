export type TransactionType = "수입" | "지출";

export interface RecieptType {
  recieptName: string;
  storeName: string;
  address: string;
  purchaseDate: string;
  category: string[];
  totalAmount: number;
  transactionType: TransactionType; // 수입/지출 타입 추가
}

export interface IinitialState {
  output: RecieptType | null;
  prompt: string;
  error?: string;
}
