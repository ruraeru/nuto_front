export type RecieptType = {
  storeName: string;
  address: string;
  purchaseDate: string;
  category: string[];
  totalAmount: number;
  recieptName: string;
};

export interface IinitialState {
  output: RecieptType | null;
  prompt: string;
}
