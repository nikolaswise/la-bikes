import {popups} from './popups'

const addPoints = (map) => {
  map.on('load', () => {
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

  addPoints(map)
  popups(map)
}