import { LOGIN, GET_TOKEN } from "./actions";

const initialState = {
  user: null,
  token: null,
};

export function loginReducer(
  state = initialState,
  action: { type: string; id: string; token: string }
) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.id,
        token: action.token,
      };
    case GET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
}
