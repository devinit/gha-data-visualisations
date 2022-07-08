import deepMerge from 'deepmerge';
import React from 'react';
import { createRoot } from 'react-dom/client';
import RecipientChartFilters from '../components/RecipientChartFilters';
import fetchCSVData from '../utils/data';
import { addFilterWrapper } from '../widgets/filters';
import defaultOptions, { colorways, getYAxisNamePositionFromSeries, handleResize, legendSelection } from './echarts';

const DONOR_DATA_URL =
  'https://raw.githubusercontent.com/devinit/gha-data-visualisations/fix/chart_and_csv_updates/public/assets/data/recipients-by-donor.csv';
const ORG_TYPE_DATA_URL =
  'https://raw.githubusercontent.com/devinit/gha-data-visualisations/fix/chart_and_csv_updates/public/assets/data/recipients-by-org-type.csv';

const nf = new Intl.NumberFormat();

const cleanValue = (value) =>
  value.trim() ? Number(value.replace(',', '').replace(' ', '').replace('%', '').trim()).toFixed(2) : null;

const cleanData = (data, field = 'Value') =>
  data.map((d) => {
    const clean = { ...d };
    clean.value = cleanValue(d[field]);

    return clean;
  });

const processData = (data, years, recipient, donor) => {
  const filteredData = data.filter(
    (d) => d['Destination Country'].trim() === recipient && d['Donor organisation'] === donor
  );
  const sortedData = years.map((year) => filteredData.find((d) => d.Year === year) || null);

  return sortedData;
};

const processOrgTypeData = (data, orgType, years) => {
  const properties = ['Destination Country', 'Recipient Org Type'];
  const filteredData = data.filter((d) => d[properties[1]] === orgType);
  const sortedData = years.map((year) => {
    const yearData = filteredData.find((d) => d.Year === year);

    return {
      value: yearData ? cleanValue(yearData.value) || null : null,
      emphasis: {
        focus: 'self',
      },
    };
  });

  return sortedData;
};

const getRecipientDonors = (data, recipient) => {
  const preApprovedDonors = ['US', 'EU institutions', 'Germany', 'UK', 'Saudi Arabia', 'All other donors'];
  const recipientData = data.filter((d) => d['Destination Country'].trim() === recipient);
  if (preApprovedDonors.length >= 5) {
    return preApprovedDonors;
  }
  const donors = Array.from(new Set(recipientData.map((d) => d['Donor organisation'])))
    .filter((d) => !preApprovedDonors.includes(d))
    .slice(0, 5);

  return donors.concat(preApprovedDonors);
};

const getRecipientOrgType = (data, recipient) => {
  const recipientData = data.filter((d) => d['Destination Country'].trim() === recipient);
  const orgTypes = Array.from(new Set(recipientData.map((d) => d['Recipient Org Type'])));

  return orgTypes;
};

const getYaxisValue = (namePosition = 'far') => {
  const paddingMapping = {
    near: [-35, 0, 0, 0],
    middle: [-45, 0, 0, 0],
    far: [-54, 0, 0, 0],
  };

  return {
    type: 'value',
    nameRotate: 90,
    name: 'US$ millions',
    nameLocation: 'end',
    nameTextStyle: {
      verticalAlign: 'top',
      align: 'right',
      padding: paddingMapping[namePosition],
    },
  };
};

const renderDefaultChart = (chart, data, recipient, { years, channels }) => {
  const option = {
    color: colorways.bluebell,
    legend: {
      show: true,
      top: 'top',
      padding: [20, 10, 5, 10],
      textStyle: {
        fontSize: '1.3rem',
      },
    },
    grid: { bottom: '10%', top: '20%' },
    xAxis: {
      type: 'category',
      data: years,
      position: 'bottom',
    },
    series: channels.map((channel) => ({
      name: channel,
      data: processData(data, years, recipient, channel).map((d) => ({
        value: d && Number(d.value).toFixed(2),
        emphasis: {
          focus: 'self',
        },
      })),
      type: 'bar',
      stack: 'channels',
      cursor: 'auto',
      tooltip: {
        trigger: 'item',
        formatter: (params) =>
          `${channel}, ${params.name} <br />10 largest recipients: <strong>US$${nf.format(
            Math.round(params.value)
          )} million</strong>`,
      },
      animation: false,
    })),
  };
  option.yAxis = getYaxisValue(getYAxisNamePositionFromSeries(option.series));
  defaultOptions.toolbox.feature.saveAsImage.name = 'recipients';
  chart.setOption(deepMerge(option, defaultOptions), { replaceMerge: ['series'] });
  chart.on('legendselectchanged', (params) => {
    legendSelection(chart, params);
  });

  return chart;
};

const updateChartByDonors = (chart, updatedData, { recipient, years }) => {
  const cleanedData = cleanData(updatedData, 'USD deflated millions');
  const donors = getRecipientDonors(updatedData, recipient);
  const series = donors
    .map((donor) => ({
      name: donor,
      data: processData(cleanedData, years, recipient, donor).map((d) => ({
        value: d && Number(d.value).toFixed(2),
        emphasis: {
          focus: 'self',
        },
      })),
      type: 'bar',
      stack: recipient,
      cursor: 'auto',
      tooltip: {
        trigger: 'item',
        formatter: (params) =>
          `${donor}, ${params.name} <br/>${recipient}: <strong>US$${nf.format(
            Math.round(params.value)
          )} million</strong>`,
      },
    }))
    .reduce((final, cur) => final.concat(cur), []);
  chart.setOption(
    { yAxis: getYaxisValue(getYAxisNamePositionFromSeries(series)), series },
    { replaceMerge: ['series'] }
  );
};

const sortOrgTypes = (orgTypes) => {
  const trailingOrgTypes = ['Not reported', 'Other'];
  const sortedOrgTypes = orgTypes.filter((type) => !trailingOrgTypes.includes(type));

  trailingOrgTypes.forEach((type) => {
    if (orgTypes.includes(type)) {
      sortedOrgTypes.push(type);
    }
  });

  return sortedOrgTypes;
};

const updateChartByOrgType = (chart, updatedData, { recipient, years }) => {
  const orgTypes = sortOrgTypes(getRecipientOrgType(updatedData, recipient));
  const series = orgTypes
    .map((orgType) => ({
      name: orgType,
      data: processOrgTypeData(updatedData, orgType, years),
      type: 'bar',
      stack: recipient,
      cursor: 'auto',
      tooltip: {
        trigger: 'item',
        formatter: (params) =>
          `${params.name} <br/>${orgType}: <strong>US$${nf.format(Math.round(params.value))} million</strong>`,
      },
    }))
    .reduce((final, cur) => final.concat(cur), []);
  chart.setOption(
    { yAxis: getYaxisValue(getYAxisNamePositionFromSeries(series)), series },
    { replaceMerge: ['series'] }
  );
};

/**
 * Run your code after the page has loaded
 */
const renderRecipientChart = () => {
  window.DICharts.handler.addChart({
    className: 'dicharts--gha-recipients',
    echarts: {
      onAdd: (chartNodes) => {
        Array.prototype.forEach.call(chartNodes, async (chartNode) => {
          const dichart = new window.DICharts.Chart(chartNode.parentElement);

          /**
           * ECharts - prefix all browsers global with window
           * i.e window.echarts - echarts won't work without it
           *
           * const chart = window.echarts.init(chartNode);
           */
          const donorData = await fetchCSVData(DONOR_DATA_URL);
          const orgTypeData = await fetchCSVData(ORG_TYPE_DATA_URL);
          const filterWrapper = addFilterWrapper(chartNode);
          // extract unique values
          const recipients = Array.from(
            new Set(donorData.filter((d) => d['Top 10 recipient'] === 'Yes').map((d) => d['Destination Country']))
          );
          const years = Array.from(new Set(donorData.map((d) => d.Year)));
          const defaultRecipient = 'Afghanistan'; // used to be '10 largest recipients'
          const defaultBreakdown = 'By donor';
          const initialDonors = getRecipientDonors(donorData, defaultRecipient);
          // create UI elements
          // in case the recipients are different, we create another dropdown with the org type data
          const orgTypeRecipients = Array.from(
            new Set(orgTypeData.filter((d) => d['Top 10 recipient'] === 'Yes').map((d) => d['Destination Country']))
          );
          // defaults to donor breakdown
          const chart = window.echarts.init(chartNode);
          renderDefaultChart(chart, cleanData(donorData, 'USD deflated millions'), defaultRecipient, {
            years,
            channels: initialDonors,
          });

          let selectedRecipient = defaultRecipient;

          // add dropdown event handlers
          const onSelectRecipient = (value, breakdown = defaultBreakdown) => {
            selectedRecipient = value || defaultRecipient;
            if (breakdown === 'By donor') {
              if (selectedRecipient !== '10 largest recipients') {
                const filteredData = donorData.filter((d) => d['Destination Country'] === selectedRecipient);
                updateChartByDonors(chart, filteredData, { recipient: selectedRecipient, years });
              } else {
                selectedRecipient = '10 largest recipients'; // reset country filter selected value
                renderDefaultChart(chart, cleanData(donorData, 'USD deflated millions'), '10 largest recipients', {
                  years,
                  channels: initialDonors,
                });
              }
            } else {
              updateChartByOrgType(
                chart,
                orgTypeData.filter((d) => d['Destination Country'] === value),
                { recipient: value, years }
              );
            }
          };

          const onSelectBreakdown = (value, recipient) => {
            if (value === 'By donor') {
              if (recipient !== '10 largest recipients') {
                const filteredData = donorData.filter((d) => d['Destination Country'] === recipient);
                updateChartByDonors(chart, filteredData, { recipient, years });
              } else {
                renderDefaultChart(chart, cleanData(donorData, 'USD deflated millions'), '10 largest recipients', {
                  years,
                  channels: initialDonors,
                });
              }
            } else {
              updateChartByOrgType(
                chart,
                orgTypeData.filter((d) => d['Destination Country'] === recipient),
                { recipient, years }
              );
            }
          };

          // create dropdowns
          const root = createRoot(filterWrapper);
          root.render(
            <RecipientChartFilters
              donorRecipients={recipients}
              orgTypeRecipients={orgTypeRecipients}
              onSelectRecipient={onSelectRecipient}
              onSelectBreakdown={onSelectBreakdown}
              defaultBreakdown={defaultBreakdown}
              defaultRecipient={defaultRecipient}
            />
          );

          dichart.hideLoading();

          // add responsiveness
          handleResize(chart, chartNode);
        });
      },
    },
  });
};

export default renderRecipientChart;
