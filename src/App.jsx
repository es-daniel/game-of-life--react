import React, { useState, useEffect } from "react";
import "./App.scss";
import Button from "./components/Button/Button";
import game from "./api/game_of_life";
import cx from "classname";

function App() {
  const [running, setRunning] = useState(false);
  const [pattern, setPattern] = useState("rand");

  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const fetchInitGrid = async () => {
      const { data: newGrid } = await game.startGame(pattern);
      setGrid(newGrid);
    };
    if (running && !grid.length) {
      fetchInitGrid();
    }
  }, [running, pattern]);

  useEffect(() => {
    const fetchNextGrid = async () => {
      const { data: updatedGrid } = await game.updateGame();

      setGrid(updatedGrid);
    };
    const timer = setTimeout(() => {
      if (running && grid.length) {
        fetchNextGrid();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [running, grid]);

  const startGame = ({ target: { value } }) => {
    setRunning(true);
    setPattern(value);
  };

  const pauseGame = () => setRunning(false);

  const isGamePaused = () => !running && grid.length;

  const stopGame = () => {
    setRunning(false);
    setGrid([]);
  };

  const isGridEmpty = () => !grid.length;

  const handleActionButton = (e) => {
    if (isGridEmpty() || isGamePaused()) {
      startGame(e);
    } else {
      pauseGame();
    }
  };

  return (
    <div className="game">
      <section className="game__grid">
        {grid.map((row, i) => {
          return (
            <div key={i} className="game__grid__row">
              {row.map((cell, y) => (
                <div
                  key={y}
                  className={cx("game__grid__row__cell", {
                    "game__grid__row__cell--dead": !cell,
                    "game__grid__row__cell--alive": cell,
                  })}
                ></div>
              ))}
            </div>
          );
        })}
      </section>
      <section className="game__buttons">
        <Button value="rand" onClick={handleActionButton} type="primary">
          {isGridEmpty()
            ? "Start Random"
            : isGamePaused()
            ? "Continue"
            : "Pause"}
        </Button>
        {isGridEmpty() && (
          <>
            <Button
              value="gosper_glider_gun"
              onClick={startGame}
              type="warning"
            >
              Gosper Glider Gun
            </Button>
            <Button value="pulsar" onClick={startGame} type="warning">
              Pulsar
            </Button>
          </>
        )}
        <Button onClick={stopGame} type="secondary">
          Stop
        </Button>
      </section>
    </div>
  );
}

export default App;
