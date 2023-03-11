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
import PlantCard from './PlantCard';

function App() {
  const [imageSize, setImageSize] = useState(200);

  const [plantImages, setPlantImages] = useState([
    plantSampleAbove1,
    plantSampleAbove2,
    plantSampleAbove3,
    plantSampleAbove4,
    plantSampleAbove5,
    plantSampleAbove6,
    plantSampleAbove7,
  ]);

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
      <div className="cards">
        {cardData}
      </div>
      <div id="curve_chart" style={{width: "100%", height: "500px"}}></div>
    </div>
  )
}

export default App
