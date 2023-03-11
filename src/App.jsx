import { useState } from 'react'
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

  const commonBox = [
    plantSampleAbove1,
    plantSampleAbove2,
    plantSampleAbove3,
    plantSampleAbove4,
    plantSampleAbove5,
    plantSampleAbove6,
    plantSampleAbove7,
  ];

  const cactus = [
    cactusSample1,
    cactusSample2,
    cactusSample3,
    cactusSample4,
    cactusSample5,
    cactusSample6,
    cactusSample7,
    cactusSample8,
    cactusSample9,
    cactusSample10,
    cactusSample11,
    cactusSample12,
  ]

  const [plantImages, setPlantImages] = useState(cactus);

  const [plantData, setPlantData] = useState([
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
  ]);

  const populatePlantData = () => {
    const newPlantData = plantImages.map((index) => {
      return {
        day: index + 1,
        image: plantImages[index],
        coverage: plant.coverage,
      }
    })
    setPlantData(newPlantData);
  }

  let dataTable = [['Day', 'Area Coverage']];

  for (let i = 0; i < plantData.length; i++) {
    dataTable.push([plantData[i].day, plantData[i].coverage]);
  }

  google.charts.load('current', { 'packages': ['corechart'] });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable(dataTable);
    var options = {
      curveType: 'function',
      legend: { position: 'bottom' }
    };
    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    chart.draw(data, options);
  }

  const cardData = plantData.map((plant, index) => {
    return <PlantCard key={index} day={plant.day} image={plant.image} imageSize={imageSize} />
  })

  return (
    <div className="App">
      <h1>React Plant Track</h1>
      <Carousel responsive={responsive}>
        {cardData}
      </Carousel>
      <div id="curve_chart"></div>
    </div>
  )
}

export default App
