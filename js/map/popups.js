import bus from '../bus'

// Template string for popup content
const template = (feature) => `
  <h2>Bike Station #${feature.properties.FID}</h2>
  <form class="form is-active js-feedback-form" data-id="${feature.properties.FID}">
    <input id="id" type="text" value="${feature.properties.FID}"" hidden/>
    <label>
      <input id="vote" type="checkbox" />
      Vote for this station
    </label>
    <label>
      Comments & Suggestions:
      <textarea id="comments" name="comments"></textarea>
    </label>
    <button
      class="button js-close-popup">
      Save Feedback
    </button>
  </form>
  <div class="form-confirm js-form-confirm">
    <h3>Thank you!</h3>
  </div>
`


export const popups = (map) => {
  // On click, grab coords and render a popup.
  map.on('click', 'points', function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = template(e.features[0])

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    let popup = new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(description)
      .addTo(map);
      // Emit a bus event that lets the app know dom changed
      // now we need bind the new dom!
      bus.emit('form:bind')
    });


  // Change the cursor to a pointer when the mouse is over the places layer.
  map.on('mouseenter', 'points', function () {
    map.getCanvas().style.cursor = 'pointer';
  });

  // Change it back to a pointer when it leaves.
  map.on('mouseleave', 'points', function () {
    map.getCanvas().style.cursor = '';
  });
}

