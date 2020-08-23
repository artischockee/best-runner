import { Action, Store, AnyAction } from "redux";
import { ThunkDispatch as ReduxThunkDispatch } from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

export declare namespace Redux {
  type RootState = ReturnType<typeof rootReducer>;

  type ThunkDispatch = ReduxThunkDispatch<RootState, any, Action>;

  type ThunkGetState = () => RootState;

  type ApplicationStore = Store<RootState, AnyAction>;
}
