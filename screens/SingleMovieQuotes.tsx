import React, { FunctionComponent, useState, useRef, useEffect } from "react";
import styled from "styled-components/native";
import { SingleQuoteProps, CharacterProps } from "../components/types";
import Quote from "../components/Quote";
import Background from "../assets/backgrounds/movies.jpg";
import { AntDesign } from "@expo/vector-icons";
import { Animated } from "react-native";
import { useSelector } from "react-redux";
import { RootStackParamList } from "../navigators/RootStack";
import { StackScreenProps } from "@react-navigation/stack";
import {
  BackgroundImage,
  CenterText,
  RowContainer,
  DetailsArea,
  RightContainer,
  RootState,
} from "../components/shared";
import { colors } from "../components/colors";

type Props = StackScreenProps<RootStackParamList, "SingleMovieQuotes">;

const SingleMovieQuotes: FunctionComponent<Props> = ({ route }) => {
  const [pageNumber, setPageNumber] = useState(0);

  const animateArrow = useRef(new Animated.Value(0)).current;

  const animateArrowLeft = () => {
    Animated.timing(animateArrow, {
      toValue: -10,
      useNativeDriver: true,
      duration: 500,
    }).start(() => animateArrowRight());
  };

  const animateArrowRight = () => {
    Animated.timing(animateArrow, {
      toValue: 0,
      useNativeDriver: true,
      duration: 500,
    }).start(() => animateArrowLeft());
  };

  useEffect(() => {
    animateArrowLeft();
  }, []);

  const quotes = useSelector((state: RootState) => state.quotesReducer);
  const characters = useSelector((state: RootState) => state.charactersReducer);

  const findCharacter = (quote: any) => {
    const character: CharacterProps = characters["characters"].find(
      (char: CharacterProps) => char["_id"] === quote["character"]
    )!;

    return (
      <Quote
        key={quote["_id"]}
        _id={quote["_id"]}
        dialog={quote["dialog"]}
        character={character}
        movie={quote["movie"]}
      />
    );
  };

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
            .filter(
              (singleQuote: SingleQuoteProps) =>
                singleQuote["movie"] === route.params._id &&
                singleQuote["dialog"]
            )
            .slice(pageNumber, pageNumber + 6)
            .map((quote: SingleQuoteProps) => findCharacter(quote))}
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
  text-align: left;
  padding: 10px 15px;
`;

const TitleText = styled(DetailText)`
  text-align: center;
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
