import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {
  IBudget,
  UNCATEGORIZED_BUDGET_UNIQUE_ID,
  useBudgets,
} from "../../contexts/BudgetsContext";

interface Props {
  show: boolean;
  handleClose: () => void;
  defaultBudgetUniqueId: string;
}

const AddExpenseModal: React.FC<Props> = ({
  show,
  handleClose,
  defaultBudgetUniqueId,
}) => {
  const { addExpense, budgets } = useBudgets();
  const [inputValues, setInputValues] = useState({
    description: "",
    amount: 0,
    budgetUniqueId: "",
  });

  useEffect(() => {
    setInputValues((prevState) => ({
      ...prevState,
      budgetUniqueId: defaultBudgetUniqueId,
    }));
  }, [defaultBudgetUniqueId]);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    addExpense(
      inputValues.description,
      inputValues.amount,
      inputValues.budgetUniqueId,
    );

    setInputValues((prevState) => ({
      ...prevState,
      description: "",
      amount: 0,
    }));
    handleClose();
  };

  return (
    <Modal onHide={handleClose} show={show}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="budgetDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={inputValues.description}
              onChange={(e) =>
                setInputValues({ ...inputValues, description: e.target.value })
              }
              type="text"
              placeholder="Enter expense description"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgetAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              required
              min={0}
              step={0.1}
              value={inputValues.amount}
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  amount: Number(e.target.value),
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgetUniqueId">
            <Form.Label>Budget</Form.Label>
            <Form.Select
              value={inputValues.budgetUniqueId}
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  budgetUniqueId: e.target.value,
                })
              }
            >
              <option value={UNCATEGORIZED_BUDGET_UNIQUE_ID}>
                Uncategorized
              </option>
              {budgets.map((budget: IBudget) => (
                <option key={budget.uniqueId} value={budget.uniqueId}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddExpenseModal;
