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
		const tableColumn = ["ASSETS", "Amount || %"];
		// define an empty array of rows
		const tableRows = [];
		// for each ticket pass all its data into an array
		// store.financials.map((each,i) => {
		let data = ["Statement Date", each.statement_date];
		tableRows.push(data);
		data = ["Quality", each.quality];
		tableRows.push(data);
		data = ["Cash", each.cash];
		tableRows.push(data);
		data = ["Accounts Receivable", each.accounts_receivable];
		tableRows.push(data);
		data = ["Raw Materials", each.raw_materials];
		tableRows.push(data);
		data = ["Work in Process", each.work_in_process];
		tableRows.push(data);
		data = ["Finished Goods", each.finished_goods];
		tableRows.push(data);
		data = ["Total Inventory", each.total_inventory];
		tableRows.push(data);
		data = ["Total Current Assets", each.total_current_assets];
		tableRows.push(data);
		data = ["Land", each.land];
		tableRows.push(data);
		data = ["Construction In Progress", each.construction_in_progress];
		tableRows.push(data);
		data = ["Buildings", each.buildings];
		tableRows.push(data);
		data = ["Machines and Equipment", each.machines_and_equipment];
		tableRows.push(data);
		data = ["Furniture and Fixtures", each.furniture_and_fixtures];
		tableRows.push(data);
		data = ["Vehicles", each.vehicles];
		tableRows.push(data);
		data = ["Leasehold Improvements", each.leasehold_improvements];
		tableRows.push(data);
		data = ["Capital Leases", each.capital_leases];
		tableRows.push(data);
		data = ["Other Fixed Assets", each.other_fixed_assets];
		tableRows.push(data);
		data = ["Total gross Fixed Assets", each.total_gross_fixed_assets];
		tableRows.push(data);
		data = ["Accumulated Depreciation", each.accumulated_depreciation];
		tableRows.push(data);
		data = ["Net Fixed Assets", each.net_fixed_assets];
		tableRows.push(data);
		data = ["Other Operating Assets", each.other_operating_assets];
		tableRows.push(data);
		data = ["Goodwill", each.goodwill];
		tableRows.push(data);
		data = ["Other Intangibles", each.other_intangibles];
		tableRows.push(data);
		data = ["Total Intangibles", each.total_intangibles];
		tableRows.push(data);
		data = ["Accumulated Amortization", each.accumulated_amortization];
		tableRows.push(data);
		data = ["Net Intangibles", each.net_intangibles];
		tableRows.push(data);
		data = ["Other non Operating Assets", each.other_non_operating_assets];
		tableRows.push(data);
		data = ["Total non Current Assets", each.total_non_current_assets];
		tableRows.push(data);
		data = ["Total Assets", each.total_assets];
		tableRows.push(data);
		data = ["Short Term Debt Secured", each.short_term_debt_secured];
		tableRows.push(data);
		data = ["Short Term Debt Unsecured", each.short_term_debt_unsecured];
		tableRows.push(data);
		data = ["Current Portion of Long-Term Debt Secured", each.cpltd_secured];
		tableRows.push(data);
		data = ["Current Portion of Long-Term Debt Unsecured", each.cpltd_unsecured];
		tableRows.push(data);
		data = ["Other Notes Payable", each.other_notes_payable];
		tableRows.push(data);
		data = ["Accounts Payable Trade", each.accounts_payable_trade];
		tableRows.push(data);
		data = ["Other Current Liabilities", each.other_current_liabilities];
		tableRows.push(data);
		data = ["Total Current Liabilities", each.total_current_liabilities];
		tableRows.push(data);
		data = ["Limited Recourse Debt Secured", each.ltd_secured];
		tableRows.push(data);
		data = ["Limited Recourse Debt Unsecured", each.ltd_unsecured];
		tableRows.push(data);
		data = ["Other lt notes payable", each.other_lt_notes_payable];
		tableRows.push(data);
		data = ["Other Operating Liabilities", each.other_operating_liabilities];
		tableRows.push(data);
		data = ["Other non Operating Liabilities", each.other_non_operating_liabilities];
		tableRows.push(data);
		data = ["Total non Current Liabilities", each.total_non_current_liabilities];
		tableRows.push(data);
		data = ["Total Liabilities", each.total_liabilities];
		tableRows.push(data);
		data = ["Common Stock", each.common_stock];
		tableRows.push(data);
		data = ["Additional Paid in Capital", each.additional_paid_in_capital];
		tableRows.push(data);
		data = ["Retained Earnings", each.retained_earnings];
		tableRows.push(data);
		data = ["Total Equity", each.total_equity];
		tableRows.push(data);
		data = ["Liabilities and Equity", each.liabilities_and_equity];
		tableRows.push(data);
		data = ["Tangible Net Worth", each.tangible_net_worth];
		tableRows.push(data);
		data = ["Working Capital", each.working_capital];
		tableRows.push(data);
		data = ["Current Ratio", each.current_ratio];
		tableRows.push(data);
		data = ["Quick Ratio", each.quick_ratio];
		tableRows.push(data);
		data = ["Leverage", each.leverage];
		tableRows.push(data);
		data = ["Total Revenue", each.total_revenue];
		tableRows.push(data);
		data = ["Total COGS", each.total_cogs];
		tableRows.push(data);
		data = ["Gross Profit", each.gross_profit];
		tableRows.push(data);
		data = ["GPM", each.gpm];
		tableRows.push(data);
		data = ["SGA Expenses", each.sga_expenses];
		tableRows.push(data);
		data = ["Rent Expense", each.rent_expense];
		tableRows.push(data);
		data = ["Depreciation Expense", each.depreciation_expense];
		tableRows.push(data);
		data = ["Amortization Expense", each.amortization_expense];
		tableRows.push(data);
		data = ["Dad Debt Expense", each.bad_debt_expense];
		tableRows.push(data);
		data = ["Other Operating Expenses", each.other_operating_expenses];
		tableRows.push(data);
		data = ["Total Operating Expenses", each.total_operating_expenses];
		tableRows.push(data);
		data = ["Total Operating Profit", each.total_operating_profit];
		tableRows.push(data);
		data = ["Operating Profit Margin", each.operating_profit_margin];
		tableRows.push(data);
		data = ["Interest Expense", each.interest_expense];
		tableRows.push(data);
		data = ["Interest Income", each.interest_income];
		tableRows.push(data);
		data = ["Other Income Expense", each.other_income_expense];
		tableRows.push(data);
		data = ["Total Other Income Expense", each.total_other_income_expense];
		tableRows.push(data);
		data = ["Total Profit Before Taxes", each.total_profit_before_taxes];
		tableRows.push(data);
		data = ["Tax Provision", each.tax_provision];
		tableRows.push(data);
		data = ["Net Income", each.net_income];
		tableRows.push(data);
		data = ["Net Profit Margin", each.net_profit_margin];
		tableRows.push(data);
		data = ["Distributions", each.distributions];
		tableRows.push(data);
		data = ["EBIDA", each.ebida];
		tableRows.push(data);
		data = ["EBITDA", each.ebitda];
		tableRows.push(data);
		data = ["ROA", each.roa];
		tableRows.push(data);
		data = ["ROE", each.roe];
		tableRows.push(data);
		// });
		// startY is basically margin-top
		doc.autoTable(tableColumn, tableRows, { startY: 20 });
		const date = Date().split(" ");
		// we use a date string to generate our filename.
		const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
		// ticket title. and margin-top + margin-left
		// doc.text("Closed tickets within the last one month.", 14, 30);
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
	each: PropTypes.object
};
