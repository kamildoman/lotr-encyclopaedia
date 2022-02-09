import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Login from "../Login";
export const actualNav = jest.requireActual("@react-navigation/native");

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

it("renders default elements, dispatch on pressing Login button", () => {
  const { getByText, getByPlaceholderText, getByTestId } = render(
    <Login
      route={{ key: "Login-s0fCmH8HJYsCySCe3m_D6", name: "Login" }}
      navigation={actualNav}
    />
  );
  getByText("Login");
  getByPlaceholderText("username (login)");
  getByPlaceholderText("password (password)");
  fireEvent.press(getByTestId("Login.Button"));
  expect(mockDispatch).toBeCalledTimes(1);
});
