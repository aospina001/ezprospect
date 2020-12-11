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
import { useForm } from "react-hook-form";
import "../../styles/index.scss";

export const Landing = () => {
	const [show, setShow] = useState(false);
	const { store, actions } = useContext(Context);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const { register, handleSubmit } = useForm();

	const onSubmit = async data => {
		actions.signup(data);
	};

	return (
		<Container>
			<Jumbotron className="top-landing">
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
												ref={register}
											/>
										</Form.Group>

										<Form.Group as={Col} controlId="formGridPassword">
											<Form.Label>Password</Form.Label>
											<Form.Control
												type="password"
												placeholder="Password"
												name="password"
												ref={register}
											/>
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
								<Button variant="dark outline-success" type="submit">
									Create account
								</Button>
							</Modal.Footer>
						</Form>
					</Modal>
				</p>
			</Jumbotron>
		</Container>
	);
};
// Landing.propTypes = {
// 	data: PropTypes.any
// };
