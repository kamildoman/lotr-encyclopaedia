import React, { FunctionComponent, useState, useEffect, useRef } from "react";
import styled from "styled-components/native";
import { QuoteWithCharacterProps } from "../components/types";
import Background from "../assets/backgrounds/characters.jpg";
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
import { useDispatch } from "react-redux";
import { setQuotes } from "../redux/actions";
import { getData } from "../apiData";

type Props = StackScreenProps<RootStackParamList, "SingleCharacter">;

const SingleCharacter: FunctionComponent<Props> = ({ route }) => {
  const dispatch = useDispatch();

  const createQuotes = async () => {
    dispatch(setQuotes(await getData("/quote/")));
    dispatch(setQuotes(await getData("/movie/5cd95395de30eff6ebccde5c/quote")));
  };

  const [pageNumber, setPageNumber] = useState(0);
  const [characterQuotes, setCharacterQuotes] = useState([]);

  const quotes = useSelector((state: RootState) => state.quotesReducer);

  const findQuotes = () => {
    const charQuotes = quotes["quotes"].filter(
      (singleQuote) => singleQuote["character"] === route.params._id
    );
    setCharacterQuotes(charQuotes);
  };

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
    createQuotes();
    findQuotes();
    animateArrowLeft();
  }, []);

  return (
    <BackgroundImage source={Background} resizeMode="cover" blurRadius={3}>
      <RowContainer horizontal={true} pagingEnabled={true}>
        <DetailsArea>
          <DoubleArrow style={{ transform: [{ translateX: animateArrow }] }}>
            <AntDesign name="doubleright" size={34} color="white" />
          </DoubleArrow>
          <TitleText>{route.params.name}</TitleText>
          <DetailText>??? Birth: {route.params.birth}</DetailText>
          <DetailText>??? Death: {route.params.death}</DetailText>
          <DetailText>??? Gender: {route.params.gender}</DetailText>
          <DetailText>??? Hair: {route.params.hair}</DetailText>
          <DetailText>??? Height: {route.params.height}</DetailText>
          <DetailText>??? Race: {route.params.race}</DetailText>
          <DetailText>??? Realm: {route.params.realm}</DetailText>
          <DetailText>??? Spuse: {route.params.spouse}</DetailText>
        </DetailsArea>
        <RightContainer>
          <QuoteText>quotes: </QuoteText>

          {characterQuotes &&
            characterQuotes
              .slice(pageNumber, pageNumber + 5)
              .map((quote: QuoteWithCharacterProps) => (
                <QuotesContainer key={quote["_id"]}>
                  <CharacterText key={quote["_id"]}>
                    {quote["dialog"]}
                  </CharacterText>
                </QuotesContainer>
              ))}

          {characterQuotes.length < 1 && (
            <TitleText>The character does not have any quotes</TitleText>
          )}

          {characterQuotes.length > 0 && characterQuotes.length > pageNumber && (
            <TitleText
              onPress={() => {
                setPageNumber(pageNumber + 5);
              }}
            >
              ...more
            </TitleText>
          )}

          {characterQuotes.length > 0 &&
            characterQuotes.length <= pageNumber && (
              <TitleText>No more quotes</TitleText>
            )}
        </RightContainer>
      </RowContainer>
    </BackgroundImage>
  );
};

const CharacterText = styled.Text`
  margin: 5px 10px;
  color: ${colors.goldenBlack};
  font-size: 20px;
`;

const DoubleArrow = styled(Animated.View)`
  position: absolute;
  right: 0;
  top: 40%;
`;

const DetailText = styled(CenterText)`
  text-align: left;
  padding: 10px 15px;
`;

const TitleText = styled(DetailText)`
  text-align: center;
  font-size: 20px;
`;

const QuoteText = styled(TitleText)`
  color: ${colors.goldenWhite};
`;

const QuotesContainer = styled.ScrollView`
  background-color: rgba(255, 255, 255, 0.8);
  margin: 5px;
  width: 95%;
  height: 15%;
  max-height: 100px;
  border-radius: 10px;
  text-align: center;
`;

export default SingleCharacter;
