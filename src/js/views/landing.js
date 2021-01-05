import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Jumbotron, Container, Form, Alert, Button, ButtonToolbar, Col, Card } from "react-bootstrap";
import CardDeck from "react-bootstrap/CardDeck";
import Carousel from "react-bootstrap/Carousel";
import "../../styles/home.scss";
import { Link, Redirect } from "react-router-dom";
import { Context } from "../store/appContext";
import { useForm } from "react-hook-form";
import Featured1 from "../../img/featured1.png";
import Featured2 from "../../img/featured2.png";
import Featured3 from "../../img/featured3.png";
import Featured4 from "../../img/featured4.png";

export const Landing = () => {
	const [show, setShow] = useState(false);
	const [error, setError] = useState(false);
	const { store, actions } = useContext(Context);
	const [organizations, setOrganizations] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const { register, handleSubmit } = useForm();
	const [index, setIndex] = useState(0); //Hook for controlled carousel
	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	}; //For controlled carousel

	useEffect(() => {
		if (organizations == false) getOrganizations();
	}, []);

	const getOrganizations = async () => {
		await actions.loadOrganizations();
		setOrganizations(true);
	};

	const onSubmit = async data => {
		const done = await actions.signup(data);
		if (done) {
			setError(done);
		} else setError(false);
	};

	return (
		<div>
			<Jumbotron className="top-landing">
				{store.token != null ? <Redirect to="/logged" /> : ""}
				<Container className="text-center">
					<h1>Welcome to EZ Prospect</h1>
					<p className="intro">
						EZ Prospect is a new innovative application that allows financial sales representatives to
						source, manage and streamline business prospects into client status. Presently this application
						is only servicing Miami-Dade County. Other counties coming soon!
					</p>
					<p className="intro">
						<Button variant="dark outline-success" onClick={handleShow}>
							Sign up
						</Button>
						<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
							<Modal.Header closeButton>
								<Modal.Title>EZ Prospect Sign-up</Modal.Title>
							</Modal.Header>
							<Form onSubmit={handleSubmit(onSubmit)}>
								<Modal.Body>
									{error ? <Alert variant="danger">{error}</Alert> : ""}
									<Form.Group>
										<Form.Row>
											<Form.Group as={Col}>
												<Form.Label>Email</Form.Label>
												<Form.Control
													type="email"
													placeholder="Enter email"
													name="email"
													ref={register}
												/>
											</Form.Group>

											<Form.Group as={Col}>
												<Form.Label>Password</Form.Label>
												<Form.Control
													type="password"
													placeholder="Password"
													name="password"
													ref={register}
												/>
											</Form.Group>
										</Form.Row>

										<Form.Row>
											<Form.Group as={Col}>
												<Form.Label>First Name</Form.Label>
												<Form.Control
													placeholder="First Name"
													name="first_name"
													ref={register}
												/>
											</Form.Group>

											<Form.Group as={Col}>
												<Form.Label>Last Name</Form.Label>
												<Form.Control placeholder="Last Name" name="last_name" ref={register} />
											</Form.Group>
										</Form.Row>

										<Form.Row>
											<Form.Group as={Col}>
												<Form.Label>Phone Number</Form.Label>
												<Form.Control
													placeholder="Phone Number"
													name="phone_number"
													ref={register}
												/>
											</Form.Group>

											<Form.Group as={Col}>
												<Form.Label>Organization</Form.Label>
												<Form.Control as="select" ref={register} name="organization_id">
													<option selected="true" disabled="disabled">
														Select organization
													</option>
													{store.organizations.map((each, i) => {
														return (
															<option value={each.id} key={i}>
																{each.name}
															</option>
														);
													})}
												</Form.Control>
											</Form.Group>
										</Form.Row>
									</Form.Group>
								</Modal.Body>
								<Modal.Footer>
									<Button variant="secondary" onClick={handleClose}>
										Cancel
									</Button>
									<Button variant="dark outline-success" type="submit">
										Create account
									</Button>
								</Modal.Footer>
							</Form>
						</Modal>
					</p>
				</Container>
			</Jumbotron>
			<Container>
				<CardDeck>
					<Card>
						<Card.Img variant="top" src={Featured1} className="feature" />
						<Card.Body>
							<Card.Title>Easily find new prospects</Card.Title>
							<Card.Text>
								Save time by quickly finding prospects in Miami-Dade County, using our fully integrated
								search engine.
							</Card.Text>
						</Card.Body>
					</Card>
					<Card>
						<Card.Img variant="top" src={Featured2} className="feature" />
						<Card.Body>
							<Card.Title>Next level CRM for prospects</Card.Title>
							<Card.Text>
								Manage each prospects profile by adding contact information of important key people
								within their organization and add notes regarding background information on the company
								and management.
							</Card.Text>
						</Card.Body>
					</Card>
					<Card>
						<Card.Img variant="top" src={Featured3} className="feature" />
						<Card.Body>
							<Card.Title>Generate Financial Information</Card.Title>
							<Card.Text>
								Easily input their financial information to automatically calculate important industry
								ratios used to underwrite and analze prospects. Manage multiple periods and generate
								charts to summarize the financial data.
							</Card.Text>
						</Card.Body>
					</Card>
					<Card>
						<Card.Img variant="top" src={Featured4} className="feature" />
						<Card.Body>
							<Card.Title>User friendly dashboard</Card.Title>
							<Card.Text>
								Our user friendly dashboard provides a clear picture of your pipeline of prospects with
								their prospective products.
							</Card.Text>
						</Card.Body>
					</Card>
				</CardDeck>
			</Container>
			<Carousel activeIndex={index} onSelect={handleSelect}>
				<Carousel.Item>
					<div className="about-us-left">Logo</div>
					<div className="about-us-right">
						<h3>About EZ Prospect</h3>
						<p>
							Started in November 2020, the idea of this application began many years prior by Adolfo
							Ospina while working in several roles in the banking industry. It was put into action as a
							final project to complete a Full Stack Junior Developer Certification Cohort through 4Geeks
							Academy. This application was brought to life by Adolfo and the talented Yahilyn Eizmendiz
							Yiong.
							<br />
							Today this application is presently linked by an API from Miami-Dade County, where most of
							its information is sourced from. EZ Prospect was designed to facilitate the process for
							financial representatives or banking relationship managers to easily source new prospects
							using data avaiable though public records.
							<br />
							Looking forward, we plan to grow this application, where it can be fully integrated with a
							banks operating system. Provide information from all public records to provide its user the
							most detailed and up to date information the user can get on their prospect.
							<br />
							As we grow, we hope you grow with us. Let us make your prospecting EZ.
						</p>
					</div>
				</Carousel.Item>
				<Carousel.Item>
					<div className="about-us-left">Photo</div>
					<div className="about-us-right">
						<h3>About Adolfo Ospina</h3>
						<p>
							Adolfo Ospina graduated from Florida International University in 2009 with a Bachelors in
							Business Adminsistration, double majoring in Finance and Marketing. With nearly 20 years of
							banking experience, Adolfo has extensive knowledge and experience working in several roles
							in the baking industry. In 2020, Adolfo decided to pursue a certificate as a Full Stack
							Junior Developer with 4Geeks Academy, where he learned the coding languages to develop the
							front-end and back-end of applications.
						</p>
					</div>
				</Carousel.Item>
				<Carousel.Item>
					<div className="about-us-left">Logo</div>
					<div className="about-us-right">
						<h3>About Yahilyn Eizmendiz Yiong</h3>
						<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
					</div>
				</Carousel.Item>
			</Carousel>
		</div>
	);
};
// Landing.propTypes = {
// 	data: PropTypes.any
// };
