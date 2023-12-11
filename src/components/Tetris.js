import React, { useState, useEffect, useCallback } from 'react';
import Stage from './Stage';
import usePlayer from '../hooks/usePlayer';

const Tetris = () => {
  const [score, setScore] = useState(0);
  const [rowsCleared, setRowsCleared] = useState(0);
  const [level, setLevel] = useState(1);
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const {
    player,
    updatePlayerPos,
    resetPlayer,
    playerRotate,
    playerDrop,
  } = usePlayer();

  const startGame = () => {
    setScore(0);
    setRowsCleared(0);
    setLevel(1);
    setGameOver(false);
    resetPlayer();
    setDropTime(1000);
  };

  const movePlayer = useCallback(
    (dir) => {
      if (!gameOver) {
        updatePlayerPos({ x: dir, y: 0 });
      }
    },
    [gameOver, updatePlayerPos]
  );
  
    const drop = useCallback(() => {
      if (!gameOver) {
        playerDrop();
      }
    }, [gameOver, playerDrop]);
  
    const keyUp = useCallback(({ keyCode }) => {
      if (!gameOver && keyCode === 40) {
        setDropTime(1000 / level + 200);
      }
    }, [gameOver, level]);
  
    const move = useCallback((e) => {
      if (e.keyCode === 37) {
        movePlayer(-1); // Move left
      } else if (e.keyCode === 39) {
        movePlayer(1); // Move right
      } else if (e.keyCode === 40) {
        drop(); // Drop piece
      } else if (e.keyCode === 38) {
        playerRotate(); // Rotate piece
      }
    }, [movePlayer, playerRotate, drop]);
  
    useEffect(() => {
      if (gameOver) return;
  
      const updateGame = () => {
        drop();
      };
  
      window.addEventListener('keydown', move);
      window.addEventListener('keyup', keyUp);
  
      const gameInterval = setInterval(() => {
        updateGame();
      }, dropTime);
  
      return () => {
        clearInterval(gameInterval);
        window.removeEventListener('keydown', move);
        window.removeEventListener('keyup', keyUp);
      };
    }, [drop, dropTime, gameOver, move, keyUp]);

    return (
        <div>
          <Stage stage={createStage()} />
          <aside>
            <div>
              {gameOver ? (
                <div>
                  <p>Game Over!</p>
                  <p>Score: {score}</p>
                </div>
              ) : (
                <div>
                  <p>Score: {score}</p>
                  <p>Rows: {rowsCleared}</p>
                  <p>Level: {level}</p>
                  <p>Player X: {player.pos.x}</p>
                  <p>Player Y: {player.pos.y}</p>
                </div>
              )}
              <button onClick={startGame}>Start Game</button>
            </div>
          </aside>
        </div>
      );
    };

const createStage = () => {
  const rows = Array.from(Array(20), () => Array(10).fill([0, 'clear']));
  return rows;
};

export default Tetris;