import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Book from "../Book";

const mockedNavigate = jest.fn();

const mockProps = { _id: "test", name: "test" };

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

it("testing if navigation works", () => {
  const { getByTestId } = render(<Book {...mockProps} />);
  fireEvent.press(getByTestId("navigate"));
  expect(mockedNavigate).toBeCalledWith("SingleBooksChapter", { ...mockProps });
});
