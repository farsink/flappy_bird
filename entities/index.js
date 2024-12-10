import Matter from "matter-js";
// @ts-ignore
import Bird from "../Components/Bird";
import Floor from "../Components/Floor";
import Obstecle from "../Components/Obstecle";
import { Dimensions } from "react-native";
import { getPipesizePosPair, getRandom } from "../utils/random";

const { width, height } = Dimensions.get("window");

export default (Restart) => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;

  world.gravity.y = 0.421;

  const PipePosA = getPipesizePosPair();
  const PipePosB = getPipesizePosPair(width * 0.5);

  return {
    physics: { world, engine },
    Bird: Bird(world, { x: 50, y: 250 }, "green", { height: 35, width: 35 }),

    Obstecletop1: Obstecle(
      world,
      "Obstecletop1",
      PipePosA.pipeTop.pos,
      "red",
      PipePosA.pipeTop.size
    ),
    ObstecleBottom1: Obstecle(
      world,
      "ObstecleBottom1",
      PipePosA.pipeBottom.pos,
      "blue",
      PipePosA.pipeBottom.size
    ),

    Floor: Floor(world, { x: width / 2, y: height }, "red", { height: 110, width: width }),

    Obstecletop2: Obstecle(
      world,
      "Obstecletop1",
      PipePosB.pipeTop.pos,
      "red",
      PipePosB.pipeTop.size
    ),
    ObstecleBottom2: Obstecle(
      world,
      "ObstecleBottom1",
      PipePosB.pipeBottom.pos,
      "blue",
      PipePosB.pipeBottom.size
    ),
  };
};
