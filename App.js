import { StatusBar } from "expo-status-bar";
import { Platform, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
// @ts-ignore
import Physics from "./Physics";
import { useEffect, useState } from "react";
// @ts-ignore
import Background from "./Background";
import Kodemono from "../flappy_bird/assets/fonts/KodeMono-VariableFont_wght.ttf";
import { useFonts } from "expo-font";

export default function App() {
  const [isrunning, setisrunning] = useState("false");
  const [engine, setengine] = useState(null);
  const [Score, setScore] = useState(0);
  const [GameOver, setGameOver] = useState(false);
  const [loaded] = useFonts({
    Kodemono: require("../flappy_bird/assets/fonts/KodeMono-VariableFont_wght.ttf"),
  });

  useEffect(() => {
    setisrunning(false);
  }, []);

  const handleGameOver = () => {
    setGameOver(true);
    setisrunning(false);
    engine.stop();
  };

  return (
    <View style={{ flex: 1 }}>
      <Background isRunning={isrunning} />

      <GameEngine
        ref={(ref) => {
          setengine(ref);
        }}
        systems={[Physics]}
        entities={entities()}
        running={isrunning}
        onEvent={(e) => {
          switch (e.type) {
            case "game_over":
              handleGameOver();
              break;
            case "new_points":
              setScore(Score + 1);
              console.log(`New score: ${Score + 1}`);
              break;
          }
        }}
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "transparent",
        }}
      >
        <StatusBar style="auto" hidden={true} />
      </GameEngine>
      <Text style={[styles.scoreText, styles.centeredText, !isrunning && { opacity: 0 }]}>
        {Score}
      </Text>

      {!isrunning ? (
        <View style={[{ flex: 1, justifyContent: "center", alignItems: "center" }]}>
          {!GameOver ? (
            <>
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => {
                  setisrunning(true);
                  setScore(0);
                  setGameOver(false);
                  engine.swap(entities());
                }}
              >
                <Text style={styles.startButtonText}>Tap to Start!</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={[styles.gameOverText, styles.centeredText]}>Game Over!</Text>
              <Text style={[styles.finalText]}>Final Score: {Score}</Text>
              <TouchableOpacity
                style={styles.restartButton}
                onPress={() => {
                  setisrunning(true);
                  setScore(0);
                  setGameOver(false);
                  engine.swap(entities());
                }}
              >
                <Text style={styles.startButtonText}>Restart</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  scoreText: {
    position: "absolute",
    top: 10,
    left: "50%",

    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
    textShadowColor: "#000000",
    textShadowRadius: 2,
    textShadowOffset: { width: 1, height: 1 },
    fontFamily: "Kodemono",
  },
  gameOverText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ff0000",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Kodemono",
  },
  startButton: {
    position: "absolute",
    bottom: "50%",
    left: "45%",
    borderRadius: 25,
    shadowRadius: 0,
    paddingRight: "10px",
    paddingLeft: "10px",
    shadowOffset: { width: 0, height: 5 },
  },
  restartButton: {
    marginTop: 20,
    backgroundColor: "#ff0000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    textTransform: "uppercase",
    fontFamily: "Kodemono",
  },
  centeredText: {
    textAlign: "center",
  },
  finalText: {
    position: "absolute",
    top: 10,

    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
    textShadowColor: "#000000",
    textShadowRadius: 2,
    textShadowOffset: { width: 1, height: 1 },
    fontFamily: "Kodemono",
  },
});
