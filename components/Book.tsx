import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import { BookListProps } from "./types";
import { useNavigation } from "@react-navigation/native";
import { Props as MainPageProps } from "../screens/MainPage";
import { CenterText, CustomButton } from "./shared";
import { colors } from "./colors";

const Book: FunctionComponent<BookListProps> = (props) => {
  const navigation = useNavigation<MainPageProps["navigation"]>();
  const handlePress = () => {
    navigation.navigate("SingleBooksChapter", { ...props });
  };
  return (
    <NavigateButton onPress={() => handlePress()}>
      <CenterText>{props.name}</CenterText>
    </NavigateButton>
  );
};

const NavigateButton = styled(CustomButton)`
  background-color: ${colors.bookBlue};
`;

export default Book;
