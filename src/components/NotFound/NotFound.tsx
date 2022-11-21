import { Button } from "components";
import "./NotFound.scss";

export const NotFound = () => {
  return (
    <div className="page__not-found">
      <h1>Page not found</h1>
      <Button
        children="Go back"
        onClick={() => {
          window.history.back();
        }}
      />
    </div>
  );
}