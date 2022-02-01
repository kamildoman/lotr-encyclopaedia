import React, { FunctionComponent, useState } from "react";
import styled from "styled-components/native";
import Character from "../components/Character";
import Background from "../assets/backgrounds/characters.jpg";
import { useSelector } from "react-redux";
import { Store } from "../redux/store";
import { CharacterProps } from "../components/types";
type RootState = ReturnType<typeof Store.getState>;
import { RootStackParamList } from "../navigators/RootStack";
import { StackScreenProps } from "@react-navigation/stack";

type Props = StackScreenProps<RootStackParamList, "Characters">;

const CharactersContainer = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const CharactersBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

const TestText = styled.Text`
  text-align: center;
  font-family: anirb;
  font-size: 26px;
  max-width: 100%;
  padding: 6px;
  margin-bottom: 20px;
  color: white;
`;

const Characters: FunctionComponent<Props> = () => {
  const characters = useSelector((state: RootState) => state.charactersReducer);

  const [pageNumber, setPageNumber] = useState(0);

  return (
    <CharactersBackground source={Background} resizeMode="cover" blurRadius={3}>
      <CharactersContainer>
        {characters["characters"]
          .slice(pageNumber, pageNumber + 8)
          .map((character: CharacterProps) => (
            <Character key={character["_id"]} character={character} />
          ))}
        <TestText onPress={() => setPageNumber(pageNumber + 8)}>
          ...more
        </TestText>
      </CharactersContainer>
    </CharactersBackground>
  );
};

export default Characters;
