import { useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import {
  IBudget,
  IExpense,
  UNCATEGORIZED_BUDGET_UNIQUE_ID,
  useBudgets,
} from "../../contexts/BudgetsContext";
import { currencyFormatter } from "../../helpers";

interface Props {
  show: boolean;
  handleClose: () => void;
  budgetUniqueId: string;
}

const ViewExpensesModal: React.FC<Props> = ({
  show,
  handleClose,
  budgetUniqueId,
}) => {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets();

  const expenses = getBudgetExpenses(budgetUniqueId);
  const budgetIsUncategorized =
    budgetUniqueId === UNCATEGORIZED_BUDGET_UNIQUE_ID;
  const budget = budgetIsUncategorized
    ? {
        name: "Uncategorized",
        uniqueId: UNCATEGORIZED_BUDGET_UNIQUE_ID,
      }
    : budgets.find((b: IBudget) => b.uniqueId === budgetUniqueId);

  return (
    <Modal onHide={handleClose} show={show}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap={2}>
            <div>Expenses - {budget?.name}</div>
            {!budgetIsUncategorized && (
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => {
                  handleClose();
                  deleteBudget(budgetUniqueId);
                }}
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap={2}>
          {expenses.map((expense: IExpense) => (
            <Stack direction="horizontal" key={expense.uniqueId}>
              <div className="me-auto fs-4">{expense.description}</div>
              <Stack direction="horizontal" gap={4}>
                <div className="fs-6">{currencyFormatter(expense.amount)}</div>
                <Button size="sm" variant="outline-danger" onClick={() => deleteExpense(expense.uniqueId)}>&times;</Button>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default ViewExpensesModal;
