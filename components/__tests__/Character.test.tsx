import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Character from "../Character";

const mockedNavigate = jest.fn();

const mockProps = {
  character: {
    _id: "test",
    birth: "test",
    death: "test",
    gender: "test",
    hair: "test",
    height: "test",
    name: "test",
    race: "test",
    realm: "test",
    spouse: "test",
    wikiUrl: "test",
  },
};

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
  const { getByTestId } = render(<Character {...mockProps} />);
  fireEvent.press(getByTestId("navigate"));
  expect(mockedNavigate).toBeCalledWith("SingleCharacter", {
    ...mockProps.character,
  });
});
