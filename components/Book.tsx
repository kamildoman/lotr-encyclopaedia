import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import { BookListProps } from "./types";
import { useNavigation } from "@react-navigation/native";
import { Props as MainPageProps } from "../screens/MainPage";
import { CenterText, CustomButton } from "./shared";

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

const NameText = styled(CenterText)`
  font-size: 20px;
`;

const NavigateButton = styled(CustomButton)`
  background-color: #345566;
`;

export default Book;
