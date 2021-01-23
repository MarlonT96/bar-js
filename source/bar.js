/**
 * bar.js
 * Simple, elegant bar chart library
 * January 22th, 2020 - version 1.0
 * {url}
 *
 * Copyright 2021 Marlon Torres
 * Realeased under MIT License
 * {license url}
 */

'use strict';

/**
 *
 * @param {string} targetId - Container ID
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 * @param {object[]} data - Data to render on canvas
 */
function BarChart(targetId, width, height, data) {
  // Base
  const chart = this;

  // Specify Configurations
  chart.configureChart(targetId, width, height, data);

  // Pre Operations
  chart.performOperations();

  // Draw Chart
  chart.drawChart();
}

BarChart.prototype.configureChart = function (
  targetId,
  width,
  height,
  data,
) {
  // Base
  const chart = this;

  // Global Canvas Specifications
  chart.setCanvasParameters(targetId, width, height, data);

  // Global Chart Specifications
  chart.setChartParameters(targetId, width, height, data);
}

BarChart.prototype.setCanvasParameters = function (
  targetId,
  width,
  height,
  data,
) {
  // Base
  const chart = this;

  // Canvas Specifications come from outside
  chart.id = targetId;
  chart.width = width;
  chart.height = height;
  chart.data = data;
}

BarChart.prototype.setChartParameters = function () {
  const chart = this;

  // Axis Configurations
  chart.axisRatio = 10; // In terms of percentage
  chart.verticalMargin = (chart.height * chart.axisRatio) / 100;
  chart.horizontalMargin = (chart.width * chart.axisRatio) / 100;
  chart.axisColor = '#b1b1b1';
  chart.axisWidth = 0.75;

  // Label Configurations
  chart.fontRatio = 3;
  chart.fontFamily = 'times';
  chart.fontStyle = 'normal';
  chart.fontWeight = '300';
  chart.fontColor = '#666';
  chart.verticalFontSize = (chart.height * chart.fontRatio) / 100;
  chart.horizontalFontSize = (chart.width * chart.fontRatio) / 100;

  // Guideline Configurations
  chart.guidelineColor = '#e5e5e5';
  chart.guidelineWidth = 0.5;
}

BarChart.prototype.performOperations = function () {
  // Base
  const chart = this;

  // Create Canvas
  chart.createCanvas();

  // Get Data
  chart.handleData();

  // Prepare data
  chart.prepareData();
}

BarChart.prototype.createCanvas = function () {
  // Base
  const chart = this;

  // Create Canvas
  const canvas = document.createElement('canvas');
  canvas.id = chart.id + '-' + Math.random();
  canvas.width = chart.width;
  canvas.height = chart.height;

  // Append canvas to target container
  // clean container
  document.getElementById(chart.id).innerHTML = '';
  // add canvas to clean container
  document.getElementById(chart.id).appendChild(canvas);

  // Add canvas to chart object
  chart.canvas = canvas;
  chart.context = canvas.getContext('2d');

}

BarChart.prototype.handleData = function () {
  // Base
  const chart = this;

  // Data sets
  chart.labels = [];
  chart.values = [];

  // Handle Data
  chart.data.forEach((item) => {
    chart.labels.push(item.label);
    chart.values.push(item.value);
  });
}

BarChart.prototype.prepareData = function () {
  // Base
  const chart = this;

  // Global Variables
  chart.itemsNum = chart.data.length;
  chart.maxValue = Math.max.apply(null, chart.values);
  chart.minValue = Math.min.apply(null, chart.values);

  // Axis Specifications
  chart.verticalAxisWidth = chart.height - 2 * chart.verticalMargin;
  chart.horizontalAxisWidth = chart.width - 2 * chart.horizontalMargin;

  // Label Specifications
  chart.verticalUpperBond = Math.ceil(chart.maxValue / 10) * 10;
  chart.verticalLabelFreq = chart.verticalUpperBond / chart.itemsNum;
  chart.horizontalLabelFreq = chart.horizontalAxisWidth / chart.itemsNum;
}

BarChart.prototype.drawChart = function () {
  // Base
  const chart = this;

  // Vertical Axis
  chart.drawVerticalAxis();

  // Vertical Labels
  chart.drawVerticalLabels();

  // Horizontal Axis
  chart.drawHorizontalAxis();

  // Horizontal Labels
  chart.drawHorizontalLabels();

  // Horizontal Guidelines
  chart.drawHorizontalGuidelines();

  // Vertical Guidelines
  chart.drawVerticalGuidelines();

  // Bars
  chart.drawBars();
}

BarChart.prototype.drawVerticalAxis = function () {
  // Base
  const chart = this;

  // Vertical Axis
  chart.context.beginPath();

  chart.context.strokeStyle = chart.axisColor;
  chart.context.lineWidth = chart.axisWidth;

  chart.context.moveTo(chart.horizontalMargin, chart.verticalMargin);

  chart.context.lineTo(
    chart.horizontalMargin,
    chart.height - chart.verticalMargin
  );

  chart.context.stroke();
}

BarChart.prototype.drawHorizontalAxis = function () {
  // Base
  const chart = this;

  // Horizontal Axis
  chart.context.beginPath();

  chart.context.strokeStyle = chart.axisColor;
  chart.context.lineWidth = chart.axisWidth;

  chart.context.moveTo(
    chart.horizontalMargin,
    chart.height - chart.verticalMargin);

  chart.context.lineTo(
    chart.width - chart.horizontalMargin,
    chart.height - chart.verticalMargin
  );

  chart.context.stroke();
}

BarChart.prototype.drawVerticalLabels = function () {
  // Base
  const chart = this;

  // Text Specifications
  const labelFont = chart.fontStyle + ' ' + chart.fontWeight + ' ' +
    chart.verticalFontSize + 'px ' + chart.fontFamily;

  chart.context.font = labelFont;
  chart.context.textAlign = 'right';
  chart.context.fillStyle = chart.fontColor;

  // Scale Values
  const scaledVerticalLabelFreq = (chart.verticalAxisWidth /
    chart.verticalUpperBond) * chart.verticalLabelFreq

  // Draw Labels
  for (let i = 0; i <= chart.itemsNum; i += 1) {
    const labelText = chart.verticalUpperBond - i * chart.verticalLabelFreq;
    const verticalLabelX =
      chart.horizontalMargin -
      chart.horizontalMargin /
      chart.axisRatio;

    const verticalLabelY = chart.verticalMargin + i * scaledVerticalLabelFreq;

    chart.context.fillText(labelText, verticalLabelX, verticalLabelY);
  }
}

BarChart.prototype.drawHorizontalLabels = function () {
  // Base
  const chart = this;

  // Text Specifications
  const labelFont = chart.fontStyle + ' ' + chart.fontWeight + ' ' +
    chart.verticalFontSize + 'px ' + chart.fontFamily;

  chart.context.font = labelFont;
  chart.context.fillStyle = chart.fontColor;
  chart.context.textAlign = 'center';
  chart.context.textBaseline = 'top';

  // Draw Labels
  for (let i = 0; i < chart.itemsNum; i += 1) {
    const horizontalLabelX = chart.horizontalMargin +
      i * chart.horizontalLabelFreq + chart.horizontalLabelFreq / 2;

    const horizontalLabelY = chart.height - chart.verticalMargin +
      chart.verticalMargin / chart.axisRatio;

    chart.context.fillText(chart.labels[i], horizontalLabelX, horizontalLabelY);

  }
}

BarChart.prototype.drawHorizontalGuidelines = function () {
  // Base
  const chart = this;

  // Specifications
  chart.context.strokeStyle = chart.guidelineColor;
  chart.context.lineWidth = chart.guidelineWidth;

  // Scale Values
  const scaledVerticalLineFreq = (chart.verticalAxisWidth /
    chart.verticalUpperBond) * chart.verticalLabelFreq


  // Draw Guidelines
  for (let i = 0; i <= chart.itemsNum; i += 1) {
    // Start point coordinates
    const horizontalGuidelineStartX = chart.horizontalMargin;
    const horizontalGuidelineStartY = chart.verticalMargin + i *
      scaledVerticalLineFreq;

    // End point coordinates
    const horizontalGuidelineEndX = chart.horizontalMargin +
      chart.horizontalAxisWidth;
    const horizontalGuidelineEndY = chart.verticalMargin + i *
      scaledVerticalLineFreq;

    chart.context.beginPath();
    chart.context.moveTo(horizontalGuidelineStartX, horizontalGuidelineStartY);
    chart.context.lineTo(horizontalGuidelineEndX, horizontalGuidelineEndY);
    chart.context.stroke();
  }
}

BarChart.prototype.drawVerticalGuidelines = function () {
  // Base
  const chart = this;

  // Specifications
  chart.context.strokeStyle = chart.guidelineColo

  // Draw Labels
  for (let i = 0; i <= chart.itemsNum; i += 1) {
    // Start point coordinates
    const verticalGuidelineStartX = chart.horizontalMargin + i *
      chart.horizontalLabelFreq;
    const verticalGuidelineStartY = chart.height - chart.verticalMargin;

    // End point coordinates
    const verticalGuidelineEndX = chart.horizontalMargin + i *
      chart.horizontalLabelFreq;
    const verticalGuidelineEndY = chart.verticalMargin;

    chart.context.beginPath();
    chart.context.moveTo(verticalGuidelineStartX, verticalGuidelineStartY);
    chart.context.lineTo(verticalGuidelineEndX, verticalGuidelineEndY);
    chart.context.stroke();
  }
}

BarChart.prototype.drawBars = function () {
  // Base
  const chart = this;


  for (let i = 0; i < chart.itemsNum; i += 1) {
    const color = chart.createRandomRGBColor();
    const fillOpacity = '0.3';

    const fillColor = 'rgba(' + color.r + ', ' + color.g + ', ' +
      color.b + ', ' + fillOpacity + ')';

    const borderColor = 'rgba(' + color.r + ', ' + color.g + ', ' +
      color.b + ')';

    const barX = chart.horizontalMargin + i * chart.horizontalLabelFreq +
      chart.horizontalLabelFreq / chart.axisRatio;

    const barY = chart.height - chart.verticalMargin;

    const barWidth = chart.horizontalLabelFreq - 2 *
      chart.horizontalLabelFreq / chart.axisRatio;

    const barHeight = -1 * chart.verticalAxisWidth * chart.values[i] /
      chart.maxValue;

    chart.context.strokeStyle = borderColor;
    chart.context.fillStyle = fillColor;
    chart.context.beginPath();
    chart.context.rect(barX, barY, barWidth, barHeight);
    chart.context.stroke();
    chart.context.fill();
  }
}

BarChart.prototype.createRandomRGBColor = function () {
  const red = getRandomInt(0, 257);
  const green = getRandomInt(0, 257);
  const blue = getRandomInt(0, 257);

  return { r: red, g: green, b: blue };
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  // Maximum is exclusive and minimum inclusive
  return Math.floor(Math.random() * (max - min)) + min;
}
