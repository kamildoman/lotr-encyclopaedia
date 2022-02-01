import React, { FunctionComponent, useState, useEffect } from "react";
import styled from "styled-components/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../navigators/RootStack";
import { useDispatch } from "react-redux";
import {
  setCharacters,
  setBooks,
  setChapters,
  setMovies,
  setQuotes,
  loginUser,
} from "../redux/actions";
import { getData } from "../apiData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Background from "../assets/backgrounds/mainpage.jpg";

export type Props = StackScreenProps<RootStackParamList, "Login">;

const LoginContainer = styled.SafeAreaView`
  flex: 1;
  margin-top: 50px;
  align-items: center;
  justify-content: center;
`;

const LoginInput = styled.TextInput`
  margin-left: 5px;
  background-color: #c2c2c2;
  color: black;
  width: 80%;
  padding: 15px;
  font-size: 25px;
  border: 1px solid black;
  margin-top: 15px;
`;

const LoginButton = styled.TouchableOpacity`
  width: 80%;
  height: 14%;
  margin: 15px;
  align-items: center;
  justify-content: center;
  background-color: #debc72;
  border: 2px solid #221d00;
`;

const LoginBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

const ButtonText = styled.Text`
  font-size: 20px;
  font-family: anirb;
`;

const Login: FunctionComponent<Props> = ({ navigation }) => {
  let token = null;
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function APIData() {
    dispatch(setCharacters(await getData("/character/")));
    dispatch(setBooks(await getData("/book/")));
    dispatch(setChapters(await getData("/chapter/")));
    dispatch(setMovies(await getData("movie")));
    dispatch(setQuotes(await getData("quote")));
    // The API has a bug, fetch "quote" doesn't give Fellowship of the Ring quotes, so I have to do it separetaly:
    dispatch(setQuotes(await getData("/movie/5cd95395de30eff6ebccde5c/quote")));
  }
  useEffect(() => {
    APIData();
    navigate();
  }, []);

  async function navigate() {
    token = await AsyncStorage.getItem("userToken");
    if (token !== null) {
      navigation.navigate("MainPage");
    }
  }

  function handleLogin() {
    dispatch(loginUser(username, password));
    navigate();
  }
  return (
    <LoginBackground source={Background} resizeMode="cover" blurRadius={3}>
      <LoginContainer>
        <LoginInput
          placeholder="username (login)"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <LoginInput
          placeholder="password (password)"
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />

        <LoginButton
          onPress={() => {
            handleLogin();
          }}
        >
          <ButtonText>Login</ButtonText>
        </LoginButton>
      </LoginContainer>
    </LoginBackground>
  );
};

export default Login;
