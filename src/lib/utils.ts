export function parseExpiryDate(date: string): string {
  const [year, month] = date.split("-");
  return `${year.slice(2, 4)}/${month}`;
}

export interface ICompareExpenseIncomeProps {
  thisMonthExpense: number;
  lastMonthExpense: number;
}

export function CompareExpense(
  data: ICompareExpenseIncomeProps,
  isIncome: boolean
): {
  title: string;
  money: string;
  comment: string;
} {
  const currentMonthValue = Number(data.thisMonthExpense || 0);
  const previousMonthValue = Number(data.lastMonthExpense || 0);

  let diff: number;
  let commentPrefix: string;
  let comparisonWord: string;

  if (isIncome) {
    diff = currentMonthValue - previousMonthValue;
    commentPrefix = "수익이";

    if (diff < 0) {
      comparisonWord = "감소하였습니다";
    } else if (diff === 0) {
      comparisonWord = "동일합니다";
    } else {
      comparisonWord = "증가하였습니다";
    }
  } else {
    diff = currentMonthValue - previousMonthValue;
    commentPrefix = "";
    if (diff < 0) {
      comparisonWord = "덜 지출하였습니다";
    } else if (diff === 0) {
      comparisonWord = "동일하게 지출하였습니다";
    } else {
      comparisonWord = "더 지출하였습니다";
    }
  }

  const title = diff === 0 ? "저번달과" : "저번달 대비";

  const formattedMoney = `${diff.toLocaleString("ko-KR")}원`;

  const finalComment = `${commentPrefix} ${comparisonWord}`.trim();

  return {
    title: title,
    money: formattedMoney,
    comment: finalComment,
  };
}
