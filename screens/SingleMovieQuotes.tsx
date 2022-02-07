import React, { FunctionComponent, useState, useRef, useEffect } from "react";
import styled from "styled-components/native";
import { SingleQuoteProps } from "../components/types";
import Quote from "../components/Quote";
import Background from "../assets/backgrounds/movies.jpg";
import { AntDesign } from "@expo/vector-icons";
import { Animated } from "react-native";
import { useSelector } from "react-redux";
import { Store } from "../redux/store";
type RootState = ReturnType<typeof Store.getState>;
import { RootStackParamList } from "../navigators/RootStack";
import { StackScreenProps } from "@react-navigation/stack";
import {
  BackgroundImage,
  CenterText,
  RowContainer,
  DetailsArea,
  RightContainer,
} from "../components/shared";
import { colors } from "../components/colors";

type Props = StackScreenProps<RootStackParamList, "SingleMovieQuotes">;

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
    <BackgroundImage source={Background} resizeMode="cover" blurRadius={3}>
      <RowContainer horizontal={true} pagingEnabled={true}>
        <DetailsArea>
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
        </DetailsArea>
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
      </RowContainer>
    </BackgroundImage>
  );
};

const DetailText = styled(CenterText)`
  font-size: 18px;
  text-align: left;
  padding: 10px 15px;
`;

const TitleText = styled(DetailText)`
  text-align: center;
  font-size: 20px;
`;

const QuoteText = styled(TitleText)`
  color: ${colors.goldenBlack};
`;

const DoubleArrow = styled(Animated.View)`
  position: absolute;
  right: 0;
  top: 40%;
`;

export default SingleMovieQuotes;
