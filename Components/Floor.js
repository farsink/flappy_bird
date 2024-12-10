import Matter from "matter-js";
import React from "react";
import { View,StyleSheet,Image} from "react-native";

const Floor = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xbody = props.body.position.x - widthBody / 2;
  const ybody = props.body.position.y - heightBody / 2;

  const color = props.color;
  const imageSource = require("../assets/ground.png"); // Replace with the actual path to your image

  return (
    <View
      style={[
        styles.floorContainer,
        {
          backgroundColor: color,
          position: "absolute",
          top: ybody,
          left: xbody,
          width: widthBody,
          height: heightBody,
        },
      ]}
    >
      <Image source={imageSource} style={styles.floorImage} />
    </View>
  );
};

export default function (
  world,
  pos,
  color,
  size
) {
  const initialFloor = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: "Floor", isStatic: true }
  );
  Matter.World.add(world, initialFloor);

  return {
    body: initialFloor,
    color,
    size,
    pos,
    renderer: <Floor />,
  };
}

const styles = StyleSheet.create({
  floorContainer: {
    position: "absolute",
    overflow: "hidden", // Add this to clip the image
  },
  floorImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
   top:0,
   zIndex:100

  },
});