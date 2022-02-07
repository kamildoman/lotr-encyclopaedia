import React, { FunctionComponent } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainPage from "../screens/MainPage";
import Books from "../screens/Books";
import SingleBooksChapter from "../screens/SingleBooksChapter";
import Movies from "../screens/Movies";
import Login from "../screens/Login";
import { BookListProps, CharacterProps, MovieProps } from "../components/types";
import SingleMovieQuotes from "../screens/SingleMovieQuotes";
import Characters from "../screens/Characters";
import SingleCharacter from "../screens/SingleCharacter";
import SearchBarComponent from "../components/SearchBarComponent";
import { colors } from "../components/colors";

export type RootStackParamList = {
  Login: undefined;
  MainPage: undefined;
  Books: undefined;
  SingleBooksChapter: BookListProps;
  Movies: undefined;
  SingleMovieQuotes: MovieProps;
  Characters: undefined;
  SingleCharacter: CharacterProps;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStack: FunctionComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: `${colors.gold}`,
            borderBottomWidth: 0,
            shadowColor: "transparent",
            shadowOpacity: 0,
            elevation: 0,
            height: 120,
          },
          headerTitle: () => <SearchBarComponent />,
        }}
        initialRouteName="Login"
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainPage"
          component={MainPage}
          options={{ headerLeft: () => null }}
        />
        <Stack.Screen name="Books" component={Books} />
        <Stack.Screen
          name="SingleBooksChapter"
          component={SingleBooksChapter}
        />
        <Stack.Screen name="Movies" component={Movies} />
        <Stack.Screen name="SingleMovieQuotes" component={SingleMovieQuotes} />
        <Stack.Screen name="Characters" component={Characters} />
        <Stack.Screen name="SingleCharacter" component={SingleCharacter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
