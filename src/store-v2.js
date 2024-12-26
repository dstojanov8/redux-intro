import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customters/customerSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
//* Without Middleware and React DevTools
// const store = createStore(rootReducer);

//* With applyMiddleware(thunk) we told our store that we using thunk middleware
// const store = createStore(rootReducer, applyMiddleware(thunk));

//* With React DevTools
// const store = createStore(
//   rootReducer,
//   composeWithDevTools() // Enables Redux DevTools
// );

//* With Thunk Middleware and React DevTools
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
