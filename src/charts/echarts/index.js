export const colorways = {
  rainbow: [
    '#e84439',
    '#eb642b',
    '#f49b21',
    '#109e68',
    '#0089cc',
    '#893f90',
    '#c2135b',
    '#f8c1b2',
    '#f6bb9d',
    '#fccc8e',
    '#92cba9',
    '#88bae5',
    '#c189bb',
    '#e4819b',
  ],
  default: ['#6c120a', '#a21e25', '#cd2b2a', '#dc372d', '#ec6250', '#f6b0a0', '#fbd7cb', '#fce3dc'],
  sunflower: ['#7d4712', '#ba6b15', '#df8000', '#f7a838', '#fac47e', '#fedcab', '#fee7c1', '#feedd4'],
  marigold: ['#7a2e05', '#ac4622', '#cb5730', '#ee7644', '#f4a57c', '#facbad', '#fcdbbf', '#fde5d4'],
  rose: ['#65093d', '#8d0e56', '#9f1459', '#d12568', '#e05c86', '#f3a5b6', '#f6b8c1', '#f9cdd0'],
  lavendar: ['#42184c', '#632572', '#732c85', '#994d98', '#af73ae', '#cb98c4', '#deb5d6', '#ebcfe5'],
  bluebell: ['#0c457b', '#0071b1', '#0089cc', '#5da3d9', '#77adde', '#88bae5', '#bcd4f0', '#d3e0f4'],
  leaf: ['#08492f', '#005b3e', '#00694a', '#3b8c62', '#74bf93', '#a2d1b0', '#b1d8bb', '#c5e1cb'],
  orange: ['#973915', '#d85b31', '#eb642b', '#f18e5e', '#f4a57c', '#f6bb9d'],
};

export const mixedColourWay = () => {
  const themes = Object.keys(colorways).filter((key) => key !== 'rainbow');

  return colorways.rainbow.reduce((colours, hex, index) =>
    [hex].concat(
      themes.reduce((_themed, theme) => {
        if (colorways[theme].length > index) {
          return _themed.concat(colorways[theme][index]);
        }

        return _themed;
      }, colours),
      []
    )
  );
};

export const legendSelection = (chart, params) => {
  const obj = params.selected;
  const selectAll = Object.values(obj).filter((f) => f).length;
  chart.setOption({ animation: true });

  if (selectAll === 0) {
    // select all on second click
    Object.keys(obj).forEach((key) => {
      chart.dispatchAction({
        type: 'legendSelect',
        name: key,
      });
    });
  } else if (!obj[params.name]) {
    // If user has unselected an item
    // Re-select what the user unselected
    chart.dispatchAction({
      type: 'legendSelect',
      name: params.name,
    });

    // Deselect everything else
    Object.keys(obj).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(obj, key) && key !== params.name) {
        chart.dispatchAction({
          type: 'legendUnSelect',
          name: key,
        });
      }
    });
  }
};

// default echart options for DI charts
const defaultOptions = {
  color: colorways.default.concat(colorways.rainbow),
  legend: {
    left: '10%',
    top: 10,
    textStyle: {
      fontFamily: 'Geomanist Regular,sans-serif',
    },
  },
  tooltip: {
    show: true,
    trigger: 'item',
    showContent: true,
    textStyle: {
      fontFamily: 'Geomanist Regular,sans-serif',
    },
  },
  toolbox: {
    show: true,
    showTitle: false,
    feature: {
      saveAsImage: {
        title: 'Save as PNG',
        pixelRatio: 2,
      },
    },
    right: 20,
    tooltip: {
      show: true,
      formatter(param) {
        return `<div>${param.title}</div>`; // user-defined DOM structure
      },
      textStyle: {
        fontFamily: 'Geomanist Regular,sans-serif',
      },
    },
  },
  xAxis: {
    axisLabel: {
      fontFamily: 'Geomanist Regular,sans-serif',
      fontSize: 13,
    },
    splitLine: {
      show: false,
    },
  },
  yAxis: {
    axisLabel: {
      fontFamily: 'Geomanist Regular,sans-serif',
      fontSize: 13,
    },
    splitLine: {
      show: false,
    },
    nameLocation: 'end',
    nameTextStyle: {
      padding: [0, 50, 0, 0],
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
};

export const handleResize = (chart, chartNode) => {
  window.addEventListener(
    'resize',
    () => {
      chart.resize({ width: `${chartNode.clientWidth}px`, height: `${chartNode.clientHeight}px` });
    },
    true
  );
};

export const getYAxisNamePositionFromSeries = (series) => {
  const isStack = series.some((item) => item.stack);
  const seriesCount = Array.from(new Set(series.map((d) => d.name))).length;
  const max = Math.max(
    ...series.reduce((allData, { data }) => allData.concat(data.map((item) => item.value || 0)), [])
  );
  if (max === 0) {
    return 'blank';
  }
  if (isStack ? max * seriesCount < 100 : max < 100) {
    return 'near';
  }
  if (isStack ? max * seriesCount < 1000 : max < 1000) {
    return 'middle';
  }

  return 'far';
};

export const getScaledValue = (value, scaleMin, scaleMax, dataMin, dataMax) => {
  const scaleFactor = (scaleMax - scaleMin) / (dataMax- dataMin)

  // Scale down the value
  const scaledValue = (value - dataMin) * scaleFactor + scaleMin;

  return scaledValue
}

export const getSymbolSizeRange = (data, variable) => {
  const values = data.map((d) => Number(d[variable]))

  return {min: Math.min(...values), max: Math.max(...values)}
}

export default defaultOptions;
