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
	Col
} from "react-bootstrap";
import "../../styles/home.scss";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Landing = props => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<Container>
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand href="#home">EZ Prospect</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link href="#home">Home</Nav.Link>
					<Nav.Link href="#features">About Us</Nav.Link>
					<Nav.Link href="#pricing">Contact Us</Nav.Link>
				</Nav>
				<Button variant="dark outline-success" onClick={handleShow}>
					Login
				</Button>{" "}
				<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
					<Modal.Header closeButton>
						<Modal.Title>Loging</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group controlId="formBasicEmail">
								<Form.Label>Username</Form.Label>
								<Form.Control type="email" placeholder="Enter username" />
								<Form.Text className="text-muted">
									Well never share your email with anyone else.
								</Form.Text>
							</Form.Group>

							<Form.Group controlId="formBasicPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" placeholder="Password" />
							</Form.Group>
							<Form.Group controlId="formBasicCheckbox">
								<Form.Check type="checkbox" label="Remember me" />
							</Form.Group>
							<Button variant="secondary" onClick={handleClose}>
								Cancel
							</Button>
							<Button variant="dark outline-success" type="submit">
								Submit
							</Button>
						</Form>
					</Modal.Body>
				</Modal>
			</Navbar>
			<Jumbotron>
				<h1>Hello, world!</h1>
				<p>
					This is a simple hero unit, a simple jumbotron-style component for calling extra attention to
					featured content or information.
				</p>
				<p>
					<Button variant="dark outline-success" onClick={handleShow}>
						Sign up
					</Button>
					<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
						<Modal.Header closeButton>
							<Modal.Title>Modal title</Modal.Title>
						</Modal.Header>
						<Form>
							<Modal.Body>
								<Form.Group>
									<Form.Row>
										<Form.Group as={Col} controlId="formGridEmail">
											<Form.Label>Email</Form.Label>
											<Form.Control type="email" placeholder="Enter email" />
										</Form.Group>

										<Form.Group as={Col} controlId="formGridPassword">
											<Form.Label>Password</Form.Label>
											<Form.Control type="password" placeholder="Password" />
										</Form.Group>
									</Form.Row>

									<Form.Group controlId="formGridAddress1">
										<Form.Label>Address</Form.Label>
										<Form.Control placeholder="1234 Main St" />
									</Form.Group>

									<Form.Group controlId="formGridAddress2">
										<Form.Label>Address 2</Form.Label>
										<Form.Control placeholder="Apartment, studio, or floor" />
									</Form.Group>

									<Form.Row>
										<Form.Group as={Col} controlId="formGridCity">
											<Form.Label>City</Form.Label>
											<Form.Control />
										</Form.Group>

										<Form.Group as={Col} controlId="formGridState">
											<Form.Label>State</Form.Label>
											<Form.Control as="select" defaultValue="Choose...">
												<option>Choose...</option>
												<option>...</option>
											</Form.Control>
										</Form.Group>

										<Form.Group as={Col} controlId="formGridZip">
											<Form.Label>Zip</Form.Label>
											<Form.Control />
										</Form.Group>
									</Form.Row>

									<Form.Group id="formGridCheckbox">
										<Form.Check type="checkbox" label="Check me out" />
									</Form.Group>
								</Form.Group>
							</Modal.Body>
							<Modal.Footer>
								<Button variant="secondary" onClick={handleClose}>
									Cancel
								</Button>
								<Button variant="dark outline-success">Create account</Button>
							</Modal.Footer>
						</Form>
					</Modal>
				</p>
			</Jumbotron>
		</Container>
	);
};
Landing.propTypes = {
	data: PropTypes.any
};
