import NetInfo from "@react-native-community/netinfo";

const connectivityMiddleware = (store) => (next) => (action) => {
  NetInfo.fetch().then((state) => {
    if (!state.isConnected) {
      // Check if the device is offline
      // You can dispatch a network error action or show an offline message here
      console.log("Device is offline. Action blocked.");
      // You can dispatch an action to inform your app about the offline status
      // store.dispatch({ type: "NETWORK_ERROR" });
    } else {
      // Device is online, allow the action to proceed
      next(action);
    }
  });
};

export default connectivityMiddleware;
