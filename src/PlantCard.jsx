import { useEffect, useState } from 'react'
import React from 'react';

export default function PlantCard(props) {
  const [coverage, setCoverage] = useState(0);
  const sz = props.imageSize;
  
  const drawCanvas = (props) => {
    var c = document.getElementById("canvas-" + props.day).getContext("2d");
    var img = document.getElementById("sample-" + props.day);
    c.drawImage(img, 0, 0, sz, sz);
  };

  const analyzeColorArea = (canvas) => {
    const canvasData = canvas.data;
    let color = 0;
    
    for (let i = 0; i < canvasData.length; i += 4) {
      if (canvasData[i] < 245 && canvasData[i+1] < 255 && canvasData[i+2] < 245) {
        // Draw green area
        canvas.data[i] = 0;
        canvas.data[i+1] = 255;
        canvas.data[i+2] = 0;

        // Count green pixels
        color++;
      } else {
        // Draw white/pink area
        canvas.data[i] = 255;
        canvas.data[i+1] = 200;
        canvas.data[i+2] = 255;
      }
    }

    const c = document.getElementById("canvas-" + props.day).getContext("2d");
    c.putImageData(canvas, 0, 0);
    let ratio = Math.round(color/(canvasData.length/4) * 100);
    return setCoverage(ratio);
  }

  const init = () => {
    drawCanvas(props);

    const c = document.getElementById("canvas-" + props.day).getContext("2d");
    let canvas = c.getImageData(0, 0, sz, sz);
    analyzeColorArea(canvas);
  }

  return (
    <div className="PlantCard">
      <h2>Day {props.day}</h2>
      <h3>Orignal Image</h3>
      <img id={"sample-" + props.day} src={props.image} alt="plant sample above" width={sz} height={sz} onLoad={() => init(props)}/>
      <h3>Canvas:</h3>
      <canvas id={"canvas-" + props.day} width={sz} height={sz} style={{border: "1px solid"}} />
      <br />
      <br />
      <p>Area Coverage: {coverage + '%'}</p>
    </div>
  )
};