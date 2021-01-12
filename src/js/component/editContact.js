import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, Redirect, useHistory } from "react-router-dom";
import Chart from "../component/myChart";
import { Jumbotron, Form, Button, Col, Row } from "react-bootstrap";
import PropTypes, { number } from "prop-types";
import "../../styles/demo.scss";
import { Context } from "../store/appContext";
import { useForm } from "react-hook-form";

export const EditContact = () => {
	const { id, prospect_id } = useParams();
	const { store, actions } = useContext(Context);
	const history = useHistory();

	const [editContact, setContact] = useState("contacts");

	const onSubmit_EditContact = async data => {
		const response = await actions.editContact(data, id);
		history.push(`/prospectDetails/${prospect_id}/${editContact}`);
	};

	return (
		<div>
			{store.token == null ? <Redirect to="/" /> : ""}
			{store.contacts == ""
				? ""
				: store.contacts.map((each, i) => {
						if (each.id == id) {
							const { register, handleSubmit } = useForm({
								defaultValues: {
									first_name: each.first_name,
									last_name: each.last_name,
									position: each.position,
									title: each.title,
									email: each.email,
									phone_number: each.phone_number
								}
							});

							return (
								<Row className="justify-content-md-center">
									<Col md={6} className="">
										<Jumbotron style={{ background: "white" }} className="pb-2">
											<h3>Edit Contact Information</h3>
											<Form onSubmit={handleSubmit(onSubmit_EditContact)}>
												<Form.Group controlId="exampleForm.ControlInput1">
													<Form.Label>
														<b>First Name</b>
													</Form.Label>
													<Form.Control type="text" name="first_name" ref={register} />

													<Form.Label>
														<b>Last Name</b>
													</Form.Label>
													<Form.Control type="text" name="last_name" ref={register} />
												</Form.Group>

												<Form.Group controlId="exampleForm.ControlInput1">
													<Form.Label>
														<b>Position</b>
													</Form.Label>
													<Form.Control type="text" name="position" ref={register} />

													<Form.Label>
														<b>Title</b>
													</Form.Label>
													<Form.Control type="text" name="title" ref={register} />
												</Form.Group>

												<Form.Group controlId="exampleForm.ControlInput1">
													<Form.Label>
														<b>Email</b>
													</Form.Label>
													<Form.Control type="email" name="email" ref={register} />

													<Form.Label>
														<b>Phone Number</b>
													</Form.Label>
													<Form.Control type="text" name="phone_number" ref={register} />
												</Form.Group>
												<Link to={`/prospectDetails/${prospect_id}/${editContact}`}>
													<Button variant="secondary" className="mr-2">
														Cancel
													</Button>
												</Link>
												<Button variant="success" type="submit">
													Save
												</Button>
											</Form>
										</Jumbotron>
									</Col>
								</Row>
							);
						}
				  })}
		</div>
	);
};

EditContact.propTypes = {
	data: PropTypes.any
};
