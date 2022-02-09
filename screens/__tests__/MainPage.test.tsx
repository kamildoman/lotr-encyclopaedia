import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MainPage from "../MainPage";
export const actualNav = jest.requireActual("@react-navigation/native");

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

it("testing if navigation works", () => {
  const { getByTestId } = render(
    <MainPage
      route={{ key: "test", name: "MainPage" }}
      navigation={{ navigate: mockDispatch, ...actualNav }}
    />
  );
  fireEvent.press(getByTestId("Books.Button"));
  expect(mockDispatch).toBeCalledWith("Books");
  fireEvent.press(getByTestId("Movies.Button"));
  expect(mockDispatch).toBeCalledWith("Movies");
  fireEvent.press(getByTestId("Characters.Button"));
  expect(mockDispatch).toBeCalledWith("Characters");
  fireEvent.press(getByTestId("Logout.Button"));
  expect(mockDispatch).toBeCalledWith("Login");
});
