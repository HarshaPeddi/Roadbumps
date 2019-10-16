import moment from 'moment';

export var LATLNG={

    lat: 32.3476183,
    lng: 34.8610698,
  };

export var DATES = [
'August 01, 2019', 'August 02, 2019', 'August 03, 2019', 'August 04, 2019', 'August 05, 2019', 'August 06, 2019', 
'August 07, 2019', 'August 08, 2019', 'August 09, 2019', 'August 10, 2019', 'August 11, 2019', 'August 12, 2019',
'August 13, 2019', 'August 14, 2019', 'August 15, 2019', 'August 16, 2019', 'August 17, 2019', 'August 18, 2019',
'August 19, 2019', 'August 20, 2019', 'August 21, 2019', 'August 22, 2019', 'August 23, 2019', 'August 24, 2019', 
'August 25, 2019', 'August 26, 2019', 'August 27, 2019', 'August 28, 2019', 'August 29, 2019', 'August 30, 2019',
'August 31, 2019', 'September 01, 2019', 'September 02, 2019', 'September 03, 2019', 'September 04, 2019', 
'September 05, 2019', 'September 06, 2019', 'September 07, 2019', 'September 08, 2019', 'September 09, 2019'
];

export var DATA = [
  2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5,
  2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5,
  2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5,
  2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5
];

export var BACKGROUND_COLOR_FOR_BARCHART = [
  '#4A4A4A', '#4A4A4A', '#4A4A4A', '#4A4A4A', '#4A4A4A', '#4A4A4A', '#4A4A4A', '#4A4A4A',
  '#4A4A4A', '#4A4A4A', '#4A4A4A', '#4A4A4A', '#4A4A4A', '#4A4A4A', '#4A4A4A', '#4A4A4A',
  '#4A4A4A', '#4A4A4A', '#4A4A4A', '#4A4A4A', '#4A4A4A', '#4A4A4A', '#4A4A4A', '#4A4A4A',
  '#4A4A4A', '#4A4A4A', '#4A4A4A', '#4A4A4A', '#4A4A4A', '#4A4A4A', '#4A4A4A', '#4A4A4A',
  '#4A4A4A', '#4A4A4A', '#4A4A4A', '#4A4A4A', '#4A4A4A', '#4A4A4A', '#4A4A4A', '#4A4A4A',
];

export var BORDER_COLOR_FOR_BARCHART = [
  '#676464', '#676464', '#676464', '#676464', '#676464', '#676464', '#676464', '#676464',
  '#676464', '#676464', '#676464', '#676464', '#676464', '#676464', '#676464', '#676464',
  '#676464', '#676464', '#676464', '#676464', '#676464', '#676464', '#676464', '#676464',
  '#676464', '#676464', '#676464', '#676464', '#676464', '#676464', '#676464', '#676464',
  '#676464', '#676464', '#676464', '#676464', '#676464', '#676464', '#676464', '#676464',
];

export const findMinAndMax = (items, property, type, range) => {
  let min = 0, max = 0;
  for (let i = 0; i < items.length; i++) {
    if (type !== items[i].properties.event_type) {
      continue;
    }
    if (range && !isInRange(items[i].properties.period_start_time, range)) {
      continue;
    }
    const value = items[i].properties[property];
    if (value < min) {
      min = value;
    }
    if (value > max) {
      max = value;
    }
  }
  return [min, max];
}

const isInRange = (date, range) => {
  const startDate = new Date(`${range.startDate._d.getFullYear()}-${range.startDate._d.getMonth() + 1}-${range.startDate._d.getDate()}`);
  const endDate = new Date(`${range.endDate._d.getFullYear()}-${range.endDate._d.getMonth() + 1}-${range.endDate._d.getDate()}`);
  const idate = new Date(moment(date, "DD/MM/YYYY").format("MM-DD-YYYY"));
  if (+idate >= +startDate && +idate <= +endDate) {
    return true;
  }
  return false;
}

export const getDates = (startDate, endDate) => {
  var now = startDate, dates = [];
  
  while (now.isSameOrBefore(endDate, 'date')) {
    dates.push(now.format('MMMM DD, YYYY'));
    now.add(1, 'days');
  }
  return dates;
};