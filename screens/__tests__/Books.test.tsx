import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import Books from "../Books";
export const actualNav = jest.requireActual("@react-navigation/native");
import * as redux from "react-redux";

const spy = jest.spyOn(redux, "useSelector");
spy.mockReturnValue({ books: [] });

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

it("renders correctly", async () => {
  const { getByTestId } = await waitFor(() =>
    render(
      <Books route={{ key: "test", name: "Books" }} navigation={actualNav} />
    )
  );
  getByTestId("Books.Container");
});
