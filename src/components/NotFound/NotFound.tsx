import { Button } from "components/Button/Button";
import "./NotFound.scss";

function NotFound() {
  return (
    <div className="page__not-found">
      <h1>Page not found</h1>
      <Button
        onClick={() => {
          window.history.back();
        }}
        variant={"danger"}
        size={"small"}
      >
        Go Back
      </Button>
    </div>
  );
}

export default NotFound;
