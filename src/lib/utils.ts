export function parseExpiryDate(date: string): string {
  const [year, month] = date.split("-");
  return `${year.slice(2, 4)}/${month}`;
}

export interface ICompareExpenseIncomeProps {
  thisMonthExpense: number;
  lastMonthExpense: number;
}

//API Props 이름 바꿔야함 백엔드에서 지출과 수입을 똑같은 걸로 준다.
export function CompareExpense(data: ICompareExpenseIncomeProps): string {
  // const diff = expense.thisMonthExpense || 0 - expense.lastMonthExpense || 0;
  const diff = data.thisMonthExpense - data.lastMonthExpense || 0;
  console.log(diff);
  if (diff < 0) {
    return `${diff.toLocaleString("ko-KR")}원`;
  }
  return `${diff.toLocaleString("ko-KR")}원`;
}
