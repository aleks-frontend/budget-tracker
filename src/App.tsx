import styled from "styled-components";
import { Button, Container, Stack } from "react-bootstrap";
import BudgetCard from "./components/budget-card";
import AddBudgetModal from "./components/add-budget-modal";
import { useState } from "react";
import {
  IBudget,
  IExpense,
  UNCATEGORIZED_BUDGET_UNIQUE_ID,
  useBudgets,
} from "./contexts/BudgetsContext";
import AddExpenseModal from "./components/add-expense-modal";
import UncategorizedBudgetCard from "./components/uncategorized-budget-card/index";
import TotalBudgetCard from "./components/total-budget-card";
import ViewExpensesModal from "./components/view-expenses-modal";

// make a styled component for the cards grid container
const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1rem;
  align-items: start;
`;

function App() {
  const { budgets, getBudgetExpenses, expenses } = useBudgets();
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [defaultBudgetUniqueId, setDefaultBudgetUniqueId] = useState("");
  const [expensesPopupBudgetUniqueId, setExpensesPopupBudgetUniqueId] =
    useState(UNCATEGORIZED_BUDGET_UNIQUE_ID);
  const [showViewExpenseModal, setShowViewExpenseModal] = useState(false);

  const openAddExpenseModal = (
    budgetUniqueId = UNCATEGORIZED_BUDGET_UNIQUE_ID
  ) => {
    setDefaultBudgetUniqueId(budgetUniqueId);
    setShowAddExpenseModal(true);
  };

  const openViewExpensesModal = (
    budgetUniqueId = UNCATEGORIZED_BUDGET_UNIQUE_ID
  ) => {
    setExpensesPopupBudgetUniqueId(budgetUniqueId);
    setShowViewExpenseModal(true);
  };
  
  console.log(expenses);

  return (
    <>
      <Container className="my-4">
        <Stack gap={2} direction="horizontal" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add budget
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => openAddExpenseModal()}
          >
            Add expense
          </Button>
        </Stack>
        <CardsGrid>
          {budgets.map((budget: IBudget, index: number) => {
            const amount = getBudgetExpenses(budget.uniqueId).reduce(
              (acc: number, expense: IExpense) => acc + expense.amount,
              0
            );

            return (
              <BudgetCard
                key={budget.uniqueId}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => {
                  openAddExpenseModal(budget.uniqueId);
                }}
                onViewExpensesClick={() => {
                  openViewExpensesModal(budget.uniqueId);
                }}
              />
            );
          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={() =>
              openAddExpenseModal(UNCATEGORIZED_BUDGET_UNIQUE_ID)
            }
            onViewExpensesClick={() => {
              openViewExpensesModal(UNCATEGORIZED_BUDGET_UNIQUE_ID);
            }}
          />
          <TotalBudgetCard />
        </CardsGrid>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetUniqueId={defaultBudgetUniqueId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpensesModal
        show={showViewExpenseModal}
        handleClose={() => setShowViewExpenseModal(false)}
        budgetUniqueId={expensesPopupBudgetUniqueId}
      />
    </>
  );
}

export default App;
