# bar-js
Lightweight, configurable and simple bar chart library in Javascript

[![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg)]()
[![Codacy grade](https://img.shields.io/codacy/grade/e27821fb6289410b8f58338c7e0bc686.svg)]()

## Description
bar.js is Canvas based simple Javascript Bar Chart Library to provide configurable, lightweight and dependency-free experience.

![](https://github.com/MarlonT96/bar-js/blob/main/bar.png)

## Instalation
Download the `bar.min.js` and include it in your project

```html
<script src="bar.min.js"></script>
```

## Usage
To create the bar chart, you need a block level container like a div or p.

```html
<div id="chart">This will be bar chart!</div>
```

Then you can create the BarChart object in your Javascript file

```js
var barChart = new BarChart(chartId, chartWidth, chartHeight, data);
```
### Parameters
- `chartId - containerId (String)`
Defines the id of container like "chart"

- `chartWidth - (Integer)`
Defines the width of chart like 500

- `chartHeight - (Integer)`
Defines the height of chart like 400

- `data - (Objects Array)`
Defines the data objects. The objects should have 2 key-value pairs: label and value. Example data:

```js
var data = [
    { label: 'Jan', value: 123 },
    { label: 'Feb', value: 162 },
    { label: 'March', value: 96 },
    { label: 'April', value: 110 },
    { label: 'May', value: 181 },
  ];

```
## License
[MIT](LICENSE.md) © [Marlon Torres](https://github.com/MarlonT96)
