import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useBudgets } from "../../contexts/BudgetsContext";

interface Props {
  show: boolean;
  handleClose: () => void;
}

const AddBudgetModal: React.FC<Props> = ({ show, handleClose }) => {
  const { addBudget } = useBudgets();
  const [inputValues, setInputValues] = useState({
    name: "",
    max: 0,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addBudget(inputValues.name, inputValues.max);
    setInputValues({
      name: "",
      max: 0,
    });
    handleClose();
  };

  return (
    <Modal onHide={handleClose} show={show}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="budgetName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={inputValues.name}
              onChange={(e) =>
                setInputValues({ ...inputValues, name: e.target.value })
              }
              type="text"
              placeholder="Enter budget name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgetName">
            <Form.Label>Maximum spending</Form.Label>
            <Form.Control
              type="number"
              required
              min={0}
              step={0.1}
              value={inputValues.max}
              onChange={(e) =>
                setInputValues({ ...inputValues, max: Number(e.target.value) })
              }
            />
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

export default AddBudgetModal;
