import { useEffect, useState } from 'react'
import React from 'react';

export default function PlantCard(props) {
  const [coverage, setCoverage] = useState();
  const [growth, setGrowth] = useState();

  const sz = props.imageSize;
  
  const createCanvas = (props) => {
    var c = document.getElementById("canvas-" + props.day).getContext("2d");
    var img = document.getElementById("sample-" + props.day);
    c.drawImage(img, 0, 0, sz, sz);
  };

  const drawCanvas = (props, canvas) => {
    const c = document.getElementById("canvas-" + props.day).getContext("2d");
    c.putImageData(canvas, 0, 0);
  }

  const getGreenArea = (c) => {
    let canvas = c.getImageData(0, 0, sz, sz);
    const canvasData = canvas.data;
    let color = 0;
    
    for (let i = 0; i < canvasData.length; i += 4) {
      if (Math.abs(canvasData[i] - canvasData[i+1]) < 25 && Math.abs(canvasData[i] - canvasData[i+2]) < 15) {
        // Draw white/pink area
        canvas.data[i] = 255;
        canvas.data[i+1] = 200;
        canvas.data[i+2] = 255;
      } else {
        // Draw green area
        canvas.data[i] = 0;
        canvas.data[i+1] = 255;
        canvas.data[i+2] = 0;

        // Count green pixels
        color++;
      }
    }

    let ratio = color/(canvasData.length/4) * 100;
    drawCanvas(props, canvas);
    setCoverage(ratio.toFixed(2));
  }

  const getPlantHeight = (c) => {
    let canvas = c.getImageData(0, 0, sz, sz);
    const canvasData = canvas.data;
    // let distanceFromTop = 1;

    for (let distanceFromTop = 1; distanceFromTop < canvasData.length/4; distanceFromTop++) {
      // const canvasLine = c.getImageData(0, distanceFromTop-1, 100, distanceFromTop).data;
      // for (let i = 0; i < canvasLine.length; i += 4) {
      //   if (Math.abs(canvasLine[i] - canvasLine[i+1]) < 25 && Math.abs(canvasLine[i] - canvasLine[i+2]) < 15) {
      //     return distanceFromTop;
      //   }
      // }
    }
  }

  const analyzeColorArea = (c) => {
    getGreenArea(c);
    console.log(getPlantHeight(c));
  }

  const init = () => {
    createCanvas(props);

    const c = document.getElementById("canvas-" + props.day).getContext("2d");
    analyzeColorArea(c);
  }

  return (
    <div className="PlantCard">
      <h2>Day {props.day}</h2>
      <h3>Orignal Image</h3>
      <img 
        id={"sample-" + props.day} 
        src={props.image} 
        alt="plant sample above" 
        width={sz} 
        height={sz} 
        onLoad={() => init(props)}
      />
      <h3>Selection:</h3>
      <canvas 
        id={"canvas-" + props.day} 
        width={sz} 
        height={sz} 
        style={{border: "1px solid"}} 
      />
      <br />
      <br />
      <p>Area Coverage: {coverage + '%'}</p>
    </div>
  )
};