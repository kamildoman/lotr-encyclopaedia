import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import { BookListProps } from "./types";
import { useNavigation } from "@react-navigation/native";
import { Props as MainPageProps } from "../screens/MainPage";

const NameText = styled.Text`
  font-size: 20px;
  font-family: anirb;
  text-align: center;
  color: #fef7e7;
`;

const NavigateButton = styled.TouchableOpacity`
  width: 80%;
  height: 22%;
  margin: 15px;
  align-items: center;
  justify-content: center;
  background-color: #345566;
  border: 2px solid #fef7e7;
  align-items: center;
  justify-content: center;
`;

const Book: FunctionComponent<BookListProps> = (props) => {
  const navigation = useNavigation<MainPageProps["navigation"]>();
  const handlePress = () => {
    navigation.navigate("SingleBooksChapter", { ...props });
  };
  return (
    <NavigateButton onPress={() => handlePress()}>
      <NameText>{props.name}</NameText>
    </NavigateButton>
  );
};

export default Book;
