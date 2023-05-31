import { useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { IExpense, useBudgets } from "../../contexts/BudgetsContext";
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
  const { getBudgetExpenses } = useBudgets();

  const expenses = getBudgetExpenses(budgetUniqueId);

  return (
    <Modal onHide={handleClose} show={show}>
      <Modal.Header closeButton>
        <Modal.Title>Budget expenses</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap={2}>
          {expenses.map((expense: IExpense) => (
            <Stack direction="horizontal" key={expense.uniqueId}>
              <div className="me-auto fs-4">{expense.description}</div>
              <Stack direction="horizontal" gap={4}>
                <div className="fs-6">{currencyFormatter(expense.amount)}</div>
                <Button variant="outline-danger">&times;</Button>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default ViewExpensesModal;
