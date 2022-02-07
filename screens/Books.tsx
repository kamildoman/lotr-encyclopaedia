import React, { FunctionComponent } from "react";
import Book from "../components/Book";
import Background from "../assets/backgrounds/books.jpg";
import { useSelector } from "react-redux";
import { BookListProps } from "../components/types";
import { RootStackParamList } from "../navigators/RootStack";
import { StackScreenProps } from "@react-navigation/stack";
import { Container, BackgroundImage, RootState } from "../components/shared";

type Props = StackScreenProps<RootStackParamList, "Books">;

const Books: FunctionComponent<Props> = () => {
  const { books } = useSelector((state: RootState) => state.booksReducer);

  return (
    <BackgroundImage source={Background} resizeMode="cover" blurRadius={3}>
      <Container>
        {books.map((singleBook: BookListProps) => (
          <Book
            key={singleBook["_id"]}
            _id={singleBook["_id"]}
            name={singleBook["name"]}
          />
        ))}
      </Container>
    </BackgroundImage>
  );
};

export default Books;
