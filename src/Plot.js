import React from 'react';
import Plotly from 'plotly.js';

class Plot extends React.Component {
  updatePlot = () => {
    Plotly.newPlot(
      'plot', 
      [{
        x: this.props.xData,
        y: this.props.yData,
        mode: 'lines+markers',
      }],
      {
        title: this.props.title,
        displayModeBar: true,
        margin: {
          b: 200,
        },
        xaxis: {
          type:'category',
        },
        yaxis: {
          title: 'Temp (°F)',
        }
      } 
    );
  }

  componentDidMount() {
    this.updatePlot();
  }

  componentDidUpdate() {
    this.updatePlot();
  }

  render() {
    return (
      <div id="plot" style={{ width: '100%', height: '70vh' }}></div>
    );
  }
}

export default Plot;