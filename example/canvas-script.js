window.onload = function() {
  const min = 1;
  const max = 200;

  // Chart Data
  const data = [
    { label: 'Jan', value: getRandomInt(min, max) },
    { label: 'Feb', value: getRandomInt(min, max) },
    { label: 'March', value: getRandomInt(min, max) },
    { label: 'April', value: getRandomInt(min, max) },
    { label: 'May', value: getRandomInt(min, max) },
  ];

  // Chart Specifications
  const targetId = 'chart';
  const canvasWidth = 600;
  const canvasHeight = 450;

  // Create Chart
  const chart = new BarChart(targetId, canvasWidth, canvasHeight, data);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  // Maximum is exclusive and minimum inclusive
  return Math.floor(Math.random() * (max - min)) + min;
}
