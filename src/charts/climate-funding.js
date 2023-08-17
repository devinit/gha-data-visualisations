import React from 'react';
import { createRoot } from 'react-dom/client';
import deepMerge from 'deepmerge';
import fetchCSVData, { ACTIVE_BRANCH } from '../utils/data';
import { addFilterWrapper } from '../widgets/filters';
import defaultOptions, { handleResize } from './echarts';
import ChartFilters from '../components/ChartFilters';
import Select from '../components/Select';

const DATA_URL = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/public/assets/data/climate_funding_data_long_format.csv`;
const filterOptions = [
  { value: 'Total_Climate_USD', label: 'USD millions' },
  { value: 'Total_Climate_Share', label: 'Percentage share' },
];
const requiredVariables = ['Total_Climate_USD', 'Total_Climate_Share', 'Vulnerability_Score'];
const offsetMapping = [
  { value: 42.5, offset: -530 },
  { value: 43, offset: -538 },
  { value: 43.5, offset: -494 },
];
// const countryFilterOptions = (countryList) =>
//   [{ value: 'all', label: 'All' }].concat(countryList.map((country) => ({ value: country, label: country })));

const yearFilterOptions = (yearList) => yearList.map((year) => ({ value: year, label: year }));

const groupedCountryData = (data, countries, years, countryName) => {
  const finalData = [];
  if (countryName === 'all') {
    years.forEach((year) => {
      countries.forEach((country) => {
        const countryData = {};
        countryData.name = country;
        countryData.year = year;
        data.forEach((item) => {
          if (item.countryname === country && item.year === year) {
            countryData[item.variable] = item.value_fixed;
          }
        });
        finalData.push(countryData);
      });
    });
  } else {
    years.forEach((year) => {
      const countryData = {};
      countryData.name = countryName;
      countryData.year = year;
      data.forEach((item) => {
        if (item.countryname === countryName && item.year === year) {
          countryData[item.variable] = item.value_fixed;
        }
      });
      finalData.push(countryData);
    });
  }

  return finalData;
};

const getMinMax = (data, year) => {
  const vulnerabilityData = data
    .filter((item) => item.year === year && Number(item.Vulnerability_Score) !== 0)
    .map((d) => Number(d.Vulnerability_Score));

  return { max: Math.max(...vulnerabilityData), min: Math.min(...vulnerabilityData) };
};
const seriesData = (data, variable, year) =>
  data
    .filter((item) => item.year === year && Number(item.Vulnerability_Score) !== 0)
    .map((d) => [Number(d.Vulnerability_Score), Number(d[variable]), d.name]);

const renderDefaultChart = (chart, years, data, variable, scaleData) => {
  const midScaleValue = Math.round(scaleData.min) + (Math.round(scaleData.max) - Math.round(scaleData.min)) / 2;
  const option = {
    visualMap: {
      type: 'piecewise',
      dimension: 0,
      splitNumber: 2,
      text: ['High', 'Low'],
      bottom: '50%',
      min: Math.round(scaleData.min),
      max: Math.round(scaleData.max),
      inRange: {
        color: ['#77adde', '#0071b1'],
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: (params) => `${params.data[2]} <br/>
      Vulnerability score: ${params.data[0]} <br/>
      ${filterOptions.find((item) => item.value === variable).label}: ${params.data[1]} ${
        variable === 'Total_Climate_USD' ? 'million' : '%'
      }
      `,
    },
    grid: { bottom: '10%', top: '20%' },
    xAxis: {
      name: 'Vulnerability score',
      nameLocation: 'center',
      scale: true,
    },
    yAxis: {
      name: filterOptions.find((item) => item.value === variable).label,
      axisLine: {
        onZero: false,
      },
      offset: offsetMapping.find((item) => item.value === midScaleValue).offset,
    },
    series: [
      {
        type: 'scatter',
        data,
        itemStyle: {
          opacity: 1,
        },
        symbolSize: 15,
        emphasis: {
          itemStyle: {
            borderColor: '#333',
            borderWidth: 2.5,
          },
        },
      },
    ],
  };

  chart.setOption(deepMerge(option, defaultOptions));

  return chart;
};

const renderClimateFundingChart = () => {
  window.DICharts.handler.addChart({
    className: 'dicharts--climate-funding',
    echarts: {
      onAdd: (chartNodes) => {
        Array.prototype.forEach.call(chartNodes, async (chartNode) => {
          const dichart = new window.DICharts.Chart(chartNode.parentElement);

          let variable = 'Total_Climate_Share';
          const country = 'all';
          let year = '2021';
          const data = await fetchCSVData(DATA_URL);
          const years = Array.from(new Set(data.map((d) => d.year))).reverse();

          const countries = Array.from(new Set(data.map((d) => d.countryname)));
          const filteredData = (csvData) => csvData.filter((item) => requiredVariables.includes(item.variable));
          let consolidatedData = groupedCountryData(filteredData(data), countries, years, country);

          // create UI elements

          const chart = window.echarts.init(chartNode);
          renderDefaultChart(
            chart,
            years,
            seriesData(consolidatedData, variable, year),
            variable,
            getMinMax(consolidatedData, year)
          );

          const filterWrapper = addFilterWrapper(chartNode);

          const onSelectFilter = (item) => {
            variable = item.value ? item.value : variable;
            consolidatedData = groupedCountryData(filteredData(data), countries, years, country);
            renderDefaultChart(
              chart,
              years,
              seriesData(consolidatedData, variable, year),
              variable,
              getMinMax(consolidatedData, year)
            );
          };

          // const onSelectCountry = (item) => {
          //   country = item.value ? item.value : 'all';
          //   consolidatedData = groupedCountryData(filteredData(data), countries, years, country);
          //   renderDefaultChart(
          //     chart,
          //     years,
          //     seriesData(consolidatedData, variable, year),
          //     variable,
          //     getMinMax(consolidatedData, year)
          //   );
          // };

          const onSelectYear = (item) => {
            year = item.value ? item.value : year;
            consolidatedData = groupedCountryData(filteredData(data), countries, years, country);
            renderDefaultChart(
              chart,
              years,
              seriesData(consolidatedData, variable, year),
              variable,
              getMinMax(consolidatedData, year)
            );
          };

          // create dropdowns
          const root = createRoot(filterWrapper);
          root.render(
            <ChartFilters>
              <Select
                classNamePrefix="climate-chart-select"
                label="Select value type"
                options={filterOptions}
                defaultValue={[{ value: 'Total_Climate_Share', label: 'Percentage share' }]}
                onChange={onSelectFilter}
                css={{
                  minWidth: '150px',
                }}
              />
              {/* <Select
                classNamePrefix="climate-chart-country-select"
                label="Select country"
                options={countryFilterOptions(countries)}
                defaultValue={[{ value: 'all', label: 'All' }]}
                onChange={onSelectCountry}
                css={{
                  minWidth: '150px',
                }}
              /> */}
              <Select
                classNamePrefix="climate-chart-year-select"
                label="Select year"
                options={yearFilterOptions(years)}
                defaultValue={[{ value: '2021', label: '2021' }]}
                onChange={onSelectYear}
                css={{
                  minWidth: '150px',
                }}
              />
            </ChartFilters>
          );

          dichart.hideLoading();

          // add responsiveness
          handleResize(chart, chartNode);
        });
      },
    },
  });
};

export default renderClimateFundingChart;
