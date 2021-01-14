// x axis Horizontal Date
// y axis vertical dollar amount
import React, { useEffect, useRef, useState } from "react";
import Chartjs from "chart.js";

const chartConfig = {
	type: "line",
	data: {
		labels: ["2020", "2021", "2022"],
		datasets: [
			{
				label: "2020",
				backgroundColor: "green",
				borderColor: "green",
				data: [1, 2, 4, 5],
				fill: false
			},
			{
				label: "2021",
				backgroundColor: "red",
				borderColor: "red",
				data: [8, 2, 15, 10],
				fill: false
			},
			{
				label: "2022",
				backgroundColor: "black",
				borderColor: "black",
				data: [40, 24, 15, 30],
				fill: false
			}
		]
	},
	options: {
		responsive: true,
		plugins: {
			title: {
				display: true,
				text: "Chart.js Line Chart"
			},
			tooltip: {
				mode: "index",
				intersect: false
			}
		},
		hover: {
			mode: "nearest",
			intersect: true
		},
		scales: {
			x: {
				display: true,
				scaleLabel: {
					display: true,
					labelString: "Years"
				}
			},
			y: {
				display: true,
				scaleLabel: {
					display: true,
					labelString: "Value"
				}
			}
		}
	}
};

const Chart = () => {
	const chartContainer = useRef(null);
	const [chartInstance, setChartInstance] = useState(null);

	useEffect(
		() => {
			if (chartContainer && chartContainer.current) {
				const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
				setChartInstance(newChartInstance);
			}
		},
		[chartContainer]
	);

	const updateDataset = (datasetIndex, newData) => {
		chartInstance.data.datasets[datasetIndex].data = newData;
		chartInstance.update();
	};

	const onButtonClick = () => {
		const data = [7, 8, 9, 10];
		updateDataset(0, data);
	};
	return (
		<div className="mb-3">
			<canvas ref={chartContainer} />
		</div>
	);
};

export default Chart;
