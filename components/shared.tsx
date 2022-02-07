import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { colors } from "./colors";
import { Store } from "../redux/store";

export const Container = styled.View`
  width: 100%;
  height: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const BackgroundImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

export const CenterText = styled.Text`
  font-family: anirb;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: ${colors.goldenWhite};
  font-size: 20px;
`;

export const CustomButton = styled.TouchableOpacity`
  width: 80%;
  height: 22%;
  margin: 15px;
  align-items: center;
  justify-content: center;
  border: 2px solid ${colors.goldenWhite};
  align-items: center;
  justify-content: center;
`;

export const RowContainer = styled.ScrollView`
  flex: 1;
  flex-direction: row;
  width: 100%;
`;

const screenWidth = Math.floor(Dimensions.get("window").width);

export const DetailsArea = styled.View`
  background-color: rgba(0, 0, 0, 0.6);
  width: ${screenWidth}px;
`;

export const RightContainer = styled.View`
  flex-direction: column;
  width: ${screenWidth}px;
  align-items: center;
`;

export type RootState = ReturnType<typeof Store.getState>;
