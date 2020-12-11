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
import { Link, Redirect } from "react-router-dom";
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
			{store.token != null ? <Redirect to="/logged" /> : ""}
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
							<Modal.Title>Create an Account</Modal.Title>
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
									</Form.Row>

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
