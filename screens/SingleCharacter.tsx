import React, { FunctionComponent, useState, useEffect, useRef } from "react";
import styled from "styled-components/native";
import { SingleQuoteProps } from "../components/types";
import Background from "../assets/backgrounds/characters.jpg";
import { Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Animated } from "react-native";
import { useSelector } from "react-redux";
import { Store } from "../redux/store";
type RootState = ReturnType<typeof Store.getState>;
import { RootStackParamList } from "../navigators/RootStack";
import { StackScreenProps } from "@react-navigation/stack";

type Props = StackScreenProps<RootStackParamList, "SingleCharacter">;

const screenWidth = Math.floor(Dimensions.get("window").width);

const CharacterContainer = styled.ScrollView`
  flex: 1;
  flex-direction: row;
  width: 100%;
`;

const CharactersDetailsArea = styled.View`
  background-color: rgba(0, 0, 0, 0.6);
  width: ${screenWidth}px;
`;
const RightContainer = styled.View`
  flex-direction: column;
  width: ${screenWidth}px;
  align-items: center;
`;

const CharacterText = styled.Text`
  align-items: center;
  justify-content: center;
  /* font-family: anirb; */
  font-size: 20px;
  text-align: center;
  margin: 5px 10px;
`;

const CharactersBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

const DoubleArrow = styled(Animated.View)`
  position: absolute;
  right: 0;
  top: 40%;
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
  color: #cdd1d1;
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

const SingleCharacter: FunctionComponent<Props> = ({ route }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [characterQuotes, setCharacterQuotes] = useState([]);

  const quotes = useSelector((state: RootState) => state.quotesReducer);

  function findQuotes() {
    let charQuotes = quotes["quotes"].filter(
      (singleQuote: SingleQuoteProps) => {
        if (singleQuote["character"] === route.params._id) {
          return true;
        }
      }
    );
    setCharacterQuotes(charQuotes);
  }

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
    findQuotes();
    animateArrowLeft();
  }, []);

  return (
    <CharactersBackground source={Background} resizeMode="cover" blurRadius={3}>
      <CharacterContainer horizontal={true} pagingEnabled={true}>
        <CharactersDetailsArea>
          <DoubleArrow style={{ transform: [{ translateX: animateArrow }] }}>
            <AntDesign name="doubleright" size={34} color="white" />
          </DoubleArrow>
          <TitleText>{route.params.name}</TitleText>
          <DetailText>• Birth: {route.params.birth}</DetailText>
          <DetailText>• Death: {route.params.death}</DetailText>
          <DetailText>• Gender: {route.params.gender}</DetailText>
          <DetailText>• Hair: {route.params.hair}</DetailText>
          <DetailText>• Height: {route.params.height}</DetailText>
          <DetailText>• Race: {route.params.race}</DetailText>
          <DetailText>• Realm: {route.params.realm}</DetailText>
          <DetailText>• Spuse: {route.params.spouse}</DetailText>
        </CharactersDetailsArea>
        <RightContainer>
          <QuoteText>quotes: </QuoteText>

          {characterQuotes &&
            characterQuotes
              .slice(pageNumber, pageNumber + 5)
              .map((quote: SingleQuoteProps) => (
                <QuotesContainer key={quote["_id"]}>
                  <CharacterText key={quote["_id"]}>
                    {quote["dialog"]}
                  </CharacterText>
                </QuotesContainer>
              ))}

          {characterQuotes.length < 1 && (
            <TitleText>The character doesn't have any quotes</TitleText>
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
      </CharacterContainer>
    </CharactersBackground>
  );
};

export default SingleCharacter;
