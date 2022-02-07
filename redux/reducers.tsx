import { SET_CHARACTERS } from "./actions";

const initialState = {
  characters: [],
};

export const charactersReducer = (
  state = initialState,
  action: { type: string; payload: [] }
) => {
  switch (action.type) {
    case SET_CHARACTERS:
      return { ...state, characters: action.payload };
    default:
      return state;
  }
};
