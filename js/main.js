mapboxgl.accessToken = 'pk.eyJ1IjoibGVuYWVtYXlhIiwiYSI6ImNpa3VhbXE5ZjAwMXB3eG00ajVyc2J6ZTIifQ.kmZ4yVcNrupl4H8EonM3aQ';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/lenaemaya/cj1e07cl100gy2so8mtm1dzvv',
  zoom: 2,
  center: [37.634, 55.742]
});

map.addControl(new mapboxgl.NavigationControl());

map.on('load', function () {
  map.on('zoom', function () {
    var x = map.getZoom();
    document.getElementById('panelzoom').innerHTML = '<p>Current zoom</p>' + (Number(x).toFixed(1));
  });








  map.addSource('stray_point', {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/lena-emaya/construct/master/stray_point.geojson'
  });
  map.addSource('stray_polygon', {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/lena-emaya/construct/master/stray_polygon.geojson'
  });
  map.addSource('local_point', {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/lena-emaya/construct/master/local_point2.geojson'
  });
  map.addSource('world_dot', {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/lena-emaya/construct/master/world_dot.geojson'
  });
  map.addSource('local_choropleth', {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/lena-emaya/black_style/master/new_choropleth.geojson'
  });
  map.addLayer({
    'id': 'World points',
    'type': 'circle',
    'maxzoom': 5,
    'source': 'stray_point',
    'paint': {
      'circle-radius': {
        property: 'class',
        stops: [
          [1, 1],
          [2, 2],
          [3, 6],
          [4, 4],
          [5, 3]
        ]
      },
      'circle-color': '#2E94B9',
      'circle-opacity': 0.65,
      'circle-stroke-width': 0.1,
      'circle-stroke-color': '#2E94B9',
      'circle-stroke-opacity': 0.35
    }
  });

  map.addLayer({
    'id': 'World choropleth',
    'type': 'fill',
    'maxzoom': 5,
    'source': 'stray_polygon',
    'paint': {
      'fill-antialias': true,
      'fill-color': {
        property: 'classify',
        stops: [
          [1, '#303841'],
          [2, '#47555E'],
          [3, '#303841'],
          [4, '#47555E'],
          [5, '#F7F7F7']
        ]
      },
      'fill-outline-color': '#000000',
      'fill-opacity': 0.45
    }
  }, 'waterway-label');
  map.addLayer({
    'id': 'World markers',
    'type': 'symbol',
    'source': 'world_dot',
    'layout': {
      'icon-image': 'marker_test',
      'icon-size': 0.4
    }
  });
  map.addLayer({
    'id': 'Local points',
    'type': 'symbol',
    'source': 'local_point',
    'layout': {
      'icon-image': 'marker_test',
      'icon-size': 0.45
    }
  });
  map.addLayer({
    'id': 'Local choropleth',
    'type': 'fill',
    'source': 'local_choropleth',
    'minzoom': 6,
    'paint': {
      'fill-antialias': true,
      'fill-color': {
        property: 'class',
        stops: [
          [1, '#FF9898'],
          [2, '#CF455C'],
          [3, '#971549']
        ]
      },
      'fill-outline-color': '#ED8282',
      'fill-opacity': 0.25
    }
  }, 'waterway-label');

  // var layerList = document.getElementById('menumap');
  // var inputs = layerList.getElementsByTagName('input');
  //
  // function switchLayer(layer) {
  //   var layerId = layer.target.id;
  //   map.setStyle('mapbox://styles/lenaemaya/' + layerId);
  // }
  //
  // for (var i = 0; i < inputs.length; i++) {
  //   inputs[i].onclick = switchLayer;
  // }


//   map.on('click', function (e) {
//
//     var features1 = map.queryRenderedFeatures(e.point, { layers: ['Local points'] });
//     console.log(features1);
//     }
// );







  var toggleableLayerIds = ['World points', 'World markers', 'World choropleth', 'Local points','Local choropleth'];

  for (var k = 0; k < toggleableLayerIds.length; k++) {
    var id = toggleableLayerIds[k];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;

    link.onclick = function (e) {
      var clickedLayer = this.textContent;
      e.preventDefault();
      e.stopPropagation();

      var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

      if (visibility === 'visible') {
        map.setLayoutProperty(clickedLayer, 'visibility', 'none');
        this.className = '';

      } else {
        this.className = 'active';
        map.setLayoutProperty(clickedLayer, 'visibility', 'visible');

      }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
  }
});










// map.on('click', function() {
//
//
//         var bounds = coordinates.reduce(function(bounds, coord) {
//             return bounds.extend(coord);
//         }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
//
//         map.fitBounds(bounds, {
//             padding: 20
//         });
// });


// toggleLayer(['World points'], 'World points');
// toggleLayer(['World markers'], 'World markers');
// toggleLayer(['World choropleth'], 'World choropleth');
// // toggleLayer(['aero_1', 'aero_1_1', 'aero_2', 'aero_2_2','aero_3', 'aero_3_3','aero_4', 'aero_4_4',], 'Сhoropleth1');
//
// function toggleLayer(ids, name) {
//     var link = document.createElement('a');
//     link.href = '#';
//     link.className = 'active';
//     link.textContent = name;
//
//     link.onclick = function (e) {
//         e.preventDefault();
//         e.stopPropagation();
//         for (layers in ids){
//             var visibility = map.getLayoutProperty(ids[layers], 'visibility');
//
//             if (visibility === 'visible') {
//                 map.setLayoutProperty(ids[layers], 'visibility', 'none');
//                 this.className = '';
//
//             } else {
//                 this.className = 'active';
//                 map.setLayoutProperty(ids[layers], 'visibility', 'visible');
//
//             }
//          }
//
//     };
//
//     var layers = document.getElementById('menu');
//     layers.appendChild(link);
// }
//
// ;
