import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, Redirect } from "react-router-dom";
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
	const [loading, setLoading] = useState(true);
	const { register, handleSubmit } = useForm();
	const [showContact, setShowContact] = useState(false);
	const [showfinancial, setShowfinancial] = useState(false);
	const handleCloseContact = () => setShowContact(false);
	const handleShowContact = () => setShowContact(true);
	const handleCloseFinancial = () => setShowfinancial(false);
	const handleShowFinancial = () => setShowfinancial(true);
	console.log(account);

	const onSubmitFinancial = async data => {
		// const vari = props.data[id];
		// const objectId = vari.properties.OBJECTID;
		// await actions.addProspect(objectId, props.data[id]);
		// history.push(`/prospectDetails/${objectId}`);
	};

	const onSubmitContact = async data => {
		await actions.addContact(data);
		handleCloseContact();
	};

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
										{/* <p>Class Code -- {each.data.properties.CLASSCODE}</p>
										<p>Class Description -- {each.data.properties.CLASSDESC}</p>
										<p>Mail Address -- {each.data.properties.MAILADDR}</p>
										<p>Owner Name -- {each.data.properties.OWNERNAME}</p>
										<p>Phone Number -- {each.data.properties.PHONENO}</p> */}
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
												If you want to add a new contact please clic on the button Add contact.
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
																		{each.data.firstName}
																		&nbsp;
																		{each.data.lastName}
																	</Card.Title>
																	<Card.Text>
																		Phone Number:&nbsp;
																		{each.data.phone}
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
										<Table striped bordered hover size="sm">
											<thead>
												<tr>
													<th />
													<th>2018</th>
													<th>%</th>
													<th>2019</th>
													<th>%</th>
												</tr>
											</thead>

											<tbody>
												<tr>
													<td>Revenues</td>
													<td>xxxxxxxxx</td>
													<td>100.0</td>
													<td>xxxxxxxxx</td>
													<td>100.0</td>
												</tr>

												<tr>
													<td>COGS</td>
													<td>xxxxxxxxx</td>
													<td>100.0</td>
													<td>xxxxxxxxx</td>
													<td>100.0</td>
												</tr>

												<tr>
													<td>Gross Profit</td>
													<td>xxxxxxxxx</td>
													<td>100.0</td>
													<td>xxxxxxxxx</td>
													<td>100.0</td>
												</tr>
												<tr>
													<td>@SG&A</td>
													<td>xxxxxxxxx</td>
													<td>100.0</td>
													<td>xxxxxxxxx</td>
													<td>100.0</td>
												</tr>

												<tr>
													<td>Interest</td>
													<td>xxxxxxxxx</td>
													<td>100.0</td>
													<td>xxxxxxxxx</td>
													<td>100.0</td>
												</tr>

												<tr>
													<td>Depreciation</td>
													<td>xxxxxxxxx</td>
													<td>100.0</td>
													<td>xxxxxxxxx</td>
													<td>100.0</td>
												</tr>

												<tr>
													<td>Amortization</td>
													<td>xxxxxxxxx</td>
													<td>100.0</td>
													<td>xxxxxxxxx</td>
													<td>100.0</td>
												</tr>

												<tr>
													<td>EBITDA</td>
													<td>xxxxxxxxx</td>
													<td>100.0</td>
													<td>xxxxxxxxx</td>
													<td>100.0</td>
												</tr>

												<tr>
													<td>Net Income</td>
													<td>xxxxxxxxx</td>
													<td>100.0</td>
													<td>xxxxxxxxx</td>
													<td>100.0</td>
												</tr>

												<tr>
													<td>Distributions</td>
													<td>xxxxxxxxx</td>
													<td>100.0</td>
													<td>xxxxxxxxx</td>
													<td>100.0</td>
												</tr>
											</tbody>
										</Table>
									</Jumbotron>
									<Row className="justify-content-md-center">
										<Col xs={12} sm={4} md={4}>
											<Image
												src=" https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRA8H-FmoP01FDPRNao8dog2FKtHUWlcgEldg&usqp=CAU"
												fluid
											/>
										</Col>
										<Col xs={12} sm={4} md={4}>
											<Image
												src=" https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRA8H-FmoP01FDPRNao8dog2FKtHUWlcgEldg&usqp=CAU"
												fluid
											/>
										</Col>
									</Row>
								</Tab>
							</Tabs>
							{/*------------> Financial Modal */}
							<Modal
								show={showfinancial}
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
											<Form.Label>Total Revenues</Form.Label>
											<Form.Control size="sm" type="text" placeholder="$" />
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Cost of Goods Sold</Form.Label>
											<Form.Control size="sm" type="text" placeholder="$" />
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Net Income</Form.Label>
											<Form.Control size="sm" type="text" placeholder="$" />
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Interest Expense</Form.Label>
											<Form.Control size="sm" type="text" placeholder="$" />
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Depreciation and Amortization Expense</Form.Label>
											<Form.Control size="sm" type="text" placeholder="$" />
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Total Assets</Form.Label>
											<Form.Control size="sm" type="text" placeholder="$" />
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Total Liabilities</Form.Label>
											<Form.Control size="sm" type="text" placeholder="$" />
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Distributions</Form.Label>
											<Form.Control size="sm" type="text" placeholder="$" />
										</Form.Group>
										<Button variant="secondary" onClick={handleCloseFinancial}>
											Cancel
										</Button>
										<Button variant="success" type="submit">
											Add
										</Button>
									</Form>
								</Modal.Body>
							</Modal>

							{/*------------> Contact Modal */}

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
												name="firstName"
												ref={register}
											/>
										</Form.Group>

										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Last Name</Form.Label>
											<Form.Control
												size="sm"
												type="text"
												placeholder="last name"
												name="lastName"
												ref={register}
											/>
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label>Phone Number</Form.Label>
											<Form.Control
												size="sm"
												type="text"
												placeholder="phone number"
												name="phone"
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
