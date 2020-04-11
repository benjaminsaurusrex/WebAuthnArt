import * as Mousetrap from "mousetrap";
import React from "react";
import logo from "./logo.svg";
import { useUniverse } from "./use-universe";
import { Button } from "./ui/button";
import { useArt } from "./use-art";

const defaultBG = { r: 0, g: 0, b: 0, a: 255 };

function App() {
  const [canvasRef, setCanvasRef] = React.useState<HTMLCanvasElement | null>(
    null
  );
  const {
    isPlaying,
    isReady,
    createUniverse,
    getRandomColor,
    pause,
    play,
    random,
    reset,
  } = useUniverse();

  const active = isReady && isPlaying;

  /**
   * This hook fills the universe with visual art!
   */
  useArt({
    active,
    canvasRef,
    getRandomColor,
    random,
  });

  /**
   * Bind keys!
   */
  React.useEffect(() => {
    if (!isReady) {
      return;
    }

    const callback = () => {
      if (active) {
        pause();
      } else {
        play();
      }
    };

    Mousetrap.bind("space", callback);

    return () => {
      Mousetrap.unbind("space");
    };
  }, [active, play, pause, isReady]);

  /**
   * Clear the whole canvas. Use this when resetting.
   */
  const clear = React.useCallback(() => {
    canvasRef
      ?.getContext("2d")
      ?.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }, [canvasRef]);

  return (
    <>
      <canvas
        width={window.innerWidth}
        height={window.innerHeight}
        ref={(el) => setCanvasRef(el)}
        style={{
          background: `rgb(${defaultBG.r}, ${defaultBG.g}, ${defaultBG.b})`,
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!isReady && <NoUniverse create={createUniverse} />}
        {isReady && (
          <div
            style={{
              position: "absolute",
              left: "0",
              bottom: "0",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button onClick={play}>{"Play"}</Button>
            <Button onClick={pause}>{"Pause"}</Button>
            <Button
              onClick={() => {
                reset();
                clear();
              }}
            >
              {"Reset"}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

const NoUniverse: React.FC<{ create: () => void }> = ({ create }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "500px",
        color: "white",
      }}
    >
      <div style={{ margin: "1rem" }}>
        <img
          src={logo}
          alt="logo"
          style={{
            width: "100px",
            height: "100px",
          }}
        />
      </div>
      <div
        style={{
          margin: "1rem",
        }}
      >
        {
          "Have you ever wanted to create an entire universe of art and music from your hardware authentication token? Well you're in luck!"
        }
      </div>

      <div
        style={{
          margin: "1rem 1rem 2rem",
        }}
      >
        {"Click the button below, authenticate, then kick back and relax. :)"}
      </div>
      <Button onClick={create}>{"Create Universe"}</Button>
    </div>
  );
};

export default App;
