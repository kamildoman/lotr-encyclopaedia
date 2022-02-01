import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import Book from "../components/Book";
import Background from "../assets/backgrounds/books.jpg";
import { useSelector } from "react-redux";
import { Store } from "../redux/store";
import { BookListProps } from "../components/types";
type RootState = ReturnType<typeof Store.getState>;
import { RootStackParamList } from "../navigators/RootStack";
import { StackScreenProps } from "@react-navigation/stack";

type Props = StackScreenProps<RootStackParamList, "Books">;

const BooksContainer = styled.View`
  width: 100%;
  height: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const BooksBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

const Books: FunctionComponent<Props> = () => {
  const { books, chapters } = useSelector(
    (state: RootState) => state.booksReducer
  );

  return (
    <BooksBackground source={Background} resizeMode="cover" blurRadius={3}>
      <BooksContainer>
        {books.map((singleBook: BookListProps) => (
          <Book
            key={singleBook["_id"]}
            _id={singleBook["_id"]}
            name={singleBook["name"]}
          />
        ))}
      </BooksContainer>
    </BooksBackground>
  );
};

export default Books;
