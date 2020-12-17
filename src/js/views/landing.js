import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
	Nav,
	Navbar,
	Modal,
	Jumbotron,
	Container,
	Form,
	FormControl,
	Button,
	ButtonToolbar,
	Col,
	Card
} from "react-bootstrap";
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
	const { store, actions } = useContext(Context);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const { register, handleSubmit } = useForm();
	const [index, setIndex] = useState(0); //Hook for controlled carousel
	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	}; //For controlled carousel

	const onSubmit = async data => {
		actions.signup(data);
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
									<Form.Group>
										<Form.Row>
											<Form.Group as={Col} controlId="formGridEmail">
												<Form.Label>Email</Form.Label>
												<Form.Control
													type="email"
													placeholder="Enter email"
													name="email"
													ref={register({ required: true })}
												/>
											</Form.Group>

											<Form.Group as={Col} controlId="formGridPassword">
												<Form.Label>Password</Form.Label>
												<Form.Control
													type="password"
													placeholder="Password"
													name="password"
													ref={register({ required: true })}
												/>
											</Form.Group>

											<Form.Row>
												<Form.Group as={Col} controlId="formGridEmail">
													<Form.Label>First Name</Form.Label>
													<Form.Control
														placeholder="First Name"
														name="first_name"
														ref={register({ required: true })}
													/>
												</Form.Group>

												<Form.Group as={Col} controlId="formGridPassword">
													<Form.Label>Last Name</Form.Label>
													<Form.Control
														placeholder="Last Name"
														name="last_name"
														ref={register({ required: true })}
													/>
												</Form.Group>
											</Form.Row>

											<Form.Row>
												<Form.Group as={Col} controlId="formGridCity">
													<Form.Label>Phone Number</Form.Label>
													<Form.Control
														placeholder="Phone Number"
														name="phone_number"
														ref={register({ required: true })}
													/>
												</Form.Group>
											</Form.Row>
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
					<img
						className="d-block w-100"
						src="holder.js/800x400?text=First slide&bg=373940"
						alt="First slide"
					/>
					<Carousel.Caption>
						<h3>First slide label</h3>
						<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img
						className="d-block w-100"
						src="holder.js/800x400?text=Second slide&bg=282c34"
						alt="Second slide"
					/>

					<Carousel.Caption>
						<h3>About Adolfo Ospina</h3>
						<p>
							Adolfo Ospina graduated from Florida International University in 2009 with a Bachelors in
							Business Adminsistration, double majoring in Finance and Marketing. With nearly 20 years of
							banking experience, Adolfo has extensive knowledge and experience working in several roles
							in the baking industry. In 2020, Adolfo decided to pursue a certificate as a Full Stack
							Junior Developer with 4Geeks Academy, where he learned the coding languages to develop the
							front-end and back-end of applications.
						</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img
						className="d-block w-100"
						src="holder.js/800x400?text=Third slide&bg=20232a"
						alt="Third slide"
					/>

					<Carousel.Caption>
						<h3>About Yahilyn Eizmendiz Yiong</h3>
						<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
					</Carousel.Caption>
				</Carousel.Item>
			</Carousel>
		</div>
	);
};
// Landing.propTypes = {
// 	data: PropTypes.any
// };
