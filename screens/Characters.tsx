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
import { Container, BackgroundImage, CenterText } from "../components/shared";

type Props = StackScreenProps<RootStackParamList, "Characters">;

const Characters: FunctionComponent<Props> = () => {
  const characters = useSelector((state: RootState) => state.charactersReducer);

  const [pageNumber, setPageNumber] = useState(0);

  return (
    <BackgroundImage source={Background} resizeMode="cover" blurRadius={3}>
      <CharactersContainer>
        {characters["characters"]
          .slice(pageNumber, pageNumber + 8)
          .map((character: CharacterProps) => (
            <Character key={character["_id"]} character={character} />
          ))}
        <NameText onPress={() => setPageNumber(pageNumber + 8)}>
          ...more
        </NameText>
      </CharactersContainer>
    </BackgroundImage>
  );
};

const CharactersContainer = styled(Container)`
  margin-top: 20px;
`;

const NameText = styled(CenterText)`
  font-size: 26px;
  max-width: 100%;
  padding: 6px;
  margin-bottom: 20px;
`;

export default Characters;
