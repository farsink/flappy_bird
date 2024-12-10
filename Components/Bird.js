import Matter from "matter-js";
import React from "react";
import { Image, StyleSheet } from "react-native";
import { View } from "react-native-web";


const Bird = (props) => {
  const widthBody =
    props.body.bounds.max.x -
    props.body.bounds.min.x;
  const heightBody =
    props.body.bounds.max.y -
    props.body.bounds.min.y;

  const xbody =
    props.body.position.x - widthBody / 2;
  const ybody =
    props.body.position.y - heightBody / 2;

  const color = props.color;
  const imageSource = require("../assets/Flappy_bird.png");

  return (
    <View
      style={[styles.Bird,{
        borderWidth: 0,
        borderColor: color,
        borderRadius :50,
        borderStyle: "solid",
        position: "absolute",
        top: ybody,
        left: xbody,
        width: widthBody,
        height: heightBody,
      }]}
    >
      <Image source={imageSource} style={styles.BirdImage} />
    </View>
  );
};

export default function (
  world,
  pos,
  color,
  size
) {
  const initialBird = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: "Bird" }
  );
  Matter.World.add(world, initialBird);

  return {
    body: initialBird,
    color,
    size,
    pos,
    renderer: <Bird />,
  };
}
const styles = StyleSheet.create({
  Bird: {
    position: "absolute",
    zIndex: 50,
  },
  BirdImage: {
    width: "200%",
    height: "200%",
    resizeMode: "stretch",
    position: "absolute",
    top: -16,
    left:-13,
  
  },
});