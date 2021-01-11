import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, Redirect } from "react-router-dom";
import Chart from "../component/myChart";
import {
	Container,
	Jumbotron,
	CardDeck,
	Col,
	Card,
	Table,
	Image,
	Row,
	Button,
	Modal,
	Form,
	Tab,
	Tabs,
	Alert
} from "react-bootstrap";
import PropTypes from "prop-types";
import "../../styles/demo.scss";
import { Context } from "../store/appContext";
import { useForm } from "react-hook-form";

export const ProspectDetails = props => {
	const { store, actions } = useContext(Context);
	const { account } = useParams();
	const { register, handleSubmit } = useForm();
	const [showContact, setShowContact] = useState(false);
	const [showFinancial, setShowFinancial] = useState(false);
	const [showcontacts, setcontacts] = useState(0);
	const [showFinancials, setFinancials] = useState(0);
	const handleCloseContact = () => setShowContact(false);
	const handleShowContact = () => setShowContact(true);
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
		console.log("adding contact");
		await actions.addContact(data, account);
		setcontacts(Math.random());
		handleCloseContact();
	};

	const getContacts = async () => {
		await actions.loadContacts();
		console.log(store.contacts);
	};

	useEffect(
		() => {
			getContacts();
		},
		[showcontacts]
	);

	useEffect(() => {
		getContacts();
	}, []);

	return (
		<Container className="mt-5">
			{store.token == null ? <Redirect to="/" /> : ""}
			{store.prospect.map((each, i) => {
				if (each.account == account) {
					return (
						<div>
							<Tabs fill defaultActiveKey="info" id="uncontrolled-tab-example">
								<Tab eventKey="info" title="Business Info">
									<Jumbotron style={{ background: "white" }} className="mt-2">
										<h1>{each.name}</h1>
										<p>Address -- {each.address1}</p>
										<p>Account -- {each.account}</p>
										<p>Account -- {each.phone_number}</p>
									</Jumbotron>
								</Tab>

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
																<Card.Body>
																	<Card.Title>
																		{each.first_name}
																		&nbsp;
																		{each.last_name}
																	</Card.Title>
																	<Card.Text>
																		Phone Number:&nbsp;
																		{each.phone_number}
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

								<Tab eventKey="background" title="Background" />
								<Tab eventKey="products" title="Products" />

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
										{/* <Form.Group controlId="exampleForm.ControlSelect1">
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
										</Form.Group> */}
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

							{/* <Button variant="secondary" onClick={save}>
								Done
							</Button> */}
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
