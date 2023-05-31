import { IExpense, IBudget, useBudgets } from "../../contexts/BudgetsContext";
import BudgetCard from "../budget-card";

const TotalBudgetCard = () => {
  const { budgets, expenses } = useBudgets();

  const max = budgets.reduce((acc: number, budget: IBudget) => {
    return budget.max + acc;
  }, 0);

  const amount = expenses.reduce((acc: number, expense: IExpense) => {
    return expense.amount + acc;
  }, 0);

  return <BudgetCard amount={amount} max={max} name="Total" gray hideButtons />;
};

export default TotalBudgetCard;
