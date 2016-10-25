# [darksky](http://cloudmu.github.io/darksky/)

A weather app to show weather report using [Dark Sky](https://darksky.net/dev/), 
[reactjs](https://facebook.github.io/react/), and [plotly.js](https://plot.ly/javascript/).

Here's a screenshot:

![alt text](https://raw.githubusercontent.com/cloudmu/darksky/master/screenshot.png "Screenshot")

## Technologies used:

- [React](https://github.com/facebook/react)
- [create-react-app](https://github.com/facebookincubator/create-react-app/)
- [DarkSky API](https://darksky.net/dev/)
- [Plotly.js](https://plot.ly/javascript/)
- [Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding/start)

## Getting Started
Thanks to [create-react-app](https://github.com/facebookincubator/create-react-app), we will have a configuration-free dev experience. 

To get started, please clone this git repository and then run `npm install` once under the project top-level directory. 

```
git clone https://github.com/cloudmu/darksky.git
cd darksky
npm install
```
This will install the dependencies for the client side.

**You’ll need to have Node installed on your machine**. (Node >= 6 and npm >= 3 are recommended).

## While You're Developing...
Whenever you want to run/test the program, `cd` to the project top-level directory. Use these commands:

### `npm start`

Runs the app in the development mode, using the Webpack-provided "development server".<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.  

Enter a location and hit enter key, the client will first look up the coordinates(latitude/longitude) 
from [Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding/start), and then
request the [Dark Sky](https://darksky.net/dev/) weather data via the proxy [API Server](#an-api-server).

The page will reload if you make edits.<br>
You will also see any lint errors in the console.<br>
**Note The web app is up and running now, but the weather forecasting rely on an API Server. Be sure to run the [API Server](#an-api-server) as well.**

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run eject`

Note: `eject` is an advanced `create-react-app` tool. Read the [how-to](https://github.com/facebookincubator/create-react-app/blob/master/template/README.md) for details.

## An API Server
The text and scripts above describe the client-side code that is displayed in the web browser. They rely on the Webpack-provided development server that runs on port 3000. 

This project also contains a separate [API server](https://github.com/cloudmu/darksky/tree/master/server) that runs on a different port (3001). 
The API server will be listening to the client requests for weather, and proxying the requests to Dark Sky API.

First you need to open a separate command line window, and run `npm install` under the project's `server` directory. 

```
cd darksky
cd server
npm install
```

Then you can start the API server (under the project's server directory):

### `npm run server`

This starts the API server on port 3001, which listens for requests from the client, and proxies to Dark Sky API.
This approach has several benefits, for example: hide the [Dark Sky API key](https://darksky.net/dev/docs/faq#sublicensing), 
and avoid [CORS issues](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) as well. 

Note you need to sign up a free Dark Sky API secret key, and replace the one in [server.js](https://github.com/cloudmu/darksky/blob/master/server/server.js).

## How Do I ... ?

This project was ported to use [create-react-app](https://github.com/facebookincubator/create-react-app) for handling all assets. 
Many questions are answered in its [how-to](https://github.com/facebookincubator/create-react-app/blob/master/template/README.md).
