// Code snippet for determining radius from points taken from:
// https://stackoverflow.com/questions/37599561/drawing-a-circle-with-the-radius-in-miles-meters-with-mapbox-gl-js

export const createCircle = (center, km, points = 64) => {
  let coords = {
    latitude: center[1],
    longitude: center[0]
  }

  let ret = [];
  let distanceX = km/(111.320*Math.cos(coords.latitude*Math.PI/180));
  let distanceY = km/110.574;

  let theta
  let x
  let y

  for(var i=0; i<points; i++) {
    theta = (i/points)*(2*Math.PI);
    x = distanceX*Math.cos(theta);
    y = distanceY*Math.sin(theta);
    ret.push([coords.longitude+x, coords.latitude+y]);
  }
  ret.push(ret[0]);

  return {
    "type": "geojson",
    "data": {
      "type": "FeatureCollection",
      "features": [{
        "type": "Feature",
        "geometry": {
          "type": "Polygon",
          "coordinates": [ret]
        }
      }]
    }
  };
};