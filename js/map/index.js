import {popups} from './popups'
import {createCircle} from './createCircle'
import {stations} from './future-bikestations.js'

// Add our GeoJSON to the map and render the markers
const addPoints = (map) => {
  map.addSource('stations', {
    type: 'geojson',
    data: '/future-bikestations.geojson'
  });
  map.addLayer({
    id: "points",
    type: "circle",
    source: "stations",
    paint: {
      "circle-color": "#4dc7e0",
      "circle-radius": 6,
      "circle-stroke-width": 2,
      "circle-stroke-color": "#fff"
    }
  });
}

// Render circles for an given source id
const drawCircles = (map, id, opacity) => {
  map.addLayer({
    "id": id,
    "type": "fill",
    "source": id,
    "layout": {},
    "paint": {
      "fill-opacity": opacity,
      "fill-color": 'transparent',
      "fill-outline-color": "#4dc7e0"
    }
  })
}


// Calculcate two radius circles around our points
const calcCircles = (map) => {
  let circles1k = stations.features.map(feature => createCircle(feature.geometry.coordinates, 1))
  let circles3k = stations.features.map(feature => createCircle(feature.geometry.coordinates, 3))

  // For each set, add sources and render.
  circles1k.forEach((circle, i) => {
    map.addSource(`circles1k-${i}`, circle);
    drawCircles(map, `circles1k-${i}`, 0.6)
  })

  circles3k.forEach((circle, i) => {
    map.addSource(`circles3k-${i}`, circle);
    drawCircles(map, `circles3k-${i}`, 0.2)
  })
}

// Draw the whole map
export const draw = () => {
  var map = new mapboxgl.Map({
    container: 'map',
    showZoom: true,
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-118.265, 34.06],
    zoom: 13
  })

  // Add zooom controls
  map.addControl(new mapboxgl.NavigationControl());

  // On map load, add our points, draw our circles, and bind popup handlers.
  map.on('load', () => {
    addPoints(map)
    calcCircles(map)
    popups(map)
  })
}