import React, { Component } from 'react';
import callApi from './apiUtils'
import Plot from './Plot';

class App extends Component {
  constructor(){
    super();
    this.state = {
      location: '',
      currentTemp: '',
      houlyTimes: [],
      hourlyTemps: [],
      error: null
    };
  }

  componentDidMount() {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.queryDarkSky(position.coords.latitude, position.coords.longitude);
        },
        
        () => {
          this.setState({
            error: new Error('The Geolocation service failed'),
          });
        }
      );
    } else {
      this.setState({
        error: new Error('Your browser does not support geolocation'),
      });
    }
  }

  // Callback function to be invoked on darksky query success
  onDarkSkySuccess = (payload) => {
    const currentTemp = payload && payload.currently.temperature;
    const hourlyData = payload && payload.hourly.data;
    const houlyTimes = [];
    const hourlyTemps = [];
    for (const dataItem of hourlyData) {
      houlyTimes.push(new Date(dataItem.time*1000).toLocaleString());  // darksky time is in seconds, instead of millis
      hourlyTemps.push(dataItem.temperature);
    }
    this.setState({
      currentTemp,
      houlyTimes,
      hourlyTemps,
      error: null,
    });
  }

  // Callback function to be invoked on darksky query failure
  onDarkSkyFailure = (error) => {
    this.setState({
      error
    });
  }

  // Query DarkSky API for weather data. Note the query will be proxied to DarkSky API by local server.
  queryDarkSky = (latitude, longitude) => {
    const url = `/api/darksky?latitude=${latitude}&longitude=${longitude}`;

    // Note the DarkSky API call is proxied through our own server
    callApi(url, null, this.onDarkSkySuccess, this.onDarkSkyFailure);
  }

  // Callback function to be invoked on google geocode api success
  onGoogleSuccess = (payload) => {
    try {
      const results = payload && payload.results;
      if(!results || results.length===0) {
        throw new Error('No results');
      }
      const {lat, lng} = results[0].geometry.location;
      this.queryDarkSky(lat, lng);
    } catch(error){
      this.setState({
        error
      });
    }
  }

  // Callback function to be invoked on google geocode api failure
  onGoogleFailure = (error) => {
    console.log(error);
    this.setState({
      error
    });
  }

  // Query Google Geocode API for location coordinates
  queryLocationCoordinates = (e) => {
    e.preventDefault();
    const {location} = this.state;
    if(!location) return;

    const encoded = encodeURIComponent(location);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}`;
    const config = {
      mode: 'cors',
    };

    callApi(url, config, this.onGoogleSuccess, this.onGoogleFailure);
  }

  changeLocation = (e) => {
    this.setState({
      location: e.target.value
    });
  }

  render() {
    const currentTemp = this.state.currentTemp || 'current temp';
    const error = this.state.error;
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Weather</h1>
        <form onSubmit={this.queryLocationCoordinates}>
          <label>
            <input 
              style={{ fontSize: '1.5em', outline: 'none', border:'none', borderBottom: '1px dotted black', textAlign: 'center' }}
              placeholder={"location (e.g. New York)"} 
              type="text" 
              value={this.state.location}
              onChange={this.changeLocation}
              title="Enter a location, and hit enter"
            />
          </label>
        </form>
        <div style={{ textAlign: 'center' }}>
          <h3>
            <span>
              { currentTemp }
            </span>
            <span> (°F)</span>
          </h3>
          <Plot
            xData={this.state.houlyTimes}
            yData={this.state.hourlyTemps}
            title='48-hour Forecast'
          />
        </div>

        {
          error &&
          <div style={{ color: 'red' }}>
            {error.message || error.toString} {` (${error.status} ${error.statusText})`}
          </div>
        }
      </div>
    );
  }
}

export default App;
