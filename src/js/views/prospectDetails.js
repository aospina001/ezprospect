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

export const ProspectDetails = props => {
	const { store, actions } = useContext(Context);
	const history = useHistory();
	const { prospect_id, editContact } = useParams();
	const [showcontacts, setcontacts] = useState(0);
	const [backCompany, setBack_Company] = useState([]);
	const [backOwner, setBack_Owner] = useState([]);

	// useEffect(
	// 	() => {
	// 		return history.listen(location => {
	// 			console.log(`You changed the page to: ${location.pathname}`);
	// 		});
	// 	},
	// 	[history]// );

	const { register, handleSubmit } = useForm();
	const [showContact, setShowContact] = useState(false);
	const [showEditContact, setShow_EditContact] = useState(false);
	const [showBack_Company, setShowBack_Company] = useState(false);
	const [showBack_Owner, setShowBack_Owner] = useState(false);
	const [showFinancial, setShowFinancial] = useState(false);
	const [showFinancials, setFinancials] = useState(0);

	const handleCloseContact = () => setShowContact(false);
	const handleShowContact = () => setShowContact(true);

	const handleClose_EditContact = () => setShow_EditContact(false);
	const handleShow_EditContact = () => setShow_EditContact(true);

	const handleCloseBack_Company = () => setShowBack_Company(false);
	const handleShowBack_Company = () => setShowBack_Company(true);

	const handleCloseBack_Owner = () => setShowBack_Owner(false);
	const handleShowBack_Owner = () => setShowBack_Owner(true);

	const handleCloseFinancial = () => setShowFinancial(false);
	const handleShowFinancial = () => setShowFinancial(true);

	const onSubmitFinancial = async data => {
		// const vari = props.data[id];
		// const objectId = vari.properties.OBJECTID;
		// await actions.addProspect(objectId, props.data[id]);
		// history.push(`/prospectDetails/${objectId}`);
		await actions.addFinancial(data);
		handleCloseFinancial();
	};

	const onSubmitContact = async data => {
		await actions.addContact(data, prospect_id);
		setcontacts(Math.random());
		handleCloseContact();
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

	const passContactID = data => {
		setContactInfo(data);
		handleShow_EditContact();
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

	useEffect(
		() => {
			getContacts();
		},
		[showcontacts]
	);

	useEffect(() => {
		getContacts();
		getBack_Company();
		getBack_Owner();
	}, []);

	return (
		<Container className="mt-5">
			{store.token == null ? <Redirect to="/" /> : ""}
			{store.prospect.map((each, i) => {
				if (each.id == prospect_id) {
					return (
						<div>
							<Tabs fill defaultActiveKey={editContact} id="uncontrolled-tab-example">
								{/* -----------------------------Business Info Tab------------------ */}

								<Tab eventKey="info" title="Business Info">
									<Jumbotron style={{ background: "white" }} className="mt-2">
										<Row>
											<Col md={6}>
												<h1>{each.name}</h1>
												<p>Address -- {each.address1}</p>
												<p>Account -- {each.account}</p>
												<p>Account -- {each.phone_number}</p>
											</Col>

											<Col md={6}>
												<MyMap lat={parseFloat(each.lat)} lon={parseFloat(each.lon)} />
											</Col>
										</Row>
									</Jumbotron>
								</Tab>

								{/* ----------------------------Contacts Tab------------------ */}

								<Tab eventKey="contacts" title="Contacts">
									<Button
										variant="success"
										data-target="#contact"
										onClick={handleShowContact}
										className="mt-3 ml-3">
										Add Contact
									</Button>
									{store.contacts.length == 0 ? (
										<Alert variant="success" className="mt-2">
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
															<Card>
																<Card.Header as="h5">
																	{each.first_name}
																	&nbsp;
																	{each.last_name}
																	<Link to={`/EditContact/${each.id}/${prospect_id}`}>
																		<Button variant="dark" className="float-right">
																			{" "}
																			Edit
																		</Button>
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
												<Card style={{ width: "100%" }} className="mt-2">
													<Card.Header>
														Company
														<Button
															onClick={handleShowBack_Company}
															className="float-right">
															Edit
														</Button>
													</Card.Header>

													<Card.Body>
														<blockquote className="blockquote mb-0">
															<p> {backCompany == "" ? "Not note" : backCompany.data} </p>
															<footer className="blockquote-footer">
																Created at{" "}
																<cite title="Source Title">
																	{backCompany == ""
																		? "No message created yet"
																		: backCompany.date}
																</cite>
															</footer>
														</blockquote>
													</Card.Body>
												</Card>
											</Jumbotron>
										</Col>
										<Col md={6}>
											<Jumbotron className="mt-5 px-2 py-2">
												<Card style={{ width: "100%" }} className="mt-2">
													<Card.Header>
														Owner
														<Button onClick={handleShowBack_Owner} className="float-right">
															Edit
														</Button>
													</Card.Header>

													<Card.Body>
														<blockquote className="blockquote mb-0">
															<p> {backOwner == "" ? "No note" : backOwner.data} </p>
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

								<Tab eventKey="products" title="Products" />

								{/* ----------------------------Financial Tab------------------ */}

								<Tab eventKey="financial" title="Financial">
									<Jumbotron style={{ background: "white" }}>
										<h1>Financial Information</h1>
										<Button
											variant="success"
											data-target="#financial"
											onClick={handleShowFinancial}>
											Add financial information
										</Button>
										<div>
											<Table striped bordered hover size="sm">
												{store.financials.map((each, i) => {
													return (
														<div key={each.id}>
															<thead>
																<tr>
																	<th />
																	<th>{each.statement_date}</th>
																	<th>%</th>
																</tr>
															</thead>

															<tbody>
																<tr>
																	<td>Revenues</td>
																	<td>xxxxxxxxx</td>
																	<td>100.0</td>
																</tr>

																<tr>
																	<td>COGS</td>
																	<td>xxxxxxxxx</td>
																	<td>100.0</td>
																</tr>

																<tr>
																	<td>Gross Profit</td>
																	<td>xxxxxxxxx</td>
																	<td>100.0</td>
																</tr>
																<tr>
																	<td>@SG&A</td>
																	<td>xxxxxxxxx</td>
																	<td>100.0</td>
																</tr>

																<tr>
																	<td>Interest</td>
																	<td>xxxxxxxxx</td>
																	<td>100.0</td>
																</tr>

																<tr>
																	<td>Depreciation</td>
																	<td>xxxxxxxxx</td>
																	<td>100.0</td>
																</tr>

																<tr>
																	<td>Amortization</td>
																	<td>xxxxxxxxx</td>
																	<td>100.0</td>
																</tr>

																<tr>
																	<td>EBITDA</td>
																	<td>xxxxxxxxx</td>
																	<td>100.0</td>
																</tr>

																<tr>
																	<td>Net Income</td>
																	<td>xxxxxxxxx</td>
																	<td>100.0</td>
																</tr>

																<tr>
																	<td>Distributions</td>
																	<td>xxxxxxxxx</td>
																	<td>100.0</td>
																</tr>
															</tbody>
														</div>
													);
												})}
											</Table>
										</div>
									</Jumbotron>
									<Row className="justify-content-md-center">
										<Col xs={10} sm={10} md={10}>
											<Chart />
										</Col>
									</Row>
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
											<Form.Control size="sm" type="text" placeholder="MM/DD/YYYY" />
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlSelect1">
											<Form.Label>FYE Month</Form.Label>
											<Form.Control size="sm" as="select">
												<option>Select a month</option>
												<option>January</option>
												<option>February</option>
												<option>March</option>
												<option>April</option>
												<option>May</option>
												<option>June</option>
												<option>July</option>
												<option>August</option>
												<option>September</option>
												<option>October</option>
												<option>November</option>
												<option>December</option>
											</Form.Control>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlSelect1">
											<Form.Label>Select quality of financial data</Form.Label>
											<Form.Control size="sm" as="select">
												<option>Select Quality</option>
												<option>Unqualified Audit</option>
												<option>Qualified Audit</option>
												<option>Reviewed</option>
												<option>Compiled</option>
												<option>Tax Return</option>
												<option>Management Prepared</option>
												<option>Pro forma</option>
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
												name="other_non_operating_income_expense"
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

										{/* <Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Net Income</Form.Label>
											<Form.Control size="sm" type="text" placeholder="$" />
										</Form.Group> */}

										{/* <Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Total Assets</Form.Label>
											<Form.Control size="sm" type="text" placeholder="$" />
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Total Liabilities</Form.Label>
											<Form.Control size="sm" type="text" placeholder="$" />
										</Form.Group> */}
										<Button variant="secondary" onClick={handleCloseFinancial}>
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
									<Form onSubmit={handleSubmit(onSubmitContact)}>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>First Name</Form.Label>
											<Form.Control
												size="sm"
												type="text"
												placeholder="first name"
												name="first_name"
												ref={register}
											/>
										</Form.Group>

										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Last Name</Form.Label>
											<Form.Control
												size="sm"
												type="text"
												placeholder="last name"
												name="last_name"
												ref={register}
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
												ref={register}
											/>
										</Form.Group>

										<Button variant="secondary" onClick={handleCloseContact}>
											Cancel
										</Button>
										<Button variant="success" type="submit">
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
											<Form.Label>Background information</Form.Label>
											<Form.Control as="textarea" name="data" ref={register}>
												{backCompany == "" ? "" : backCompany.data}
											</Form.Control>
										</Form.Group>

										<Button variant="secondary" onClick={handleCloseBack_Company}>
											Cancel
										</Button>
										<Button variant="success" type="submit">
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
											<Form.Control as="textarea" name="data" ref={register}>
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
