import fetchCSVData from '../utils/data';

const MAP_FILE_PATH = 'public/assets/data/GHA/2021/world_map.geo.json';
const CSV_PATH = 'public/assets/data/GHA/2021/map_data_long.csv';
const matchCountryNames = (csvData, worldData) => {
  const matchedData = csvData.map((stream) => {
    const countryObject = worldData.find((feature) => feature.properties.iso_a3 === stream.Country_ID);
    if (countryObject) {
      // eslint-disable-next-line no-param-reassign
      stream.Country_name = countryObject.properties.name;
    }

    return stream;
  });

  return matchedData;
};

const processedData = (countries, processedCountryData) => {
  const data = [];
  // eslint-disable-next-line array-callback-return
  countries.map((country) => {
    const countryData = {};
    countryData.name = country;
    // eslint-disable-next-line array-callback-return
    processedCountryData.map((stream) => {
      if (stream.Country_name === country) {
        countryData[stream.variable] = stream.value;
      }
    });
    data.push(countryData);
  });

  return data;
};

const dataInjectedGeoJson = (jsonData, groupedData) =>
  jsonData.map((feature) => {
    const matchingCountryData = groupedData.find((countryData) => countryData.name === feature.properties.name);
    if (matchingCountryData) {
      // eslint-disable-next-line no-param-reassign
      feature.properties = {
        ...feature.properties,
        ...matchingCountryData,
      };
    }

    return feature;
  });

const getColor = (score) => {
  switch (score) {
    case '5':
      return '#7F1850';
    case '4':
      return '#AD1156';
    case '3':
      return '#D64279';
    case '2':
      return '#E4819B';
    case '1':
      return '#F6B9C2';
    default:
      return '#E6E1E5';
  }
};

function highlightFeature(e) {
  const layer = e.target;

  layer.setStyle({
    fillColor: 'yellow',
  });

  if (!window.L.Browser.ie && !window.L.Browser.opera && !window.L.Browser.edge) {
    layer.bringToFront();
  }
  layer.bindPopup(layer.feature.properties.name).openPopup();
}

function renderPeopleAffectedByCrisisLeaflet() {
  const map = window.L.map('map').setView([20, -0.09], 2);
  // window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //   maxZoom: 19,
  //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  // }).addTo(map);
  let geojsonLayer;
  const legend = window.L.control({ position: 'topright' });

  legend.onAdd = () => {
    const div = window.L.DomUtil.create('div', 'info legend');
    const legendData = [
      { score: '5', label: '5 - Very High' },
      { score: '4', label: '4 - High' },
      { score: '3', label: '3 - Medium' },
      { score: '2', label: '2 - Low' },
      { score: '1', label: '1 - Very Low' },
    ];

    const legendContent = legendData
      .map((data) => `<i style="background:${getColor(data.score)}"></i><label>${data.label}</label>`)
      .join('');
    div.innerHTML = legendContent;

    return div;
  };

  legend.addTo(map);

  const variable = 'Severity_score';
  fetch(MAP_FILE_PATH)
    .then((response) => response.json())
    .then((jsonData) => {
      const geojsonData = jsonData.features;
      fetchCSVData(CSV_PATH).then((data) => {
        const processedCountryNameData = matchCountryNames(data, geojsonData);
        const countries = [...new Set(processedCountryNameData.map((stream) => stream.Country_name))];
        const groupedData = processedData(countries, processedCountryNameData);

        const style = (feature) => ({
          fillColor: getColor(feature.properties[variable]),
          weight: 1,
          opacity: 1,
          color: 'white',
          fillOpacity: 1,
        });

        function resetHighlight(e) {
          geojsonLayer.resetStyle(e.target);
        }

        function onEachFeature(feature, layer) {
          if (feature.properties[variable]) {
            layer.on({
              mouseover: highlightFeature,
              mouseout: resetHighlight,
            });
          }
        }

        geojsonLayer = window.L.geoJSON(dataInjectedGeoJson(geojsonData, groupedData), {
          style,
          onEachFeature,
          maxZoom: 3,
          minZoom: 2,
        }).addTo(map);
      });
    })
    .catch((error) => console.log(error));
}

export default renderPeopleAffectedByCrisisLeaflet;
