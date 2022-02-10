import { LOGIN } from "./actions";

const initialState = {
  user: null,
  token: null,
};

export const loginReducer = (
  state = initialState,
  action: { type: string; id: string; token: string }
) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.id,
        token: action.token,
      };
    default:
      return state;
  }
};
