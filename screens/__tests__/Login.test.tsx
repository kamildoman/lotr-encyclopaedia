// I tried to do testing but I failed. I'm gonna leave it here, so I can work on it in the future.

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Login from "../Login";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

it("renders default elements", () => {
  const { getByText, getByPlaceholderText } = render(<Login />);
  getByText("Login");
  getByPlaceholderText("username (login)");
  getByPlaceholderText("password (password)");
});

it("Login with correct username and password", async () => {
  const navigateMock = jest.fn();
  const { getByTestId, getByPlaceholderText } = render(
    <Login navigation={{ navigate: navigateMock }} />
  );
  const button = getByTestId("Login.Button");
  const login = getByPlaceholderText("username (login)");
  const password = getByPlaceholderText("password (password)");
  expect(button).not.toBeNull();
  expect(login).not.toBeNull();
  await waitFor(() => {
    fireEvent.changeText(login, "login");
    fireEvent.changeText(password, "password");
    fireEvent.press(button);
  });

  expect(navigateMock).toBeCalledWith("MainPage");
});
