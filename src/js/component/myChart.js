// x axis Horizontal Date
// y axis vertical dollar amount
import React, { useEffect, useRef, useState, useContext } from "react";
import Chartjs from "chart.js";
import { Context } from "../store/appContext";

const Chart = () => {
	const chartContainer = useRef(null);
	const [chartInstance, setChartInstance] = useState(null);
	const [labels_chart, setLabels_chart] = useState([]);
	const [data_chart, setData_chart] = useState([]);
	const { store, actions } = useContext(Context);

	let labelschart = [];
	let datachart = [];

	useEffect(
		() => {
			if (chartContainer && chartContainer.current) {
				const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
				setChartInstance(newChartInstance);
			}
		},
		[store.financials.length]
	);

	store.financials.map((each, i) => {
		labelschart[i] = each.statement_date;
		datachart[i] = parseFloat(each.total_revenue.replace(/,/g, ""));
	});

	const chartConfig = {
		type: "line",
		data: {
			labels: labelschart, //names on the x line when I gonna create a point it has to be the same number of data in data[]
			datasets: [
				{
					label: "Total Revenue",
					backgroundColor: "green",
					borderColor: "green",
					data: datachart,
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

	return (
		<div className="mb-3">
			<canvas ref={chartContainer} />
		</div>
	);
};

export default Chart;
//    useEffect(
// 		() => {
// 			updateDataset(0, data);
// 		},
// 		[labels_chart]
//     );
// 		const data = [7, 8, 9, 10];

// const updateDataset = (datasetIndex, newData) => {
// 	chartInstance.data.datasets[datasetIndex].data = newData;
// 	chartInstance.update();
// };
