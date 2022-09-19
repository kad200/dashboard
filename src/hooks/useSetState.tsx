import { useState } from "react";

const useSetState = (initialState: any = {}) => {
  const [state, set] = useState(initialState);
  const setState = (patch: any) => {
    set({ ...state, ...patch });
  };

  return [state, setState];
};

export default useSetState;
