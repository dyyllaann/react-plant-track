import { useState } from 'react'
import React from 'react';
import './App.css'
import plantSampleAbove1 from './assets/plant-sample-above-5.jpg';
import plantSampleAbove2 from './assets/plant-sample-above-4.jpg';
import plantSampleAbove3 from './assets/plant-sample-above-3.jpg';
import plantSampleAbove4 from './assets/plant-sample-above-2.jpg';
import plantSampleAbove5 from './assets/plant-sample-above-1.jpg';
import PlantCard from './PlantCard';

function App() {
  const [imageSize, setImageSize] = useState(200);
  const [plantData, setPlantData] = useState([
    {
      day: 1,
      image: plantSampleAbove1,
      coverage: 0.06,
    },
    {
      day: 2,
      image: plantSampleAbove2,
      coverage: 0.1,
    },
    {
      day: 3,
      image: plantSampleAbove3,
      coverage: 0.17,
    },
    {
      day: 4,
      image: plantSampleAbove4,
      coverage: 0.3,
    },
    {
      day: 5,
      image: plantSampleAbove5,
      coverage: 0.53,
    },
  ]);

  google.charts.load('current', { 'packages': ['corechart'] });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Day', 'Area Coverage'],
      ['1', plantData[0].coverage],
      ['2', plantData[1].coverage],
      ['3', plantData[2].coverage],
      ['4', plantData[3].coverage],
      ['5', plantData[4].coverage],
    ]);

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
