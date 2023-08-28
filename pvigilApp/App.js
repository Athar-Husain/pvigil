import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import FlashMessage from "react-native-flash-message";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { StyleSheet } from "react-native";
import { MyDrawer } from "./MyDrawer";

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar
        style="light-content"
        backgroundColor="#89ccff"
        translucent={false}
      />
      <NavigationContainer>
        {/* <UserComponent /> */}
        <MyDrawer />
      </NavigationContainer>
      <FlashMessage position="top" />
      {/* Add this line to render flash messages */}
    </Provider>
  );
};

// export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    zIndex: 999,
  },
});

export default App;
