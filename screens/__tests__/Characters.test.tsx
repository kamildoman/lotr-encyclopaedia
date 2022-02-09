import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import Characters from "../Characters";
export const actualNav = jest.requireActual("@react-navigation/native");
import * as redux from "react-redux";

const spy = jest.spyOn(redux, "useSelector");
spy.mockReturnValue({ characters: [] });

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

it("renders correctly", async () => {
  const { getByTestId } = await waitFor(() =>
    render(
      <Characters
        route={{ key: "test", name: "Characters" }}
        navigation={actualNav}
      />
    )
  );
  getByTestId("Character.Container");
});
