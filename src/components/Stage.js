import React from 'react';
import Cell from './Cell'; 

const Stage = ({ stage }) => (
    <div>
        {stage.map((row, rowIndex) => (
            <div key={rowIndex}>
                {row.map((cell, colIndex) => (
                    <Cell key={colIndex} type={cell[0]} />
                ))}
            </div>
        ))}
    </div>
);

export default Stage; 

