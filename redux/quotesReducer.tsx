import { SET_QUOTES } from "./actions";

const initialState = {
  quotes: [],
};

export function quotesReducer(
  state = initialState,
  action: { type: string; payload: [] }
) {
  switch (action.type) {
    case SET_QUOTES:
      return {
        ...state,
        quotes: state.quotes.concat(action.payload),
        // so it can add all lotr films quotes including fellowship of the ring
        // quotes: action.payload,
      };
    default:
      return state;
  }
}
