import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Navbar, Nav, Container, Form, Modal, Figure, Image } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../store/appContext";
import Logo from "../../img/logo.png";
import "../../styles/index.scss";

export const NavigationBar = () => {
	const [show, setShow] = useState(false);
	const { store, actions } = useContext(Context);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const history = useHistory();
	const { register, handleSubmit } = useForm();

	const onSubmit = async data => {
		const done = await actions.login(data);

		if (store.token != null) {
			handleClose();
			history.push("/logged");
		}
	};
	return (
		<Navbar className="base-color">
			<Container>
				<Link to="/">
					<Navbar.Brand>
						<Image height={56} width={135} src={Logo} className="align-items-center" />
					</Navbar.Brand>
				</Link>
				<Nav className="mr-auto">
					<Nav.Link href="#aboutus">About Us</Nav.Link>
					<Nav.Link href="#contactus">Contact Us</Nav.Link>
				</Nav>
				{store.token ? (
					<div>
						<Button
							variant="dark outline-success"
							onClick={() => {
								actions.sign_out();
							}}>
							Sign Out
						</Button>
					</div>
				) : (
					<div>
						<Button variant="dark outline-success" onClick={handleShow}>
							Login
						</Button>
					</div>
				)}
				<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
					<Modal.Header closeButton>
						<Modal.Title>Login to your account</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form onSubmit={handleSubmit(onSubmit)}>
							<Form.Group controlId="formBasicEmail">
								<Form.Label>Username</Form.Label>
								<Form.Control type="email" placeholder="Enter username" name="email" ref={register} />
								<Form.Text className="text-muted">
									Well never share your email with anyone else.
								</Form.Text>
							</Form.Group>

							<Form.Group controlId="formBasicPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" placeholder="Password" name="password" ref={register} />
							</Form.Group>
							{/* <Form.Group controlId="formBasicCheckbox">
								<Form.Check type="checkbox" label="Remember me" />
							</Form.Group> */}
							<Button variant="secondary" onClick={handleClose}>
								Cancel
							</Button>
							<Button variant="dark outline-success" type="submit">
								Submit
							</Button>
						</Form>
					</Modal.Body>
				</Modal>
			</Container>
		</Navbar>
	);
};
