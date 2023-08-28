import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Animated,
  Dimensions,
} from "react-native";

import FormHeader from "../../components/Form/FormHeader";
import FormSelectorBtn from "../../components/Form/FormSelectorBtn";
import SignupForm from "../SignUp/SignUp";
import LoginForm from "../SignIn/SignIn";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { RESET } from "../../redux/features/auth/authSlice";

const { width } = Dimensions.get("window");

export default function AppForm() {
  const animation = useRef(new Animated.Value(0)).current;
  const scrollView = useRef();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigation.navigate("Profile");
    }

    dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigation]);

  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  const rightHeaderOpacity = animation.interpolate({
    inputRange: [0, width],
    outputRange: [1, 0],
  });

  const leftHeaderTranslateX = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, 40],
  });
  const rightHeaderTranslateY = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, -20],
  });
  const loginColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: ["rgba(27,27,51,1)", "rgba(27,27,51,0.4)"],
  });
  const signupColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: ["rgba(27,27,51,0.4)", "rgba(27,27,51,1)"],
  });

  return (
    <ScrollView>
      <View style={{ flex: 1, paddingTop: 120 }}>
        <View style={{ height: 80 }}>
          <FormHeader
            leftHeading="Welcome "
            rightHeading="Back"
            //   subHeading="YouTube Task Manager"
            rightHeaderOpacity={rightHeaderOpacity}
            leftHeaderTranslateX={leftHeaderTranslateX}
            rightHeaderTranslateY={rightHeaderTranslateY}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            marginBottom: 20,
          }}
        >
          <FormSelectorBtn
            style={styles.borderLeft}
            backgroundColor={loginColorInterpolate}
            title="Login"
            onPress={() => scrollView.current.scrollTo({ x: 0 })}
          />
          <FormSelectorBtn
            style={styles.borderRight}
            backgroundColor={signupColorInterpolate}
            title="Sign up"
            onPress={() => scrollView.current.scrollTo({ x: width })}
          />
        </View>
        <ScrollView
          ref={scrollView}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: animation } } }],
            { useNativeDriver: false }
          )}
        >
          <LoginForm />
          <ScrollView>
            <SignupForm scrollView={scrollView} />
          </ScrollView>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: width,
  },
  borderLeft: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  borderRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});
