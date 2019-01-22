import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import promise from "redux-promise-middleware";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const loggerMiddleware = createLogger();

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, promise(), loggerMiddleware))
);
