import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import { CharacterProps } from "./types";
import { useNavigation } from "@react-navigation/native";
import { Props as MainPageProps } from "../screens/MainPage";

const NameText = styled.Text`
  align-items: center;
  justify-content: center;
  font-family: anirb;
  text-align: center;
  color: #fdfae0;
  font-size: 18px;
`;

const TextWrap = styled.View`
  background-color: #662726;
  border: 2px solid #fef7e7;
  width: 90%;
  flex: 1;
  margin: 5px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

const Character: FunctionComponent<{ character: CharacterProps }> = ({
  character,
}) => {
  const navigation = useNavigation<MainPageProps["navigation"]>();
  const handlePress = () => {
    navigation.navigate("SingleCharacter", { ...character });
  };
  return (
    <TextWrap>
      <NameText onPress={() => handlePress()}>{character.name}</NameText>
    </TextWrap>
  );
};

export default Character;
