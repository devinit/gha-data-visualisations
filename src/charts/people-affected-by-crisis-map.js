import 'leaflet.pattern';
import fetchCSVData, { ACTIVE_BRANCH } from '../utils/data';
import {
  highlightFeature,
  matchCountryNames,
  processedData,
  dataInjectedGeoJson,
  onLegendAdd,
  handleClickFeature,
  dataBox,
} from '../utils/interactiveMap';
import { addFilter, addFilterWrapper } from '../widgets/filters';

const MAP_FILE_PATH = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/public/assets/data/world_map.geo.json`;
const CSV_PATH = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/public/assets/data/map_data_long.csv`;

const renderMap = (dimensionVariable, mapInstance, colorFunction, chartInstance) => {
  let geojsonLayer;
  window
    .fetch(MAP_FILE_PATH)
    .then((response) => response.json())
    .then((jsonData) => {
      const geojsonData = jsonData.features;
      fetchCSVData(CSV_PATH).then((data) => {
        const processedCountryNameData = matchCountryNames(data, geojsonData);
        const countries = Array.from(new Set(processedCountryNameData.map((stream) => stream.Country_name)));
        const groupedData = processedData(countries, processedCountryNameData);

        const style = (feature) => ({
          [feature.properties[dimensionVariable] === '' ? 'fillPattern' : 'fillColor']: colorFunction(
            feature.properties[dimensionVariable]
          ),
          weight: 1,
          opacity: 1,
          color: 'white',
          fillOpacity: 1,
        });

        const resetHighlight = (e) => {
          geojsonLayer.resetStyle(e.target);
          e.target.closePopup();
        };

        const onEachFeature = (feature, layer) => {
          if (feature.properties[dimensionVariable] || feature.properties[dimensionVariable] === '') {
            layer.on({
              mouseover: (e) => highlightFeature(e, dimensionVariable),
              mouseout: resetHighlight,
              click: (e) => handleClickFeature(e, mapInstance, dataBox),
            });
          }
        };

        // Add geojson layer to the map
        geojsonLayer = window.L.geoJSON(dataInjectedGeoJson(geojsonData, groupedData), {
          style,
          onEachFeature,
          maxZoom: 3,
          minZoom: 2,
        }).addTo(mapInstance);
        chartInstance.hideLoading();

        // return geojsonLayer;
      });
    })
    .catch((error) => console.log(error));
};

function renderPeopleAffectedByCrisisLeaflet() {
  window.DICharts.handler.addChart({
    className: 'dicharts--gha-people-affected-by-crisis-leaflet',
    echarts: {
      onAdd: (chartNodes) => {
        Array.prototype.forEach.call(chartNodes, (chartNode) => {
          const dichart = new window.DICharts.Chart(chartNode.parentElement);
          const map = window.L.map(chartNode).setView([20, -0.09], 2);
          let variable = 'Severity_score';

          // Filter
          const filterWrapper = addFilterWrapper(chartNode);
          const filterOptions = [
            { name: 'Severity_score', label: 'Severity score' },
            { name: 'Climate_vulnerability', label: 'Climate vulnerability score' },
            { name: 'COVID_vaccination_rate', label: 'COVID vaccinattion rate' },
            { name: 'Food_insecure_(millions)', label: 'People facing food insecurity' },
            { name: 'People_in_need_(millions)', label: 'People in need' },
          ];

          const dimensionFilter = addFilter({
            wrapper: filterWrapper,
            options: filterOptions.map((d) => d.label),
            defaultOption: 'Severity score',
            className: 'map-filter',
            label: 'Select a dimension',
          });

          dimensionFilter.addEventListener('change', (event) => {
            variable = filterOptions.find((option) => option.label === event.target.value).name;
          });

          // Legend
          const legend = window.L.control({ position: 'topright' });
          legend.onAdd = onLegendAdd;
          legend.addTo(map);

          const stripes = new window.L.StripePattern({ weight: 2, spaceWeight: 1, angle: 45, color: 'grey' });
          stripes.addTo(map);

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
              case '':
                return stripes;
              default:
                return '#E6E1E5';
            }
          };

          dichart.showLoading();
          renderMap(variable, map, getColor, dichart);
        });
      },
    },
  });
}

export default renderPeopleAffectedByCrisisLeaflet;
