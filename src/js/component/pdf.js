import { AccountTitles } from "./accountTitles";
import React, { Component, useEffect } from "react";
import { Financial } from "./financial";
import { useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

import { format } from "date-fns";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button } from "react-bootstrap";

const ref = React.createRef();

export const PDF = () => {
	const { store, actions } = useContext(Context);
	let file_name = "";

	const generatePDF = () => {
		// initialize jsPDF
		const doc = new jsPDF();
		// define the columns we want and their titles
		const tableColumn = ["Id", "Title"];
		// define an empty array of rows
		const tableRows = [];
		// for each ticket pass all its data into an array
		store.financials.map(each => {
			console.log(each);
			let data = ["Statement Date", each.statement_date];
			tableRows.push(data);
			data = ["Quality", each.quality];

			tableRows.push(data);
		});
		// startY is basically margin-top
		doc.autoTable(tableColumn, tableRows, { startY: 20 });
		const date = Date().split(" ");
		// we use a date string to generate our filename.
		const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
		// ticket title. and margin-top + margin-left
		doc.text("Closed tickets within the last one month.", 14, 15);
		// we define the name of our PDF file.
		doc.save(`report_${dateStr}.pdf`);
	};

	return (
		<>
			<Button onClick={() => generatePDF()}>Download PDF</Button>
		</>
	);
};
PDF.propTypes = {
	prospect_id: PropTypes.any
};
