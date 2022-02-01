import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import { MovieProps } from "./types";
import { useNavigation } from "@react-navigation/native";
import { Props as MainPageProps } from "../screens/MainPage";

const NameText = styled.Text`
  font-size: 20px;
  color: #fef7e7;
  font-family: anirb;
  text-align: center;
`;

const NavigateButton = styled.TouchableOpacity`
  width: 80%;
  height: 22%;
  margin: 15px;
  align-items: center;
  justify-content: center;
  background-color: #2e4938;
  border: 2px solid #fef7e7;
`;

const Movie: FunctionComponent<{ movie: MovieProps }> = ({ movie }) => {
  const navigation = useNavigation<MainPageProps["navigation"]>();
  const handlePress = () => {
    navigation.navigate("SingleMovieQuotes", { ...movie });
  };

  return (
    <NavigateButton onPress={() => handlePress()}>
      <NameText>{movie.name}</NameText>
    </NavigateButton>
  );
};

export default Movie;
