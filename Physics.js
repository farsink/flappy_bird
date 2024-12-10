import Matter from "matter-js";
import { Platform } from "react-native";
import { getPipesizePosPair } from "./utils/random";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const Physics = (entities, { touches, time, dispatch }) => {
  let engine = entities.physics.engine;

  // Function to handle jumping
  const handleJump = () => {
    if (entities.Bird) {
      Matter.Body.setVelocity(entities.Bird.body, { x: 0.02, y: -7 });
    }
  };
  if (Platform.OS === "web") {
    document.addEventListener("click", handleJump);
  }
  if (Platform.OS === "web") {
    window.addEventListener("keydown", (e)=>{
      if(e.key === ' '){
        handleJump();
      }
    });
  }
  if (entities.touches) {
    entities.touches
      .filter((touch) => touch.type === "press")
      .forEach((touch) => {
        handleJump();
      });
  }

  Matter.Engine.update(engine, time.delta);

  for (let i = 1; i <= 2; i++) {
    if (
      entities[`Obstecletop${i}`].body.bounds.max.x <= 50 &&
      !entities[`Obstecletop${i}`].points
    ) {
      dispatch({ type: "new_points" });
      entities[`Obstecletop${i}`].points = true;
    }

    entities[`Obstecletop${i}`].points = false;
    
    if (entities[`Obstecletop${i}`].body.bounds.max.x <= 0) {
      const pipeSizePos = getPipesizePosPair(width * 0.002);
      
      Matter.Body.setPosition(entities[`Obstecletop${i}`].body, pipeSizePos.pipeTop.pos);
      Matter.Body.setPosition(entities[`ObstecleBottom${i}`].body, pipeSizePos.pipeBottom.pos);
    }
    
    Matter.Body.translate(entities[`Obstecletop${i}`].body, { x: -3, y: 0 });
    Matter.Body.translate(entities[`ObstecleBottom${i}`].body, { x: -3, y: 0 });
  }

  Matter.Events.on(engine, "collisionStart", (e) => {
    dispatch({ type: "game_over" });
  });
  return entities;
};

export default Physics;

let cleanup = () => {
  if (Platform.OS === "web") {
    document.removeEventListener("click", handleJump);
  }
};
export { cleanup };
