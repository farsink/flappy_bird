import Matter from "matter-js";
import React from "react";
import { StyleSheet } from "react-native";
import { View, Image } from "react-native-web";

const Obstacle = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xbody = props.body.position.x - widthBody / 2;
  const ybody = props.body.position.y - heightBody / 2;

  const imageSource = require("../assets/pipe4.png");

  return (
    <View
      style={[styles.obstacle, {
        backgroundColor: 'transparent',
        position: "absolute",
        top: ybody,
        left: xbody,
        width: widthBody,
        height: heightBody,
      }]}
    >
      <Image source={imageSource} style={styles.obstacleImage} />
    </View>
  );
};

export default function createObstacle(world, label, pos, color, size) {
  const initialObstacle = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
    label,
    isStatic: true,
  });
  Matter.World.add(world, initialObstacle);

  return {
    body: initialObstacle,
    color,
    size,
    pos,
    renderer: <Obstacle body={initialObstacle} color={color} />,
  };
}

const styles = StyleSheet.create({
  obstacle: {
    position: "absolute",
    zIndex: -1,
  },
  obstacleImage: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
    position: "absolute",
    top: "0",
  },
});
