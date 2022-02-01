import React, { FunctionComponent, useState, useRef, useEffect } from "react";
import styled from "styled-components/native";
import { SingleQuoteProps } from "../components/types";
import Quote from "../components/Quote";
import Background from "../assets/backgrounds/movies.jpg";
import { Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Animated } from "react-native";
import { useSelector } from "react-redux";
import { Store } from "../redux/store";
type RootState = ReturnType<typeof Store.getState>;
import { RootStackParamList } from "../navigators/RootStack";
import { StackScreenProps } from "@react-navigation/stack";

type Props = StackScreenProps<RootStackParamList, "SingleMovieQuotes">;

const screenWidth = Math.floor(Dimensions.get("window").width);

const QuotesContainer = styled.ScrollView`
  flex: 1;
  flex-direction: row;
  width: 100%;
`;

const RightContainer = styled.View`
  flex-direction: column;
  width: ${screenWidth}px;
  align-items: center;
`;

const DetailText = styled.Text`
  font-size: 18px;
  font-family: anirb;
  text-align: left;
  color: #fef7e7;
  padding: 10px 15px;
`;

const TitleText = styled(DetailText)`
  text-align: center;
  font-size: 20px;
`;

const QuoteText = styled(TitleText)`
  color: #040606;
`;

const MovieDetailsArea = styled.View`
  background-color: rgba(0, 0, 0, 0.6);
  width: ${screenWidth}px;
`;

const MoviesBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

const DoubleArrow = styled(Animated.View)`
  position: absolute;
  right: 0;
  top: 40%;
`;

const SingleMovieQuotes: FunctionComponent<Props> = ({ route }) => {
  const [pageNumber, setPageNumber] = useState(0);

  const animateArrow = useRef(new Animated.Value(0)).current;

  function animateArrowLeft() {
    Animated.timing(animateArrow, {
      toValue: -10,
      useNativeDriver: true,
      duration: 500,
    }).start(() => animateArrowRight());
  }

  function animateArrowRight() {
    Animated.timing(animateArrow, {
      toValue: 0,
      useNativeDriver: true,
      duration: 500,
    }).start(() => animateArrowLeft());
  }

  useEffect(() => {
    animateArrowLeft();
  }, []);

  const quotes: any = useSelector((state: RootState) => state.quotesReducer);
  return (
    <MoviesBackground source={Background} resizeMode="cover" blurRadius={3}>
      <QuotesContainer horizontal={true} pagingEnabled={true}>
        <MovieDetailsArea>
          <DoubleArrow style={{ transform: [{ translateX: animateArrow }] }}>
            <AntDesign name="doubleright" size={34} color="white" />
          </DoubleArrow>
          <TitleText>{route.params.name}: </TitleText>
          <DetailText>
            • Academy award nominations: {route.params.academyAwardNominations}
          </DetailText>
          <DetailText>
            • Academy award wins: {route.params.academyAwardWins}
          </DetailText>
          <DetailText>
            • Box office revenue: {route.params.boxOfficeRevenueInMillions}
            mln$
          </DetailText>
          <DetailText>• Budget: {route.params.budgetInMillions}mln$</DetailText>
          <DetailText>
            • Rottes tomatoes: {route.params.rottenTomatoesScore}%
          </DetailText>
          <DetailText>• Runtime: {route.params.runtimeInMinutes}min</DetailText>
        </MovieDetailsArea>
        <RightContainer>
          <QuoteText>quotes: </QuoteText>
          {quotes["quotes"]
            .filter((singleQuote: SingleQuoteProps) => {
              if (
                singleQuote["movie"] === route.params._id &&
                singleQuote["dialog"]
              ) {
                return true;
              }
            })
            .slice(pageNumber, pageNumber + 6)
            .map((quote: SingleQuoteProps) => (
              <Quote
                key={quote["_id"]}
                _id={quote["_id"]}
                dialog={quote["dialog"]}
                character={quote["character"]}
                movie={quote["movie"]}
              />
            ))}
          <TitleText
            onPress={() => {
              setPageNumber(pageNumber + 6);
            }}
          >
            ...more
          </TitleText>
        </RightContainer>
      </QuotesContainer>
    </MoviesBackground>
  );
};

export default SingleMovieQuotes;
