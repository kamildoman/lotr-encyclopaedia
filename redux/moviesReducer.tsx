import { SET_MOVIES } from "./actions";

const initialState = {
  movies: [],
};

export const moviesReducer = (
  state = initialState,
  action: { type: string; payload: [] }
) => {
  switch (action.type) {
    case SET_MOVIES:
      return { ...state, movies: action.payload };
    default:
      return state;
  }
};
