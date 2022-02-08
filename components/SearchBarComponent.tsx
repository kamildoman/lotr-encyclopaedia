import React, { FunctionComponent, useState, useEffect } from "react";
import styled from "styled-components/native";
import RNPickerSelect from "react-native-picker-select";
import { Alert } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Props as MainPageProps } from "../screens/MainPage";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { RootState } from "./shared";
import { colors } from "./colors";
import { BookListProps, MovieProps, CharacterProps } from "./types";
import { RootStackParamList } from "../navigators/RootStack";

var stringSimilarity = require("string-similarity");

const SearchBarComponent: FunctionComponent = () => {
  const navigation = useNavigation<MainPageProps["navigation"]>();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Book");
  const route = useRoute();

  // change category depending on the screen name
  const categoryOnRefresh = () => {
    if (
      route.name === "MainPage" ||
      route.name === "Books" ||
      route.name === "SingleBooksChapter"
    ) {
      setCategory("Book");
    } else if (route.name === "Movies" || route.name === "SingleMovieQuotes") {
      setCategory("Movie");
    } else {
      setCategory("Character");
    }
  };

  useEffect(() => {
    categoryOnRefresh();
  }, []);

  // getting characters, books, movies
  const characters = useSelector((state: RootState) => state.charactersReducer);
  const books = useSelector((state: RootState) => state.booksReducer);
  const movies = useSelector((state: RootState) => state.moviesReducer);

  // find items functions

  const checkSimilarity = (
    array: Array<BookListProps> | Array<CharacterProps> | Array<MovieProps>
  ) => {
    let toReturn;
    let previousSimilarity = 0;
    for (let i = 0; i < array.length; i++) {
      const similarity = stringSimilarity.compareTwoStrings(
        array[i]["name"].toLowerCase(),
        search.toLowerCase()
      );
      if (similarity > 0.7 && similarity > previousSimilarity) {
        toReturn = array[i];
        previousSimilarity = similarity;
      } else if (category === "Character") {
        // for characters I want to check their first name also, so e.g. "frodo" will work, no need to type "frodo baggins"
        const similarity = stringSimilarity.compareTwoStrings(
          array[i]["name"].toLowerCase().split(" ")[0],
          search.toLowerCase().split(" ")[0]
        );
        if (similarity > 0.7 && similarity > previousSimilarity) {
          toReturn = array[i];
          previousSimilarity = similarity;
        }
      }
    }
    return toReturn;
  };

  const findSameItem = (
    array: Array<BookListProps> | Array<CharacterProps> | Array<MovieProps>,
    goTo: keyof RootStackParamList
  ) => {
    const character: BookListProps | CharacterProps | MovieProps | undefined =
      checkSimilarity(array);
    if (character) {
      navigation.push(goTo, { ...character });
      setSearch("");
      return true;
    }
    return false;
  };

  const alert = () => {
    return Alert.alert(
      "Error",
      "Couldn't find " + search + " in category: " + category
    );
  };

  const handleSearch = (): void => {
    if (category === "Book") {
      if (findSameItem(books["books"], "SingleBooksChapter")) {
        return;
      }
    } else if (category === "Movie") {
      if (findSameItem(movies["movies"], "SingleMovieQuotes")) {
        return;
      }
    } else if (category === "Character") {
      if (findSameItem(characters["characters"], "SingleCharacter")) {
        return;
      }
    }
    alert();
  };
  // find items functions

  return (
    <SearchContainer>
      <DropdownMenu>
        <RNPickerSelect
          onValueChange={(value) => setCategory(value)}
          items={[
            { label: "Book", value: "Book" },
            { label: "Movie", value: "Movie" },
            { label: "Character", value: "Character" },
          ]}
          pickerProps={{
            accessibilityLabel: "Select category",
          }}
        >
          <DropdownText>
            {category}{" "}
            <Ionicons name="arrow-down-circle" size={20} color={"#000"} />
          </DropdownText>
        </RNPickerSelect>
      </DropdownMenu>
      <SearchInput
        placeholder="search..."
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
      <SearchButton
        onPress={() => {
          handleSearch();
        }}
      >
        <CategoryText>GO</CategoryText>
      </SearchButton>
    </SearchContainer>
  );
};

const SearchContainer = styled.View`
  width: 90%;
  margin-right: 10px;
  margin-left: 15px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const SearchInput = styled.TextInput`
  margin-left: 5px;
  background-color: ${colors.goldenWhite};
  color: black;
  width: 60%;
  padding: 5px 10px;
  font-size: 20px;
  height: 40px;
  border: 1px solid black;
`;

const CategoryText = styled.Text`
  font-size: 20px;
`;

const DropdownText = styled.Text`
  font-size: 20px;
  padding: 6px;
  padding-top: 5px;
`;

const SearchButton = styled.TouchableHighlight`
  width: 39px;
  height: 39px;
  background-color: white;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  margin-right: 5px;
`;

const DropdownMenu = styled.TouchableHighlight`
  background-color: ${colors.goldenWhite};
  border: 1px solid black;
`;

export default SearchBarComponent;
