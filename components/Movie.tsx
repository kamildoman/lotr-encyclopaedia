import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import { MovieProps } from "./types";
import { useNavigation } from "@react-navigation/native";
import { Props as MainPageProps } from "../screens/MainPage";
import { CenterText, CustomButton } from "./shared";
import { colors } from "./colors";

const Movie: FunctionComponent<{ movie: MovieProps }> = ({ movie }) => {
  const navigation = useNavigation<MainPageProps["navigation"]>();
  const handlePress = () => {
    navigation.navigate("SingleMovieQuotes", { ...movie });
  };

  return (
    <NavigateButton onPress={() => handlePress()}>
      <CenterText>{movie.name}</CenterText>
    </NavigateButton>
  );
};

const NavigateButton = styled(CustomButton)`
  background-color: ${colors.movieGreen};
`;

export default Movie;
