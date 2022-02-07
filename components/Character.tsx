import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import { CharacterProps } from "./types";
import { useNavigation } from "@react-navigation/native";
import { Props as MainPageProps } from "../screens/MainPage";
import { CenterText } from "./shared";
import { colors } from "./colors";

const Character: FunctionComponent<{ character: CharacterProps }> = ({
  character,
}) => {
  const navigation = useNavigation<MainPageProps["navigation"]>();
  const handlePress = () => {
    navigation.navigate("SingleCharacter", { ...character });
  };
  return (
    <TextWrap>
      <CenterText onPress={() => handlePress()}>{character.name}</CenterText>
    </TextWrap>
  );
};

const TextWrap = styled.View`
  background-color: ${colors.characterRed};
  border: 2px solid ${colors.goldenWhite};
  width: 90%;
  flex: 1;
  margin: 5px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export default Character;
