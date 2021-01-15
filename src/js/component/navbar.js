import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Navbar, Nav, Container, Form, Modal, Alert, Image, Col } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../store/appContext";
import Logo from "../../img/logo.png";
import "../../styles/index.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faUsersCog, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fab, faUsersCog, faHome);

export const NavigationBar = () => {
	const [show, setShow] = useState(false);
	const [error, setError] = useState(false);
	const { store, actions } = useContext(Context);
	const [showUser, setShowUser] = useState(false);
	const handleClose = () => {
		setError(false);
		setShow(false);
	};
	const handleShow = () => setShow(true);
	const history = useHistory();
	const { register, handleSubmit } = useForm();

	const handleClose_EditUser = () => setShowUser(false);
	const handleShow_EditUser = () => setShowUser(true);

	const onSubmit_EditUser = async data => {
		const done = await actions.editUser(data);
		if (done) handleClose_EditUser();
	};

	const onSubmit_Login = async data => {
		const done = await actions.login(data);
		if (done) {
			setError(done);
		} else {
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
					{store.token && (
						<Link to={"/"} style={{ color: "black" }}>
							<FontAwesomeIcon icon="home" className="fa-2x ml-2 mb-0 " /> Home
						</Link>
					)}
				</Link>

				{store.token ? (
					<div>
						<Button
							variant="dark outline-success"
							onClick={() => {
								actions.sign_out();
							}}>
							Sign Out
						</Button>
						<Link style={{ color: "black" }}>
							<FontAwesomeIcon
								icon="users-cog"
								className="fa-2x ml-2 align-middle"
								onClick={handleShow_EditUser}
							/>
						</Link>
					</div>
				) : (
					<>
						<Nav className="mr-auto">
							<Nav.Link href="#aboutus">About Us</Nav.Link>
							<Nav.Link href="#contactus">Contact Us</Nav.Link>
						</Nav>
						<Button variant="dark outline-success" onClick={handleShow}>
							Login
						</Button>
					</>
				)}

				{/* -------------------------Login Modal--------------------- */}

				<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
					<Modal.Header closeButton>
						<Modal.Title>Login to your account</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{error ? <Alert variant="danger">{error}</Alert> : ""}

						<Form onSubmit={handleSubmit(onSubmit_Login)}>
							<Form.Group>
								<Form.Label>Username</Form.Label>
								<Form.Control type="email" placeholder="Enter username" name="email" ref={register} />
								<Form.Text className="text-muted">
									Well never share your email with anyone else.
								</Form.Text>
							</Form.Group>

							<Form.Group>
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" placeholder="Password" name="password" ref={register} />
							</Form.Group>
							<Button variant="secondary mr-2" onClick={handleClose}>
								Cancel
							</Button>
							<Button variant="dark outline-success" type="submit">
								Submit
							</Button>
						</Form>
					</Modal.Body>
				</Modal>

				{/* --------------------------User Edit Modal------------------------ */}

				<Modal show={showUser} onHide={handleClose_EditUser} id="user_Edit" backdrop="static" keyboard={false}>
					<Modal.Header closeButton>
						<Modal.Title>User Information</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form onSubmit={handleSubmit(onSubmit_EditUser)}>
							<Form.Group>
								<Form.Row>
									<Form.Group as={Col}>
										<Form.Label>Email</Form.Label>
										<Form.Control
											type="email"
											name="email"
											placeholder={store.user["email"]}
											disabled
										/>
									</Form.Group>
								</Form.Row>

								<Form.Row>
									<Form.Group as={Col}>
										<Form.Label>First Name</Form.Label>
										<Form.Control
											name="first_name"
											placeholder={store.user["first_name"]}
											disabled
										/>
									</Form.Group>

									<Form.Group as={Col}>
										<Form.Label>Last Name</Form.Label>
										<Form.Control name="last_name" placeholder={store.user["last_name"]} disabled />
									</Form.Group>
								</Form.Row>

								<Form.Row>
									<Form.Group as={Col}>
										<Form.Label>Phone Number</Form.Label>
										<Form.Control
											name="phone_number"
											ref={register}
											defaultValue={store.user["phone_number"]}
										/>
									</Form.Group>
								</Form.Row>
							</Form.Group>

							<Button variant="secondary" onClick={handleClose_EditUser}>
								Cancel
							</Button>
							<Button variant="success" className="ml-2" type="submit">
								Edit
							</Button>
						</Form>
					</Modal.Body>
				</Modal>
			</Container>
		</Navbar>
	);
};
