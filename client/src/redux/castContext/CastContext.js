import CastReducer from "./CastReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  casts: [],
  isFetching: false,
  error: false,
};

export const CastContext = createContext(INITIAL_STATE);

export const CastContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CastReducer, INITIAL_STATE);

  return (
    <CastContext.Provider
      value={{
        casts: state.casts,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </CastContext.Provider>
  );
};