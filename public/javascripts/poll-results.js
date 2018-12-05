(function() {
	let chart = document.getElementById('chart')

	// on smaller screens, make the chart radius 250px,
	// also make font size smaller
	let radius = Math.max(chart.offsetWidth / 2.5, 250)
	let fontSize = radius === 250 ? 15 : '2em'

	// set colors for each option
	const colors = ['#cead8b', '#cc965f', '#fdb200', '#c9a07d', '#d0b1ad']
	function setColors(options) {
		return options.map((d, i) => {
			if(i < colors.length) {
				d.color = colors[i]
			} else {
				d.color = colors[Math.random() * colors.length]
			}
			return d
		})
	}
	data = setColors(data)

	// build the pie chart
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
			"string": "{value} answer(s)"
		},
		"misc": {
			"gradient": {
				"enabled": false,
				"percentage": 100
			}
		}
	})

	var description  = document.getElementById('description')
	const pollNumber = window.location.pathname.split('/')[2]
	const requestUrl = `/api/polls/${pollNumber}`

	// fetches result data
	function fetchResults() {
		fetch(requestUrl)
			.then(r => r.json())
			.then(results => {
				if(results !== null) {
					if(results.answerCount > answerCount) {
						answerCount = results.answerCount
						let options = results.options.map(o => {
							o.value = o.count
							return o
						})
						options = setColors(options)
						pie.updateProp('data.content', options)
						description.innerText = `Totaling at ${answerCount} answers`
					}
				}
			})
			.catch(e => console.warn(`Failed to fetch new results, try refreshing the page instead\n${e}`))
	}

	// keeps fetching new results
	function resultUpdater() {
		setTimeout(() => {
			fetchResults()
			resultUpdater()
		}, 5000);
	}

	resultUpdater()
})()