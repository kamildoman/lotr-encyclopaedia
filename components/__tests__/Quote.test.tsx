import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Quote from "../Quote";

const mockedNavigate = jest.fn();

const mockProps = {
  _id: "test",
  dialog: "test",
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
  movie: "test",
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
  const { getByTestId } = render(<Quote {...mockProps} />);
  fireEvent.press(getByTestId("navigate"));
  expect(mockedNavigate).toBeCalledWith("SingleCharacter", {
    ...mockProps.character,
  });
});
