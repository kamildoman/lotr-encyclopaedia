import React, { FunctionComponent } from "react";
import Movie from "../components/Movie";
import Background from "../assets/backgrounds/movies.jpg";
import { useSelector } from "react-redux";
import { Store } from "../redux/store";
import { MovieProps } from "../components/types";
import { RootStackParamList } from "../navigators/RootStack";
import { StackScreenProps } from "@react-navigation/stack";
import { Container, BackgroundImage } from "../components/shared";

type Props = StackScreenProps<RootStackParamList, "Movies">;
type RootState = ReturnType<typeof Store.getState>;

const Movies: FunctionComponent<Props> = () => {
  const movies = useSelector((state: RootState) => state.moviesReducer);
  return (
    <BackgroundImage source={Background} resizeMode="cover" blurRadius={3}>
      <Container>
        {movies["movies"].map((singleMovie: MovieProps) => (
          <Movie key={singleMovie._id} movie={singleMovie} />
        ))}
      </Container>
    </BackgroundImage>
  );
};

export default Movies;
