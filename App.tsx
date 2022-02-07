import React from "react";
import RootStack from "./navigators/RootStack";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { Store } from "./redux/store";

export default () => {
  const [fontsLoader] = useFonts({
    anirb: require("./assets/fonts/anirb.ttf"),
  });

  if (!fontsLoader) {
    return <AppLoading />;
  }
  return (
    <Provider store={Store}>
      <RootStack />
    </Provider>
  );
};
