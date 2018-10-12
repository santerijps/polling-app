let chart = document.getElementById('chart')
let radius = Math.max(chart.offsetWidth / 2.5, 250)
let fontSize = radius === 250 ? 15 : '2em'
var pie = new d3pie("chart", {
	"size": {
		"canvasHeight": radius,
		"canvasWidth": radius,
		"pieOuterRadius": "100%"
	},
	"data": {
		"sortOrder": "value-desc",
		"content": data
	},
	"labels": {
		"outer": {
      "format": "none",
			"pieDistance": 10
		},
		"inner": {
      "hideWhenLessThanPercentage": 1,
      "format": "label-percentage2"
		},
		"mainLabel": {
      "fontSize": fontSize,
      "color": "#ffffff"
		},
		"percentage": {
			"color": "#ffffff",
      "decimalPlaces": 0,
      "fontSize": fontSize
    },
		"value": {
			"color": "#adadad",
			"fontSize": 20
		},
		"lines": {
			"enabled": true
		},
		"truncation": {
			"enabled": true
		}
	},
  "tooltips": {
		"enabled": true,
		"type": "placeholder",
		"string": "{label}: {value} answers, {percentage}%"
	},
	"misc": {
		"gradient": {
			"enabled": false,
			"percentage": 100
		}
	}
});