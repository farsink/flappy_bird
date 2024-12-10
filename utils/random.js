import { Dimensions } from "react-native";

const { width, height } =
  Dimensions.get("window");

export const getRandom = (min, max) => {
  return Math.floor(
    Math.random() * (max - min + 1) + min
  );
};

export const getPipesizePosPair = (
  AddToPosX = 0
) => {
  let yposTop = -getRandom(300, height - 100);

  const pipeTop = {
    pos: { x: width + AddToPosX, y: yposTop },
    size: { height: height * 2, width: 100 },
  };
  const pipeBottom = {
    pos: {
      x: width + AddToPosX,
      y:
        height * 2 +
        getRandom(175, 300) +
        yposTop,
    },
    size: { height: height * 2, width: 100 },
  };

  return { pipeTop, pipeBottom };
};
