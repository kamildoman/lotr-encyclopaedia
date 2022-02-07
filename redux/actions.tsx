export const SET_CHARACTERS = "SET_CHARACTERS";
export const SET_MOVIES = "SET_MOVIES";
export const SET_BOOKS = "SET_BOOKS";
export const SET_CHAPTERS = "SET_CHAPTERS";
export const SET_QUOTES = "SET_QUOTES";
export const LOGIN = "LOGIN";
export const GET_TOKEN = "GET_TOKEN";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "redux";

export const setCharacters = (characters: []) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_CHARACTERS,
    payload: characters,
  });
};

export const setBooks = (books: []) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_BOOKS,
    payload: books,
  });
};

export const setChapters = (chapters: []) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_CHAPTERS,
    payload: chapters,
  });
};

// I want only LOtR films, not hobbit
export const setMovies = (movies: []) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_MOVIES,
    payload: movies.filter(
      (singleMovie: { name: string }) =>
        singleMovie.name === "The Fellowship of the Ring" ||
        singleMovie.name === "The Two Towers " ||
        singleMovie.name === "The Return of the King"
    ),
  });
};

export const setQuotes = (quotes: []) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_QUOTES,
    payload: quotes,
  });
};

export const loginUser =
  (login: string, password: string) => async (dispatch: Dispatch) => {
    let userToken;
    userToken = null;
    if (
      login.toLowerCase() === "login" &&
      password.toLowerCase() === "password"
    ) {
      try {
        userToken = "a2lkuhfailb213ll3231ksa";
        await AsyncStorage.setItem("userToken", userToken);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Wrong username or password");
    }
    dispatch({
      type: LOGIN,
      id: login,
      token: userToken,
    });
  };
