import { useEffect, useState } from 'react'
import React from 'react';
import './App.css'

import plantSampleAbove1 from './assets/plant-sample-above-1.jpg';
import plantSampleAbove2 from './assets/plant-sample-above-2.jpg';
import plantSampleAbove3 from './assets/plant-sample-above-3.jpg';
import plantSampleAbove4 from './assets/plant-sample-above-4.jpg';
import plantSampleAbove5 from './assets/plant-sample-above-5.jpg';
import plantSampleAbove6 from './assets/plant-sample-above-6.jpg';
import plantSampleAbove7 from './assets/plant-sample-above-7.jpg';

import cactusSample1 from './assets/cactus-sample-1.png';
import cactusSample2 from './assets/cactus-sample-2.png';
import cactusSample3 from './assets/cactus-sample-3.png';
import cactusSample4 from './assets/cactus-sample-4.png';
import cactusSample5 from './assets/cactus-sample-5.png';
import cactusSample6 from './assets/cactus-sample-6.png';
import cactusSample7 from './assets/cactus-sample-7.png';
import cactusSample8 from './assets/cactus-sample-8.png';
import cactusSample9 from './assets/cactus-sample-9.png';
import cactusSample10 from './assets/cactus-sample-10.png';
import cactusSample11 from './assets/cactus-sample-11.png';
import cactusSample12 from './assets/cactus-sample-12.png';

import PlantCard from './PlantCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Chart from './Chart';

function App() {
  const [imageSize, setImageSize] = useState(200);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 7
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 584 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 584, min: 0 },
      items: 2
    }
  };

  const cactusData = [
    {
      day: 1,
      image: cactusSample1,
      coverage: 8.30,
    },
    {
      day: 8,
      image: cactusSample2,
      coverage: 9.01,
    },
    {
      day: 15,
      image: cactusSample3,
      coverage: 9.78,
    },
    {
      day: 22,
      image: cactusSample4,
      coverage: 10.05,
    },
    {
      day: 29,
      image: cactusSample5,
      coverage: 10.32,
    },
    {
      day: 36,
      image: cactusSample6,
      coverage: 10.90,
    },
    {
      day: 43,
      image: cactusSample7,
      coverage: 12.95,
    },
    {
      day: 50,
      image: cactusSample8,
      coverage: 14.43,
    },
    {
      day: 57,
      image: cactusSample9,
      coverage: 13.81,
    },
    {
      day: 64,
      image: cactusSample10,
      coverage: 13.80,
    },
    {
      day: 71,
      image: cactusSample11,
      coverage: 13.59,
    },
    {
      day: 78,
      image: cactusSample12,
      coverage: 14.21,
    },
  ]

  const commonBoxData = [
    {
      day: 1,
      image: plantSampleAbove1,
      coverage: 0.05,
    },
    {
      day: 2,
      image: plantSampleAbove2,
      coverage: 0.06,
    },
    {
      day: 3,
      image: plantSampleAbove3,
      coverage: 0.1,
    },
    {
      day: 4,
      image: plantSampleAbove4,
      coverage: 0.17,
    },
    {
      day: 5,
      image: plantSampleAbove5,
      coverage: 0.3,
    },
    {
      day: 6,
      image: plantSampleAbove6,
      coverage: 0.53,
    },
    {
      day: 7,
      image: plantSampleAbove7,
      coverage: 0.56,
    },
  ];

  const [plantData, setPlantData] = useState(cactusData);

  let dataTable = [['Day', 'Area Coverage']];

  for (let i = 0; i < plantData.length; i++) {
    dataTable.push([plantData[i].day, plantData[i].coverage]);
  }

  const cardData = plantData.map((plant, index) => {
    return <PlantCard 
      key={index} 
      day={plant.day} 
      image={plant.image} 
      imageSize={imageSize}
    />
  })

  return (
    <div className="App">
      <h1>React Plant Track</h1>
      <div className="project-description">
        <h2>Overview</h2>
        <ul>
          <li>
            React Plant Track (RPT) is a tool that analyzes plant growth by extracting image data and comparing the values of each pixel.
          </li>
          <li>
            This is done entirely in the browser using the HTML canvas element and JavaScript.
          </li>
          <li>
            Uses of this tool include tracking the growth of plants in a greenhouse, or tracking the growth of a plant in a hydroponic system.
          </li>
          <li>
            By adjusting plant inputs and tracking the response, the user can determine the optimal conditions for the plant to grow in.
          </li>
        </ul>
      </div>
      <div className='methodology'>
        <h2>Methodology</h2>
        <p>The HTML canvas element converts images into data that can be measured and manipulated. 
          The data is stored in an array, where every four elements in the array represents a pixel.
          Each pixel contains an RGB value, which can be used to determine the color of the pixel, and the alpha value, which can be used to determine the opacity of the pixel. 
        </p>
      </div>
      <div className="sample-menu">
        <h2>Examples</h2>
        <p>
          The first set of images were modified from a single image using Photoshop.
          To make the app more similar to a real life scenario, the second set of images were taken from a timelapse video of real plant.
        </p>
        <br />
        <button onClick={() => setPlantData(cactusData)}>Cactus Plant (Raw Images)</button>
        <button onClick={() => setPlantData(commonBoxData)}>Common Box Plant (Edited Images)</button>
      </div>
      <Carousel responsive={responsive}>
        {cardData}
      </Carousel>
      <Chart data={dataTable} />
    </div>
  )
}

export default App
