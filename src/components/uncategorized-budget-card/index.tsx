import { IExpense, UNCATEGORIZED_BUDGET_UNIQUE_ID, useBudgets } from "../../contexts/BudgetsContext";
import BudgetCard from "../budget-card";

interface Props {
  onAddExpenseClick: () => void;
  onViewExpensesClick: () => void;
}

const UncategorizedBudgetCard: React.FC<Props> = ({ onAddExpenseClick, onViewExpensesClick }) => {
  const { getBudgetExpenses } = useBudgets();
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_UNIQUE_ID)
    .reduce((acc: number, expense: IExpense) => acc + expense.amount, 0);

  return (
    <BudgetCard
      name="Uncategorized"
      gray
      amount={amount}
      onAddExpenseClick={onAddExpenseClick}
      onViewExpensesClick={onViewExpensesClick}
    />
  );
};

export default UncategorizedBudgetCard;
