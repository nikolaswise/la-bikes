import {popups} from './popups'
import {createCircle} from './createCircle'
import {stations} from './future-bikestations.js'

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


const calcCircles = (map) => {
  let circles1k = stations.features.map(feature => createCircle(feature.geometry.coordinates, 1))
  let circles3k = stations.features.map(feature => createCircle(feature.geometry.coordinates, 3))
  // let circles5k = stations.features.map(feature => createCircle(feature.geometry.coordinates, 5))

  circles1k.forEach((circle, i) => {
    map.addSource(`circles1k-${i}`, circle);
    drawCircles(map, `circles1k-${i}`, 0.6)
  })

  circles3k.forEach((circle, i) => {
    map.addSource(`circles3k-${i}`, circle);
    drawCircles(map, `circles3k-${i}`, 0.2)
  })
}

export const draw = () => {
  var map = new mapboxgl.Map({
    container: 'map',
    showZoom: true,
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-118.265, 34.06],
    zoom: 13
  })

  map.addControl(new mapboxgl.NavigationControl());
  map.on('load', () => {
    addPoints(map)
    calcCircles(map)
  })
  popups(map)
}