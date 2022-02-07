import React, { FunctionComponent, useState, useEffect } from "react";
import styled from "styled-components/native";
import { SingleQuoteProps, CharacterProps } from "./types";
import { useNavigation } from "@react-navigation/native";
import { Props as MainPageProps } from "../screens/MainPage";
import { useSelector } from "react-redux";
import { Store } from "../redux/store";
type RootState = ReturnType<typeof Store.getState>;
import { colors } from "./colors";

const Quote: FunctionComponent<SingleQuoteProps> = (props) => {
  const [character, setCharacter] = useState<CharacterProps>(Object);

  useEffect(() => {
    findCharacter();
  }, []);
  const navigation = useNavigation<MainPageProps["navigation"]>();
  const handlePress = () => {
    navigation.navigate("SingleCharacter", { ...character });
  };

  const characters = useSelector((state: RootState) => state.charactersReducer);

  async function findCharacter() {
    let char = characters["characters"].filter((char: any) => {
      if (char["_id"] === props.character) {
        return true;
      }
    });
    setCharacter(char[0]);
  }

  return (
    <QuotesContainer>
      <NameButton onPress={() => handlePress()}>
        <NameText>{character?.name}</NameText>
      </NameButton>
      <DialogText>{props.dialog}</DialogText>
    </QuotesContainer>
  );
};

const QuotesContainer = styled.ScrollView`
  background-color: rgba(255, 255, 255, 0.8);
  margin: 5px;
  width: 95%;
  height: 15%;
`;

const NameButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: ${colors.movieGreen};
  border: 1px solid ${colors.goldenWhite};
`;

const DialogText = styled.Text`
  text-align: center;
  font-size: 20px;
  max-width: 100%;
  padding: 6px;
`;

const NameText = styled(DialogText)`
  color: ${colors.goldenWhite};
`;

export default Quote;
