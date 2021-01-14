import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Button } from "react-bootstrap";
import "../../styles/index.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faUserEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

export const Financial = ({ each }) => {
	const { store, actions } = useContext(Context);
	const [financial, setFinancial] = useState(0);

	const deleteFinancial = async (id, prospect_id) => {
		await actions.deleteFinancial(id);
		setFinancial(Math.random());
	};

	useEffect(
		() => {
			actions.getFinancials(each.prospect_id);
		},
		[financial]
	);

	return (
		<div className="financial d-flex flex-nowrap row">
			<ul className="financial-col left">
				<li className="account-value-item statement-header">{each.statement_date}</li>
				<li className="account-value-item statement-header">{each.quality}</li>
				<li className="account-value-item" />
				<li className="account-value-item sub-header" />
				<li className="account-value-item">{each.cash}</li>
				<li className="account-value-item">{each.accounts_receivable}</li>
				<li className="account-value-item sub-account">{each.raw_materials}</li>
				<li className="account-value-item sub-account">{each.work_in_process}</li>
				<li className="account-value-item sub-account">{each.finished_goods}</li>
				<li className="account-value-item sub-total">{each.total_inventory}</li>
				<li className="account-value-item total">{each.total_current_assets}</li>
				<li className="account-value-item" />
				<li className="account-value-item sub-account">{each.land}</li>
				<li className="account-value-item sub-account">{each.construction_in_progress}</li>
				<li className="account-value-item sub-account">{each.buildings}</li>
				<li className="account-value-item sub-account">{each.machines_and_equipment}</li>
				<li className="account-value-item sub-account">{each.furniture_and_fixtures}</li>
				<li className="account-value-item sub-account">{each.vehicles}</li>
				<li className="account-value-item sub-account">{each.leasehold_improvements}</li>
				<li className="account-value-item sub-account">{each.capital_leases}</li>
				<li className="account-value-item sub-account">{each.other_fixed_assets}</li>
				<li className="account-value-item sub-total">{each.total_gross_fixed_assets}</li>
				<li className="account-value-item sub-account sub-total">{each.accumulated_depreciation}</li>
				<li className="account-value-item total">{each.net_fixed_assets}</li>
				<li className="account-value-item" />
				<li className="account-value-item">{each.other_operating_assets}</li>
				<li className="account-value-item" />
				<li className="account-value-item sub-account">{each.goodwill}</li>
				<li className="account-value-item sub-account">{each.other_intangibles}</li>
				<li className="account-value-item sub-total">{each.total_intangibles}</li>
				<li className="account-value-item sub-account">{each.accumulated_amortization}</li>
				<li className="account-value-item total">{each.net_intangibles}</li>
				<li className="account-value-item" />
				<li className="account-value-item">{each.other_non_operating_assets}</li>
				<li className="account-value-item sub-total">{each.total_non_current_assets}</li>
				<li className="account-value-item total">{each.total_assets}</li>
				<li className="account-value-item" />
				<li className="account-value-item sub-header" />
				<li className="account-value-item">{each.short_term_debt_secured}</li>
				<li className="account-value-item">{each.short_term_debt_unsecured}</li>
				<li className="account-value-item">{each.cpltd_secured}</li>
				<li className="account-value-item">{each.cpltd_unsecured}</li>
				<li className="account-value-item">{each.other_notes_payable}</li>
				<li className="account-value-item">{each.accounts_payable_trade}</li>
				<li className="account-value-item">{each.other_current_liabilities}</li>
				<li className="account-value-item sub-total">{each.total_current_liabilities}</li>
				<li className="account-value-item" />
				<li className="account-value-item">{each.ltd_secured}</li>
				<li className="account-value-item">{each.ltd_unsecured}</li>
				<li className="account-value-item">{each.other_lt_notes_payable}</li>
				<li className="account-value-item">{each.other_operating_liabilities}</li>
				<li className="account-value-item">{each.other_non_operating_liabilities}</li>
				<li className="account-value-item sub-total">{each.total_non_current_liabilities}</li>
				<li className="account-value-item total">{each.total_liabilities}</li>
				<li className="account-value-item" />
				<li className="account-value-item sub-header" />
				<li className="account-value-item">{each.common_stock}</li>
				<li className="account-value-item">{each.additional_paid_in_capital}</li>
				<li className="account-value-item">{each.retained_earnings}</li>
				<li className="account-value-item sub-total">{each.total_equity}</li>
				<li className="account-value-item total">{each.liabilities_and_equity}</li>
				<li className="account-value-item" />
				<li className="account-value-item">{each.tangible_net_worth}</li>
				<li className="account-value-item">{each.working_capital}</li>
				<li className="account-value-item">{each.current_ratio}</li>
				<li className="account-value-item">{each.quick_ratio}</li>
				<li className="account-value-item">{each.leverage}</li>
				<li className="account-value-item" />
				<li className="account-value-item" />
				<li className="account-value-item sub-header" />
				<li className="account-value-item">{each.total_revenue}</li>
				<li className="account-value-item">{each.total_cogs}</li>
				<li className="account-value-item sub-total">{each.gross_profit}</li>
				<li className="account-value-item" />
				<li className="account-value-item sub-header" />
				<li className="account-value-item">{each.sga_expenses}</li>
				<li className="account-value-item">{each.rent_expense}</li>
				<li className="account-value-item">{each.depreciation_expense}</li>
				<li className="account-value-item">{each.amortization_expense}</li>
				<li className="account-value-item">{each.bad_debt_expense}</li>
				<li className="account-value-item">{each.other_operating_expenses}</li>
				<li className="account-value-item sub-total">{each.total_operating_expenses}</li>
				<li className="account-value-item total">{each.total_operating_profit}</li>
				<li className="account-value-item" />
				<li className="account-value-item subheader" />
				<li className="account-value-item">{each.interest_expense}</li>
				<li className="account-value-item">{each.interest_income}</li>
				<li className="account-value-item">{each.other_income_expense}</li>
				<li className="account-value-item sub-total">{each.total_other_income_expense}</li>
				<li className="account-value-item total">{each.total_profit_before_taxes}</li>
				<li className="account-value-item" />
				<li className="account-value-item">{each.tax_provision}</li>
				<li className="account-value-item" />
				<li className="account-value-item total">{each.net_income}</li>
				<li className="account-value-item" />
				<li className="account-value-item">{each.distributions}</li>
				<li className="account-value-item" />
				<li className="account-value-item">{each.ebida}</li>
				<li className="account-value-item">{each.ebitda}</li>
				<li className="account-value-item">{each.ebitdar}</li>
				<li className="account-value-item" />
				<li className="account-value-item">{each.roa}</li>
				<li className="account-value-item">{each.roe}</li>
			</ul>
			<ul className="financial-col right">
				<li className="statement-header">
					<Link className="float-right" style={{ color: "black" }}>
						<FontAwesomeIcon
							icon="trash-alt"
							className="fa-md md-2 align-middle"
							onClick={() => {
								deleteFinancial(each.id, each.prospect_id);
							}}
						/>
					</Link>
				</li>
				<li className="statement-header" />
				<li className="margin-item" />
				<li className="margin-item sub-header">%</li>
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item sub-account" />
				<li className="margin-item sub-account" />
				<li className="margin-item sub-account" />
				<li className="margin-item sub-total" />
				<li className="margin-item total" />
				<li className="margin-item" />
				<li className="margin-item sub-account" />
				<li className="margin-item sub-account" />
				<li className="margin-item sub-account" />
				<li className="margin-item sub-account" />
				<li className="margin-item sub-account" />
				<li className="margin-item sub-account" />
				<li className="margin-item sub-account" />
				<li className="margin-item sub-account" />
				<li className="margin-item sub-account" />
				<li className="margin-item sub-total" />
				<li className="margin-item sub-account sub-total" />
				<li className="margin-item total" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item sub-account" />
				<li className="margin-item sub-account" />
				<li className="margin-item sub-total" />
				<li className="margin-item sub-account" />
				<li className="margin-item total" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item sub-total" />
				<li className="margin-item total" />
				<li className="margin-item" />
				<li className="margin-item sub-header" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item sub-total" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item sub-total" />
				<li className="margin-item total" />
				<li className="margin-item" />
				<li className="margin-item sub-header" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item sub-total" />
				<li className="margin-item total" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item sub-header" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item sub-total">{each.gpm}</li>
				<li className="margin-item" />
				<li className="margin-item sub-header" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item sub-total" />
				<li className="margin-item total">{each.operating_profit_margin}</li>
				<li className="margin-item" />
				<li className="margin-item subheader" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item sub-total" />
				<li className="margin-item total" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item total">{each.net_profit_margin}</li>
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item" />
				<li className="margin-item" />
			</ul>
		</div>
	);
};
Financial.propTypes = {
	each: PropTypes.object
};
