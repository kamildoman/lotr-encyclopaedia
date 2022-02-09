import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Movie from "../Movie";

const mockedNavigate = jest.fn();

const mockProps = {
  movie: {
    _id: "test",
    academyAwardNominations: 1,
    academyAwardWins: 1,
    boxOfficeRevenueInMillions: 1,
    budgetInMillions: 1,
    name: "test",
    rottenTomatoesScore: 1,
    runtimeInMinutes: 1,
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
  const { getByTestId } = render(<Movie {...mockProps} />);
  fireEvent.press(getByTestId("navigate"));
  expect(mockedNavigate).toBeCalledWith("SingleMovieQuotes", {
    ...mockProps.movie,
  });
});
