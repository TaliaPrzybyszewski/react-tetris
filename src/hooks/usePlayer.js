import { useState } from 'react';

const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: [],
    collided: false,
  });

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: prev.pos.x + x, y: prev.pos.y + y },
      collided,
    }));
  };

  const resetPlayer = () => {
    setPlayer({
      pos: { x: 0, y: 0 },
      tetromino: getRandomTetromino(),
      collided: false,
    });
  };

  const rotate = (matrix, dir) => {
    if (!matrix) return matrix;
    // Rotate the Tetromino matrix
    const rotatedTetromino = matrix.map((_, index) =>
      matrix.map((col) => col[index])
    );
    
    // Reverse the rows to get the rotated matrix
    if (dir > 0) return rotatedTetromino.map((row) => row.reverse());
    return rotatedTetromino.reverse();
  };

  const playerRotate = () => {
    // Clone the player state
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    
    // Rotate the cloned Tetromino
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, 1);
    
    // TODO: Check for collisions after rotation
    
    setPlayer(clonedPlayer);
  };

  const playerDrop = () => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: prev.pos.x, y: prev.pos.y + 1 },
      collided: false,
    }));
  };

  return { player, updatePlayerPos, resetPlayer, playerRotate, playerDrop };
};

export default usePlayer;

const getRandomTetromino = () => {
    const tetrominos = [
        [[1, 'cyan'], [1, 'cyan'], [1, 'cyan'], [1, 'cyan']], // I
        [[1, 'orange'], [1, 'orange'], [1, 'orange'], [1, 'orange']], // L
        [[1, 'blue'], [1, 'blue'], [1, 'blue'], [1, 'blue']], // J
        [[1, 'yellow'], [1, 'yellow'], [1, 'yellow'], [1, 'yellow']], // O
        [[1, 'purple'], [1, 'purple'], [1, 'purple'], [1, 'purple']], // T
        [[1, 'green'], [1, 'green'], [1, 'green'], [1, 'green']], // S
        [[1, 'red'], [1, 'red'], [1, 'red'], [1, 'red']], // Z
    ];

    const randomTetromino = tetrominos[Math.floor(Math.random() * tetrominos.lenth)];
    return randomTetromino;
};