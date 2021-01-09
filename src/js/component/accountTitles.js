import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.scss";

export const accountTitles = () => {
	const { store, actions } = useContext(Context);

	return (
        <ul>
            <li className="account-title statement-header">Statement Date</li>
            <li className="account-title statement-header">Statement Quality</li>
            <li className="account-title"></li>
            <li className="account-title sub-header">ASSETS</li>
            <li className="account-title">Cash</li>
            <li className="account-title">Accounts Receivable</li>
            <li className="account-title sub-account">Raw Materials</li>
            <li className="account-title sub-account">Work in Process</li>
            <li className="account-title sub-account">Finished Goods</li>
            <li className="account-title sub-total">Total Inventory</li>
            <li className="account-title total">Total Current Assets</li>
            <li className="account-title"></li>
            <li className="account-title sub-account">Land</li>
            <li className="account-title sub-account">Construction in Progress</li>
            <li className="account-title sub-account">Buildings</li>
            <li className="account-title sub-account">Machines and Equipment</li>
            <li className="account-title sub-account">Furniture and Fixtures</li>
            <li className="account-title sub-account">Vehicles</li>
            <li className="account-title sub-account">Leasehold Improvements</li>
            <li className="account-title sub-account">Capital Leases</li>
            <li className="account-title sub-account">Other Fixed Asets</li>
            <li className="account-title sub-total">Total Gross Fixed Assets</li>
            <li className="account-title sub-account">Accumulated Depreciation</li>
            <li className="account-title total">Net Fixed Assets</li>
            <li className="account-title"></li>
            <li className="account-title">Other Operating Assets</li>
            <li className="account-title"></li>
            <li className="account-title sub-account">Goodwill</li>
            <li className="account-title sub-account">Other Intangible Assets</li>
            <li className="account-title sub-total">Total Intangible Assets</li>
            <li className="account-title sub-account">Accumulated Amortization</li>
            <li className="account-title total">Net Intangibles</li>
            <li className="account-title"></li>
            <li className="account-title">Other Non-operating Assets</li>
            <li className="account-title total">Total Assets</li>
            <li className="account-title"></li>
            <li className="account-title sub-header">LIABILITIES</li>
            <li className="account-title">ST Debt - Secured</li>
            <li className="account-title">ST Debt - Unsecured</li>
            <li className="account-title">CPLTD - Secured</li>
            <li className="account-title">CPLTD - Unsecured</li>
            <li className="account-title">Other Current Liabilities</li>
            <li className="account-title">Total Current Liabilities</li>
            <li className="account-title"></li>
            <li className="account-title">LTD - Secured</li>
            <li className="account-title">LTD - Unsecured</li>
            <li className="account-title">Other LT Notes Payable</li>
            <li className="account-title">Other Operating Liabilities</li>
            <li className="account-title">Other Non-operating Liabilities</li>
            <li className="account-title">Total Non-current Liabilities</li>
            <li className="account-title">Total Liabilities</li>
            <li className="account-title"></li>
            <li className="account-title sub-header">EQUITY</li>
            <li className="account-title">Common Stock</li>
            <li className="account-title">Additional Paid in Capital</li>
            <li className="account-title">Retained Earnings</li>
            <li className="account-title">Total Equity</li>
            <li className="account-title">Liabilities and Equity</li>
            <li className="account-title"></li>
            <li className="account-title">Tangible Net Worth</li>
            <li className="account-title">Working Capital</li>
            <li className="account-title">Current Ratio</li>
            <li className="account-title">Quick Ratio</li>
            <li className="account-title">Leverage</li>
            <li className="account-title"></li>
            <li className="account-title"></li>
            <li className="account-title sub-header">PROFIT & LOSS</li>
            <li className="account-title">Sales/Revenues</li>
            <li className="account-title">Cost of Goods Sold</li>
            <li className="account-title sub-total">Gross Profit</li>
            <li className="account-title"></li>
            <li className="account-title sub-header">OPERATING EXPENSES</li>
            <li className="account-title">Selling, General & Administrative Expenses</li>
            <li className="account-title">Rent Expense</li>
            <li className="account-title">Depreciation Expense</li>
            <li className="account-title">Amortization Expense</li>
            <li className="account-title">Bad Debt Expense</li>
            <li className="account-title">Other Operating Expenses</li>
            <li className="account-title sub-total">Total Operating Expenses</li>
            <li className="account-title total">Total Operating Profit</li>
            <li className="account-title"></li>
            <li className="account-title subheader">OTHER INCOME/(EXPENSES)</li>
            <li className="account-title">Interest Expense</li>
            <li className="account-title">Interest Income</li>
            <li className="account-title">Other Income/(Expense)</li>
            <li className="account-title sub-total">Total Other Income/(Expenses)</li>
            <li className="account-title total">Total Profit Before Taxes</li>
            <li className="account-title"></li>
            <li className="account-title">Tax Provision</li>
            <li className="account-title"></li>
            <li className="account-title total">Net Income</li>
            <li className="account-title"></li>
            <li className="account-title">Distributions</li>
            <li className="account-title"></li>
            <li className="account-title">EBIDA</li>
            <li className="account-title">EBITDA</li>
            <li className="account-title">EBITDAR</li>
            <li className="account-title"></li>
            <li className="account-title">ROA</li>
            <li className="account-title">ROE</li>
        </ul>
    );
};