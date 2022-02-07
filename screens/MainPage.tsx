import React, { FunctionComponent } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../navigators/RootStack";
import Background from "../assets/backgrounds/mainpage.jpg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BackgroundImage, CustomButton } from "../components/shared";
import { colors } from "../components/colors";

export type Props = StackScreenProps<RootStackParamList, "MainPage">;

const MainPage: FunctionComponent<Props> = ({ navigation }) => {
  return (
    <>
      <StatusBar />
      <BackgroundImage source={Background} resizeMode="cover" blurRadius={3}>
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
      </BackgroundImage>
    </>
  );
};

const Box = styled.SafeAreaView`
  flex: 1;
  margin-top: 50px;
  align-items: center;
  justify-content: center;
`;

const CategoryButton = styled(CustomButton)`
  height: 14%;
  background-color: ${colors.gold};
  border: 2px solid ${colors.goldenBlack};
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
  color: ${colors.goldenWhite};
`;

const ButtonText = styled.Text`
  font-size: 20px;
  font-family: anirb;
`;

export default MainPage;
