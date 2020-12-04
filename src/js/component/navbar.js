import React from "react";
import { Link } from "react-router-dom";
import { Button, Navbar, Nav, Container, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const NavigationBar = () => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const { register, handleSubmit } = useForm();

	const onSubmit = async data => {
		window.location.href = "/logged";
	};
	return (
		<Container className="mt-3">
			<Navbar bg="dark" variant="dark">
				<Link to="/">
					<Navbar.Brand>EZ Prospect</Navbar.Brand>
				</Link>
				<Link to="/logged">
					<Navbar.Brand>Home</Navbar.Brand>
				</Link>
				<Nav className="mr-auto">
					<Nav.Link href="#features">About Us</Nav.Link>
					<Nav.Link href="#pricing">Contact Us</Nav.Link>
				</Nav>
				<Link to="/prospects">
					<Button variant="dark outline-success" className="mx-3">
						My Prospect
					</Button>
				</Link>
				<Button variant="dark outline-success" onClick={handleShow}>
					Login
				</Button>{" "}
				<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
					<Modal.Header closeButton>
						<Modal.Title>Loging</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form onSubmit={handleSubmit(onSubmit)}>
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
		</Container>
	);
};
