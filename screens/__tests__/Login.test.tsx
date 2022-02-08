import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
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
