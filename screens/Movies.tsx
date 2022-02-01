import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import Movie from "../components/Movie";
import Background from "../assets/backgrounds/movies.jpg";
import { useSelector } from "react-redux";
import { Store } from "../redux/store";
import { MovieProps } from "../components/types";
type RootState = ReturnType<typeof Store.getState>;
import { RootStackParamList } from "../navigators/RootStack";
import { StackScreenProps } from "@react-navigation/stack";

type Props = StackScreenProps<RootStackParamList, "Movies">;

const MoviesContainer = styled.View`
  width: 100%;
  height: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const MoviesBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

const Movies: FunctionComponent<Props> = () => {
  const movies = useSelector((state: RootState) => state.moviesReducer);
  return (
    <MoviesBackground source={Background} resizeMode="cover" blurRadius={3}>
      <MoviesContainer>
        {movies["movies"].map((singleMovie: MovieProps) => (
          <Movie key={singleMovie._id} movie={singleMovie} />
        ))}
      </MoviesContainer>
    </MoviesBackground>
  );
};

export default Movies;
