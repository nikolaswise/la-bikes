const template = (feature) => `
  <h2>Bike Station #${feature.properties.FID}</h2>
  <form class="js-feedback-form" data-id="${feature.properties.FID}">
    <label>
      <input type="checkbox" />
      Vote for this station
    </label>
    <label>
      Comments & Suggestions:
      <textarea name="comments"></textarea>
    </label>
    <button
      class="button js-close-popup">
      Save Feedback
    </button>
  </form>
`

export const popups = (map) => {
  map.on('click', 'points', function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = template(e.features[0])

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(description)
      .addTo(map);
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

