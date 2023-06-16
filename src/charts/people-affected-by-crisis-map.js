/** @jsx jsx */
import chroma from 'chroma-js';
import { jsx } from '@emotion/react';
import { createRoot } from 'react-dom/client';
import MapFilters from '../components/MapFilters';
import MapResetButton from '../components/MapResetButton';
import fetchCSVData, { ACTIVE_BRANCH } from '../utils/data';
import {
  dataBox,
  dataInjectedGeoJson,
  getColor,
  handleClickFeature,
  highlightFeature,
  matchCountryNames,
  processedData,
  getColorDynamic,
  getMaxMinValues,
  colorArray,
} from '../utils/interactiveMap';
import { addFilterWrapper } from '../widgets/filters';

const MAP_FILE_PATH = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/src/data/world_map.geo.json`;
const CSV_PATH = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/src/data/map_data_long.csv`;

const renderMap = (
  dimensionVariable,
  mapInstance,
  colorFunction,
  data,
  processed,
  filterOptions,
  legendInstance,
  groupInstance,
  csvData
) => {
  let geojsonLayer;

  const legendInstanceCopy = legendInstance;
  legendInstanceCopy.onAdd = function () {
    const div = window.L.DomUtil.create('div', 'legend');
    const crisisLegendData = [
      { score: '', label: 'Not in crisis' },
      { score: 'In Crisis', label: 'In crisis' },
      { score: 'Entering protracted crisis', label: 'Entering protracted crisis' },
      { score: 'In protracted crisis', label: 'In protracted crisis' },
    ];
    const foodSecuritylegendData = [
      { score: 'Not assessed', label: 'No data' },
      { score: '2', label: '2' },
      { score: '3', label: '3' },
      { score: '3+', label: '3+' },
      { score: '4', label: '4' },
    ];
    const legendData = [
      { variable: 'Crisis_type', data: crisisLegendData },
      { variable: 'IPC_Food_insecurity_phase', data: foodSecuritylegendData },
      { variable: 'People_in_need_(millions)' },
    ];
    const scaleData = getMaxMinValues(dimensionVariable, processed);
    const legendContent =
      dimensionVariable === 'People_in_need_(millions)'
        ? `${colorArray
            .map(
              (color) =>
                `<span>
          <i style="background:${color};border-radius:1px;margin-right:0;width:40px;"></i>
        </span>`
            )
            .join('')} <p style="margin-left:1px;margin-top: 4px;">${scaleData.minValue} - ${
            scaleData.maxValue
          }, millions of people</p>`
        : legendData
            .find((items) => items.variable === dimensionVariable)
            .data.map(
              (dataItems) =>
                `<span><i style="background:${getColor(dataItems.score, dimensionVariable)}"></i><label>${
                  dataItems.label
                }</label></span>`
            )
            .join('');
    div.innerHTML = legendContent;

    return div;
  };
  legendInstanceCopy.addTo(mapInstance);
  const style = (feature) => ({
    fillColor:
      filterOptions.find((opts) => opts.name === dimensionVariable).scaleType === 'piecewise'
        ? colorFunction(feature.properties[dimensionVariable], dimensionVariable)
        : colorFunction(feature.properties[dimensionVariable], dimensionVariable),
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
        mouseover: (e) => highlightFeature(e, dimensionVariable, filterOptions, csvData),
        mouseout: resetHighlight,
        click: (e) => handleClickFeature(e, mapInstance, dataBox, csvData),
      });
    } else {
      layer.on({
        mouseover: () => {
          const els = mapInstance.getContainer().querySelectorAll('.leaflet-interactive');
          els.forEach((el) => {
            const elementCopy = el;
            elementCopy.classList += ' grab-cursor-enabled';
          });
        },
        mouseout: () => {
          const els = mapInstance.getContainer().querySelectorAll('.leaflet-interactive.grab-cursor-enabled');
          els.forEach((el) => {
            el.classList.remove('grab-cursor-enabled');
          });
        },
      });
    }
  };

  function loadLayer() {
    groupInstance.clearLayers();
    geojsonLayer = window.L.geoJSON(dataInjectedGeoJson(data, processed), {
      style,
      onEachFeature,
    });
    groupInstance.addLayer(geojsonLayer);
  }
  loadLayer();
};

function renderPeopleAffectedByCrisisLeaflet() {
  window.DICharts.handler.addChart({
    className: 'dicharts--gha-people-affected-by-crisis-leaflet',
    echarts: {
      onAdd: (chartNodes) => {
        Array.prototype.forEach.call(chartNodes, (chartNode) => {
          window.dataLayer = window.dataLayer || [];
          const dichart = new window.DICharts.Chart(chartNode.parentElement);
          const map = window.L.map(chartNode, {
            maxZoom: 3,
            minZoom: 1,
            crs: window.L.CRS.EPSG4326,
            center: [6.6, 20.9],
            zoom: 1,
            attributionControl: false,
          });
          const variable = 'People_in_need_(millions)';

          // Filter
          const filterWrapper = addFilterWrapper(chartNode);
          const filterOptions = [
            {
              name: 'People_in_need_(millions)',
              label: 'People in need',
              scaleType: 'continous',
              unit: 'million',
            },
            { name: 'Crisis_type', label: 'Crisis state', scaleType: 'piecewise', unit: '' },
            {
              name: 'IPC_Food_insecurity_phase',
              label: 'Food insecurity',
              scaleType: 'piecewise',
              unit: '',
            },
          ];

          // Legend
          const legend = window.L.control({ position: 'topright' });
          const resetButton = window.L.control({ position: 'bottomleft' });

          dichart.showLoading();
          window
            .fetch(MAP_FILE_PATH)
            .then((response) => response.json())
            .then((jsonData) => {
              const geojsonData = jsonData.features;
              fetchCSVData(CSV_PATH).then((data) => {
                const processedCountryNameData = matchCountryNames(data, geojsonData);
                const countries = Array.from(new Set(processedCountryNameData.map((stream) => stream.Country_name)));
                const groupedData = processedData(countries, processedCountryNameData);

                const fg = window.L.featureGroup().addTo(map);

                const getColorContinous = (d, dimensionVariable) => {
                  const scaleData = getMaxMinValues(dimensionVariable, groupedData);
                  const increment = (scaleData.maxValue - scaleData.minValue) / colorArray.length;

                  if (!d) {
                    return '#E6E1E5';
                  }

                  return getColorDynamic(d, scaleData.minValue, scaleData.maxValue, increment, chroma);
                };

                const onSelectDimension = (dimension) => {
                  renderMap(
                    dimension,
                    map,
                    filterOptions.find((option) => option.name === dimension).scaleType === 'continous'
                      ? getColorContinous
                      : getColor,
                    geojsonData,
                    groupedData,
                    filterOptions,
                    legend,
                    fg,
                    data
                  );
                };

                const onReset = () => {
                  map.setView([6.6, 20.9], 1);
                };

                // Render filter component
                const root = createRoot(filterWrapper);
                root.render(<MapFilters onSelectDimension={onSelectDimension} />);

                // Render reset Button

                resetButton.onAdd = function () {
                  const div = window.L.DomUtil.create('div');
                  const buttonRoot = createRoot(div);
                  buttonRoot.render(<MapResetButton onReset={onReset} />);

                  return div;
                };

                resetButton.addTo(map);

                renderMap(
                  variable,
                  map,
                  filterOptions.find((option) => option.name === variable).scaleType === 'continous'
                    ? getColorContinous
                    : getColor,
                  geojsonData,
                  groupedData,
                  filterOptions,
                  legend,
                  fg,
                  data
                );
                dichart.hideLoading();
              });
            })
            .catch((error) => console.log(error));
        });
      },
    },
  });
}

export default renderPeopleAffectedByCrisisLeaflet;
