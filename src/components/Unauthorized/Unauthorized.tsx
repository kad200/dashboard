import { Button } from 'components';
import './Unauthorized.scss';

export const Unauthorized = () => {
  return (
    <div className="page__unauthorized">
      <h1>You are not authorized to visit this page</h1>
      <Button
        children="Go back"
        onClick={() => {
          window.history.back();
        }}
      />
    </div>
  );
};
