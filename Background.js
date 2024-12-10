import React from "react";
import { Image, Animated, Dimensions } from "react-native";

const Background = ({ isRunning }) => {
  const screenWidth = Dimensions.get("window").width;
  const position = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (isRunning) {
      Animated.loop(
        Animated.timing(position, {
          toValue: -screenWidth,
          duration: 100000, // Adjust the duration to control speed
          useNativeDriver: true,
        }),
        { iterations: -1 } // Infinite loop
      ).start();
    } else {
      position.setValue(0);
    }
  }, [isRunning, screenWidth]);

  const translateX = position.interpolate({
    inputRange: [-screenWidth, 0],
    outputRange: [-screenWidth, 0],
    extrapolate: "clamp",
  });
  return (
    <Animated.View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
      <Animated.Image
        source={require("../flappy_bird/assets/background3.png")}
        style={{
          width: screenWidth*2, // Make the image twice as wide as the screen
          height: "100%",
          transform: [{ translateX }],
        }}
        resizeMode="repeat"
      />
    </Animated.View>
  );
};

export default Background;
