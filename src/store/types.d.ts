import { Store, AnyAction } from "redux";
import rootReducer from "./reducers/rootReducer";
import { store } from "../index";

export declare namespace Redux {
  type RootState = ReturnType<typeof rootReducer>;

  type Dispatch = typeof store.dispatch;

  type ApplicationStore = Store<RootState, AnyAction>;
}
