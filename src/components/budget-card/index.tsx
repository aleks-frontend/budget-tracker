import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../../helpers";

interface Props {
  name: string;
  amount: number;
  max?: number;
  gray?: boolean;
  onAddExpenseClick?: () => void;
  onViewExpensesClick?: () => void;
  hideButtons?: boolean;
}

const getProgressBarRatio = (amount: number, max: number) => {
  const ratio = amount / max;
  if (ratio < 0.5) {
    return "primary";
  } else if (ratio < 0.75) {
    return "warning";
  } else {
    return "danger";
  }
};

const BudgetCard: React.FC<Props> = ({ amount, name, max, gray, onAddExpenseClick, onViewExpensesClick, hideButtons }) => {
  const classNames = [];
  if (!!max && (amount > max)) {
    classNames.push("bg-danger", "bg-opacity-10");
  } else if (gray) {
    classNames.push("bg-light");
  }

  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline ">
            {currencyFormatter(amount)}
            {max !== undefined && <span className="text-muted fs-6 ms-1">
              / {currencyFormatter(max)}
            </span>}
          </div>
        </Card.Title>
        {max !== undefined && <ProgressBar
          className="rounded-pill"
          variant={getProgressBarRatio(amount, max)}
          min={0}
          max={max}
          now={amount}
        />}
        {!hideButtons && <Stack gap={2} direction="horizontal" className="mt-4">
          <Button variant="outline-primary" className="ms-auto" onClick={onAddExpenseClick}>
            Add expense
          </Button>
          <Button variant="outline-secondary" onClick={onViewExpensesClick}>View expenses</Button>
        </Stack>}
      </Card.Body>
    </Card>
  );
};

export default BudgetCard;
