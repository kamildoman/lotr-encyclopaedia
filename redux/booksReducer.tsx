import { SET_BOOKS, SET_CHAPTERS } from "./actions";

const initialState = {
  books: [],
  chapters: [],
};

export function booksReducer(
  state = initialState,
  action: { type: string; payload: [] }
) {
  switch (action.type) {
    case SET_BOOKS:
      return { ...state, books: action.payload };
    case SET_CHAPTERS:
      return { ...state, chapters: action.payload };
    default:
      return state;
  }
}
