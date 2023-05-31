import React, { ReactNode, useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";

// interface Budget with id, name, max
export interface IBudget {
  uniqueId: string;
  name: string;
  max: number;
}
// interface Expense with id, name, amount, budgetId
export interface IExpense {
  uniqueId: string;
  description: string;
  amount: number;
  budgetUniqueId: string;
}

interface BudgetsContextProps {
  budgets: IBudget[];
  expenses: IExpense[];
  getBudgetExpenses: (budgetUniqueId: string) => IExpense[];
  addBudget: (name: string, max: number) => void;
  deleteBudget: (budgetUniqueId: string) => void;
  addExpense: (
    description: string,
    amount: number,
    budgetUniqueId: string
  ) => void;
  deleteExpense: (expenseUniqueId: string) => void;
}

const BudgetsContext = React.createContext<any | null>(null);

export const UNCATEGORIZED_BUDGET_UNIQUE_ID = 'uncategorized';

export const useBudgets = () => {
  const context = useContext(BudgetsContext);
  if (context === undefined) {
    throw new Error("useBudgets must be used within a BudgetsProvider");
  }
  return context;
};

export const BudgetsProvider = ({ children }: { children: ReactNode }) => {
  const [budgets, setBudgets] = useState<IBudget[]>([]);
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const getBudgetExpenses = (budgetUniqueId: string) => {
    return expenses.filter(
      (expense) => expense.budgetUniqueId === budgetUniqueId
    );
  };

  const addBudget = (name: string, max: number) => {
    setBudgets((prevState) => {
      if (prevState.some((budget) => budget.name === name)) {
        return prevState;
      }

      return [...prevState, { uniqueId: uuidV4(), name, max }];
    });
  };

  const deleteBudget = (budgetUniqueId: string) => {
    // TODO deal with expenses

    setBudgets((prevState) =>
      prevState.filter((budget) => budget.uniqueId !== budgetUniqueId)
    );
  };

  const addExpense = (
    description: string,
    amount: number,
    budgetUniqueId: string
  ) => {
    setExpenses((prevState) => {
      return [
        ...prevState,
        { uniqueId: uuidV4(), description, amount, budgetUniqueId },
      ];
    });
  };

  const deleteExpense = (expenseUniqueId: string) => {
    setExpenses((prevState) =>
      prevState.filter((expense) => expense.uniqueId !== expenseUniqueId)
    );
  };
  
  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addBudget,
        deleteBudget,
        addExpense,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
