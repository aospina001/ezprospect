import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, Redirect, useHistory } from "react-router-dom";
import Chart from "../component/myChart";
import {
	Container,
	Jumbotron,
	CardDeck,
	Col,
	Card,
	Table,
	FormControl,
	Row,
	Button,
	Modal,
	Form,
	Tab,
	Tabs,
	Alert
} from "react-bootstrap";
import PropTypes from "prop-types";
import { MyMap } from "../component/maps";
import "../../styles/demo.scss";
import { Context } from "../store/appContext";
import { useForm } from "react-hook-form";
import { EditContact } from "../component/editContact";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faUserEdit, faTrashAlt, faEdit, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faPlus, faUserEdit, faTrashAlt, faEdit, faFilePdf);
import { AccountTitles } from "../component/accountTitles";
import { Financial } from "../component/financial";
import { PDF } from "../component/pdf";

export const ProspectDetails = props => {
	const { store, actions } = useContext(Context);
	const history = useHistory();
	const [error, setError] = useState(false);
	const { prospect_id, editContact } = useParams();
	const [showcontacts, setcontacts] = useState(0);
	const [financial, setFinancial] = useState(0);
	const [backCompany, setBack_Company] = useState([]);
	const [backOwner, setBack_Owner] = useState([]);
	const { register, handleSubmit } = useForm();
	const [showContact, setShowContact] = useState(false);
	const [showBack_Company, setShowBack_Company] = useState(false);
	const [showBack_Owner, setShowBack_Owner] = useState(false);
	const [showFinancial, setShowFinancial] = useState(false);
	const [export_var, setExport] = useState(false);

	const handleCloseContact = () => setShowContact(false);
	const handleShowContact = () => setShowContact(true);

	const handleCloseBack_Company = () => setShowBack_Company(false);
	const handleShowBack_Company = () => setShowBack_Company(true);

	const handleCloseBack_Owner = () => setShowBack_Owner(false);
	const handleShowBack_Owner = () => setShowBack_Owner(true);

	const handleCloseFinancial = () => setShowFinancial(false);
	const handleShowFinancial = () => setShowFinancial(true);

	const handleExport = () => setExport(true);

	const onSubmitFinancial = async data => {
		await actions.addFinancial(data, prospect_id);
		setFinancial(Math.random());
		handleCloseFinancial();
	};

	const onSubmitContact = async data => {
		const done = await actions.addContact(data, prospect_id);
		if (done) {
			setError(done);
		} else {
			setError(false);
			setcontacts(Math.random());
			handleCloseContact();
		}
	};

	const deleteContact = async id => {
		await actions.deleteContact(id);
		setcontacts(Math.random());
	};

	const onSubmitBack_Company = async data => {
		const response = await actions.addBackCompany(data, prospect_id);
		setBack_Company(response);
		handleCloseBack_Company();
	};

	const onSubmitBack_Owner = async data => {
		const response = await actions.addBackOwner(data, prospect_id);
		setBack_Owner(response);
		handleCloseBack_Owner();
	};

	const getContacts = async () => {
		await actions.loadContacts(prospect_id);
	};

	const getBack_Company = async () => {
		const response = await actions.loadBackCompany(prospect_id);
		setBack_Company(response);
	};

	const getBack_Owner = async () => {
		const response = await actions.loadBackOwner(prospect_id);
		setBack_Owner(response);
	};

	const getFinancials = async () => {
		await actions.getFinancials(prospect_id);
	};

	useEffect(
		() => {
			getContacts();
		},
		[showcontacts]
	);

	useEffect(
		() => {
			actions.getFinancials(prospect_id);
		},
		[financial]
	);

	useEffect(() => {
		getContacts();
		getBack_Company();
		getBack_Owner();
		getFinancials(prospect_id);
	}, []);

	return (
		<Container className="mt-5">
			{store.token == null ? <Redirect to="/" /> : ""}
			{store.prospect.map((each, i) => {
				if (each.id == prospect_id) {
					return (
						<div>
							<h1>{each.name}</h1>
							<Tabs fill defaultActiveKey={editContact} id="uncontrolled-tab-example" className="mt-5">
								{/* -----------------------------Business Info Tab------------------ */}

								<Tab eventKey="info" title="Business Info">
									<Jumbotron
										style={{ background: "white", border: "border" }}
										className="mt-2 pt-2 pl-0 pr-0">
										<Row className="d-flex align-items-center">
											<Col md={6}>
												<p>
													<b>Address:</b>
													{` ${each.address1}. ${each.city}, ${each.state} ${each.zipCode}`}
												</p>
												<p>
													<b>Account:</b>
													{` ${each.account}`}{" "}
												</p>
												<p>
													<b>Phone Number</b>
													{` ${each.phone_number}`}
												</p>
											</Col>

											<Col md={6}>
												<MyMap lat={parseFloat(each.lat)} lon={parseFloat(each.lon)} />
											</Col>
										</Row>
									</Jumbotron>
								</Tab>

								{/* ----------------------------Contacts Tab------------------ */}

								<Tab eventKey="contacts" title="Contacts" style={{ color: "black" }}>
									<div className="mt-4 ">
										<Link
											data-target="#contact"
											className="ml-3"
											style={{ color: "black" }}
											onClick={handleShowContact}>
											<FontAwesomeIcon icon="plus" className="fa-lg mr-2 align-middle" />
											{` Add Contact`}
										</Link>
									</div>
									{store.contacts.length == 0 ? (
										<Alert variant="success" className="mt-3">
											<Alert.Heading>Sorry, no contact added</Alert.Heading>
											<p>
												If you want to add a new contact please click on the button to add a
												contact.
											</p>
										</Alert>
									) : (
										<div>
											<CardDeck>
												{store.contacts.map((each, i) => {
													return (
														<Col className="mt-5" md={4} key={i}>
															<Card style={{ width: "20rem", height: "18rem" }}>
																<Card.Header as="h5">
																	{each.first_name}
																	&nbsp;
																	{each.last_name}
																	<Link
																		to={`/EditContact/${each.id}/${prospect_id}`}
																		style={{ color: "Black" }}>
																		<div className="float-right">
																			<FontAwesomeIcon
																				icon="user-edit"
																				className="fa-md ml-2 align-middle"
																			/>
																		</div>
																	</Link>
																	<Link
																		className="float-right"
																		style={{ color: "Black" }}>
																		<FontAwesomeIcon
																			onClick={() => deleteContact(each.id)}
																			icon="trash-alt"
																			className="fa-lg md-2 align-middle"
																		/>
																	</Link>
																</Card.Header>
																<Card.Body>
																	<Card.Text>
																		<p>
																			<b>Position:</b>
																			&nbsp;
																			{each.position}
																		</p>
																		<p>
																			<b>Title:</b>
																			&nbsp;
																			{each.title}
																		</p>
																		<p>
																			<b>Phone Number:</b>
																			&nbsp;
																			{each.phone_number}
																		</p>
																		<p>
																			<b>Email:</b>
																			&nbsp;
																			{each.email}
																		</p>
																	</Card.Text>
																</Card.Body>
															</Card>
														</Col>
													);
												})}
											</CardDeck>
										</div>
									)}
								</Tab>

								{/* ----------------------------Background Tab------------------ */}

								<Tab eventKey="background" title="Background">
									<Row>
										<Col md={6}>
											<Jumbotron className="mt-5 px-2 py-2">
												<Card style={{ width: "100%", height: "30rem" }} className="mt-2">
													<Card.Header>
														<h3>Business Background</h3>

														<Link style={{ color: "black" }} className="float-right">
															<FontAwesomeIcon
																onClick={handleShowBack_Company}
																icon="edit"
																className="fa-lg align-middle"
															/>
														</Link>
													</Card.Header>

													<Card.Body style={{ height: "26rem" }}>
														<blockquote className="blockquote mb-0">
															<p className="background">
																{backCompany == "" ? "Empty note" : backCompany.data}

																<footer className="blockquote-footer">
																	Created at{" "}
																	<cite title="Source Title">
																		{backCompany == ""
																			? "No message created yet"
																			: backCompany.date}
																	</cite>
																</footer>
															</p>
														</blockquote>
													</Card.Body>
												</Card>
											</Jumbotron>
										</Col>
										<Col md={6}>
											<Jumbotron className="mt-5 px-2 py-2">
												<Card style={{ width: "100%", height: "30rem" }} className="mt-2">
													<Card.Header>
														<h3>Management/Ownership Background</h3>
														<Link style={{ color: "black" }} className="float-right">
															<FontAwesomeIcon
																onClick={handleShowBack_Owner}
																icon="edit"
																className="fa-lg align-middle"
															/>
														</Link>
													</Card.Header>

													<Card.Body>
														<blockquote className="blockquote mb-0">
															<p className="background">
																{" "}
																{backOwner == "" ? "Empty note" : backOwner.data}{" "}
															</p>
															<footer className="blockquote-footer">
																Created at{" "}
																<cite title="Source Title">
																	{backOwner == ""
																		? "No message created yet"
																		: backOwner.date}
																</cite>
															</footer>
														</blockquote>
													</Card.Body>
												</Card>
											</Jumbotron>
										</Col>
									</Row>
								</Tab>

								{/* -----------------------------Product Tab-------------------- */}

								{/* <Tab eventKey="products" title="Products" /> */}

								{/* ----------------------------Financial Tab------------------ */}

								<Tab eventKey="financial" title="Financial">
									<Jumbotron className="pt-2 pb-2" style={{ background: "white" }}>
										<h1>Financial Information</h1>
										<Button
											className="mr-2"
											variant="success"
											data-target="#financial"
											onClick={handleShowFinancial}>
											Add financial information
										</Button>

										{store.financials.length > 0 && (
											<>
												<PDF />
												<div className="d-flex flex-row flex-nowrap scroll">
													<AccountTitles />
													{store.financials.map((each, i) => {
														return (
															<>
																<Financial each={each} key={each.id} />
															</>
														);
													})}
												</div>
												{store.financials.length > 1 && (
													<Row className="justify-content-md-center">
														<Col xs={10} sm={10} md={10}>
															<Chart />
														</Col>
													</Row>
												)}
											</>
										)}
									</Jumbotron>
								</Tab>
							</Tabs>
							{/*------------> Financial Modal ------------------*/}
							<Modal
								show={showFinancial}
								onHide={handleCloseFinancial}
								id="financial"
								backdrop="static"
								keyboard={false}>
								<Modal.Header closeButton>
									<Modal.Title>Add financial information</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<Form onSubmit={handleSubmit(onSubmitFinancial)}>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Date of Financial Information</Form.Label>
											<Form.Control
												name="statement_date"
												ref={register({ required: true })}
												size="sm"
												type="date"
												placeholder="MM/DD/YYYY"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlSelect1">
											<Form.Label>Select quality of financial data</Form.Label>
											<Form.Control
												name="quality"
												ref={register({ required: true })}
												size="sm"
												as="select">
												<option selected="true" disabled>
													Select Quality
												</option>
												<option value="Unqualified Audit">Unqualified Audit</option>
												<option value="Qualified Audit">Qualified Audit</option>
												<option value="Reviewed">Reviewed</option>
												<option value="Compiled">Compiled</option>
												<option value="Tax Return">Tax Return</option>
												<option value="Management Prepared">Management Prepared</option>
												<option value="Pro forma">Pro forma</option>
											</Form.Control>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Cash</Form.Label>
											<Form.Control
												name="cash"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Accounts Receivable</Form.Label>
											<Form.Control
												name="accounts_receivable"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Raw Materials</Form.Label>
											<Form.Control
												name="raw_materials"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Work in Process</Form.Label>
											<Form.Control
												name="work_in_process"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Finished Goods</Form.Label>
											<Form.Control
												name="finished_goods"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Land</Form.Label>
											<Form.Control
												name="land"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Construction in Progress</Form.Label>
											<Form.Control
												name="construction_in_progress"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Buildings</Form.Label>
											<Form.Control
												name="buildings"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Machines and Equipment</Form.Label>
											<Form.Control
												name="machines_and_equipment"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Furniture and Fixtures</Form.Label>
											<Form.Control
												name="furniture_and_fixtures"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Vehicles</Form.Label>
											<Form.Control
												name="vehicles"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Leasehold Improvements</Form.Label>
											<Form.Control
												name="leasehold_improvements"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Capital Leases</Form.Label>
											<Form.Control
												name="capital_leases"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Other Fixed Assets</Form.Label>
											<Form.Control
												name="other_fixed_assets"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Accumulated Depreciation</Form.Label>
											<Form.Control
												name="accumulated_depreciation"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Other Operating Assets</Form.Label>
											<Form.Control
												name="other_operating_assets"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Goodwill</Form.Label>
											<Form.Control
												name="goodwill"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Other Intangibles</Form.Label>
											<Form.Control
												name="other_intangibles"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Accumulated Amortization</Form.Label>
											<Form.Control
												name="accumulated_amortization"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Other Non-Operating Assets</Form.Label>
											<Form.Control
												name="other_non_operating_assets"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Short Term Debt - Secured</Form.Label>
											<Form.Control
												name="short_term_debt_secured"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Short Term Debt - Unsecured</Form.Label>
											<Form.Control
												name="short_term_debt_unsecured"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>CPLTD - Secured</Form.Label>
											<Form.Control
												name="cpltd_secured"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>CPLTD - Unsecured</Form.Label>
											<Form.Control
												name="cpltd_unsecured"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Other Notes Payable</Form.Label>
											<Form.Control
												name="other_notes_payable"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Accounts Payable - Trade</Form.Label>
											<Form.Control
												name="accounts_payable_trade"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Other Current Liabilities</Form.Label>
											<Form.Control
												name="other_current_liabilities"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>LTD - Secured</Form.Label>
											<Form.Control
												name="ltd_secured"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>LTD - Unsecured</Form.Label>
											<Form.Control
												name="ltd_unsecured"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Other Long-term Notes Payable</Form.Label>
											<Form.Control
												name="other_lt_notes_payable"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Other Operating Liabilities</Form.Label>
											<Form.Control
												name="other_operating_liabilities"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Other Non-operating Liabilities</Form.Label>
											<Form.Control
												name="other_non_operating_liabilities"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Common Stock</Form.Label>
											<Form.Control
												name="common_stock"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Additional Paid in Capital</Form.Label>
											<Form.Control
												name="additional_paid_in_capital"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Retained Earnings</Form.Label>
											<Form.Control
												name="retained_earnings"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										{/* Income Statement Items */}
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Total Revenues</Form.Label>
											<Form.Control
												name="total_revenue"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Cost of Goods Sold</Form.Label>
											<Form.Control
												name="total_cogs"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Selling, General and Administrative Expenses</Form.Label>
											<Form.Control
												name="sga_expenses"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Rent Expense</Form.Label>
											<Form.Control
												name="rent_expense"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Depreciation Expense</Form.Label>
											<Form.Control
												name="depreciation_expense"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Amortization Expense</Form.Label>
											<Form.Control
												name="amortization_expense"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Bad Debt Expense</Form.Label>
											<Form.Control
												name="bad_debt_expense"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Other Operating Expenses</Form.Label>
											<Form.Control
												name="other_operating_expenses"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Interest Expense</Form.Label>
											<Form.Control
												name="interest_expense"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Interest Income</Form.Label>
											<Form.Control
												name="interest_income"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Other Non-operating Income/(Expense)</Form.Label>
											<Form.Control
												name="other_income_expense"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Tax Provision</Form.Label>
											<Form.Control
												name="tax_provision"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Distributions</Form.Label>
											<Form.Control
												name="distributions"
												ref={register}
												size="sm"
												type="text"
												placeholder="$"
											/>
										</Form.Group>
										<Button className="mr-2" variant="secondary" onClick={handleCloseFinancial}>
											Cancel
										</Button>
										<Button variant="success" type="submit">
											Add
										</Button>
									</Form>
								</Modal.Body>
							</Modal>
							{/*------------> Contact Modal ------------------------*/}
							<Modal
								show={showContact}
								onHide={handleCloseContact}
								id="contact"
								backdrop="static"
								keyboard={false}>
								<Modal.Header closeButton>
									<Modal.Title>Contact Information</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									{error ? <Alert variant="danger">{error}</Alert> : ""}
									<Form onSubmit={handleSubmit(onSubmitContact)}>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>First Name</Form.Label>
											<Form.Control
												size="sm"
												type="text"
												placeholder="first name"
												name="first_name"
												ref={register({ required: true })}
											/>
										</Form.Group>

										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Last Name</Form.Label>
											<Form.Control
												size="sm"
												type="text"
												placeholder="last name"
												name="last_name"
												ref={register({ required: true })}
											/>
										</Form.Group>

										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Position</Form.Label>
											<Form.Control
												size="sm"
												type="text"
												placeholder="Position"
												name="position"
												ref={register}
											/>
										</Form.Group>

										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Title</Form.Label>
											<Form.Control
												size="sm"
												type="text"
												placeholder="Title"
												name="title"
												ref={register}
											/>
										</Form.Group>

										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Email</Form.Label>
											<Form.Control
												size="sm"
												type="email"
												placeholder="Email"
												name="email"
												ref={register}
											/>
										</Form.Group>

										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Phone Number</Form.Label>
											<Form.Control
												size="sm"
												type="text"
												placeholder="phone number"
												name="phone_number"
												ref={register({ required: true })}
											/>
										</Form.Group>

										<Button variant="secondary" onClick={handleCloseContact}>
											Cancel
										</Button>
										<Button variant="success" type="submit" className="ml-2">
											Add
										</Button>
									</Form>
								</Modal.Body>
							</Modal>
							{/*------------> Background Company Modal ------------------------*/}
							<Modal
								show={showBack_Company}
								onHide={handleCloseBack_Company}
								id="background_company"
								backdrop="static"
								keyboard={false}>
								<Modal.Header closeButton>
									<Modal.Title>Background Information</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<Form onSubmit={handleSubmit(onSubmitBack_Company)}>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Control
												style={{ height: "30rem" }}
												as="textarea"
												name="data"
												ref={register}
												className="background">
												{backCompany == "" ? "" : backCompany.data}
											</Form.Control>
										</Form.Group>

										<Button variant="secondary" onClick={handleCloseBack_Company}>
											Cancel
										</Button>
										<Button variant="success" type="submit" className="ml-2">
											Add
										</Button>
									</Form>
								</Modal.Body>
							</Modal>
							{/*------------> Background Owner Modal ------------------------*/}
							<Modal
								show={showBack_Owner}
								onHide={handleCloseBack_Owner}
								id="background_company"
								backdrop="static"
								keyboard={false}>
								<Modal.Header closeButton>
									<Modal.Title>Background Information</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<Form onSubmit={handleSubmit(onSubmitBack_Owner)}>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Background information</Form.Label>
											<Form.Control
												as="textarea"
												name="data"
												ref={register}
												className="background">
												{backOwner == "" ? "" : backOwner.data}
											</Form.Control>
										</Form.Group>

										<Button variant="secondary" onClick={handleCloseBack_Owner}>
											Cancel
										</Button>
										<Button variant="success" type="submit">
											Add
										</Button>
									</Form>
								</Modal.Body>
							</Modal>
						</div>
					);
				}
			})}
		</Container>
	);
};

ProspectDetails.propTypes = {
	data: PropTypes.any
};
