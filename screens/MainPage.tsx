import React, { FunctionComponent } from "react";
import { BackHandler } from "react-native";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../navigators/RootStack";
import Background from "../assets/backgrounds/mainpage.jpg";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Props = StackScreenProps<RootStackParamList, "MainPage">;

const Box = styled.SafeAreaView`
  flex: 1;
  margin-top: 50px;
  align-items: center;
  justify-content: center;
`;

const MainPageBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

const CategoryButton = styled.TouchableOpacity`
  width: 80%;
  height: 14%;
  margin: 15px;
  align-items: center;
  justify-content: center;
  background-color: #debc72;
  border: 2px solid #221d00;
`;

const LogoutButton = styled.TouchableHighlight`
  width: 20%;
  height: 25px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  align-items: center;
  justify-content: center;
`;

const LogoutText = styled.Text`
  font-size: 20px;
  color: #c7c7c7;
`;

const ButtonText = styled.Text`
  font-size: 20px;
  font-family: anirb;
`;

const MainPage: FunctionComponent<Props> = ({ navigation }) => {
  // to disable back button
  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     () => true
  //   );
  //   return () => backHandler.remove();
  // }, []);
  return (
    <>
      <StatusBar />
      <MainPageBackground source={Background} resizeMode="cover" blurRadius={3}>
        <Box>
          <CategoryButton
            onPress={() => {
              navigation.navigate("Books");
            }}
          >
            <ButtonText>Books</ButtonText>
          </CategoryButton>
          <CategoryButton
            onPress={() => {
              navigation.navigate("Movies");
            }}
          >
            <ButtonText>Movies</ButtonText>
          </CategoryButton>
          <CategoryButton
            onPress={() => {
              navigation.navigate("Characters");
            }}
          >
            <ButtonText>Characters</ButtonText>
          </CategoryButton>
          <LogoutButton
            onPress={() => {
              AsyncStorage.removeItem("userToken");
              navigation.navigate("Login");
            }}
          >
            <LogoutText>Logout</LogoutText>
          </LogoutButton>
        </Box>
      </MainPageBackground>
    </>
  );
};

export default MainPage;
