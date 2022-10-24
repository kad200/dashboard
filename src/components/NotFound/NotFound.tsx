import { Button } from "components";
import "./NotFound.scss";

function NotFound() {
  return (
    <div className="page__not-found">
      <h1>Page not found</h1>
      <Button
        children="Go back"
        onClick={() => {
          window.history.back();
        }}
        variant={"danger"}
        size={"small"}
      />
    </div>
  );
}

export default NotFound;
