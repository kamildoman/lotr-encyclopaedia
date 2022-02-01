import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { charactersReducer } from "./reducers";
import { booksReducer } from "./booksReducer";
import { moviesReducer } from "./moviesReducer";
import { quotesReducer } from "./quotesReducer";
import { loginReducer } from "./loginReducer";

const rootReducer = combineReducers({
  charactersReducer: charactersReducer,
  booksReducer: booksReducer,
  moviesReducer: moviesReducer,
  quotesReducer: quotesReducer,
  loginReducer: loginReducer,
});

export const Store = createStore(rootReducer, applyMiddleware(thunk));
