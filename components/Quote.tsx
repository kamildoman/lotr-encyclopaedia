import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import { QuoteWithCharacterProps } from "./types";
import { useNavigation } from "@react-navigation/native";
import { Props as MainPageProps } from "../screens/MainPage";
import { colors } from "./colors";

const Quote: FunctionComponent<QuoteWithCharacterProps> = (props) => {
  const navigation = useNavigation<MainPageProps["navigation"]>();
  const handlePress = () => {
    navigation.navigate("SingleCharacter", { ...props.character });
  };

  return (
    <QuotesContainer>
      <NameButton testID="navigate" onPress={() => handlePress()}>
        <NameText>{props.character?.name}</NameText>
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
