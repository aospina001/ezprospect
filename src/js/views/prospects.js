import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import {
	Card,
	Container,
	CardDeck,
	Form,
	FormControl,
	Button,
	ButtonToolbar,
	Col,
	Pagination,
	Alert
} from "react-bootstrap";

export const Prospects = () => {
	const { store, actions } = useContext(Context);

	return (
		<Container className="mt-5">
			{store.prospect.length == 0 ? (
				<Alert variant="success">
					<Alert.Heading>Sorry, no perspective created yet</Alert.Heading>
					<p>
						If you want to create a new prospect please go to the main page to analyze the future prospects
						we have.
					</p>
				</Alert>
			) : (
				<div>
					<Form inline className="justify-content-center">
						<FormControl type="text" placeholder="Search" />
						<Button variant="outline-primary">Search</Button>
					</Form>
					<div>
						<CardDeck>
							{store.prospect.map((each, i) => {
								return (
									<Col className="mt-5" md={4} key={i}>
										<Card style={{ width: "18rem" }}>
											<Card.Body>
												<Card.Title>{each.data.properties.BUSNAME}</Card.Title>
												<Card.Subtitle className="mb-2 text-muted">
													{each.data.properties.CLASSCODE}
												</Card.Subtitle>
												<Card.Text>{each.data.properties.BUSADDR}</Card.Text>
												<ButtonToolbar
													className="justify-content-between"
													aria-label="Toolbar with Button groups">
													<Link to={`/prospectDetails/${each.objectId}`}>
														<Button variant="primary">View</Button>
													</Link>

													<Link>
														<Button variant="outline-primary">
															<i className="far fa-save" />
														</Button>
													</Link>
												</ButtonToolbar>
											</Card.Body>
										</Card>
									</Col>
								);
							})}
						</CardDeck>
					</div>
				</div>
			)}
		</Container>
	);
};
