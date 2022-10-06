import { Button } from "components/Button/Button";
import "./Unauthorized.scss"

function Unauthorized() {
  return (
    <div className="page__unauthorized">
      <h1>You are not authorized to visit this page</h1>
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

export default Unauthorized;
