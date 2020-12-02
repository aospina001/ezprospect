import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
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
	Spinner
} from "react-bootstrap";
import "../../styles/home.scss";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Home = props => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			<Container className="mt-5">
				<Form inline className="justify-content-center" md={12}>
					<FormControl type="text" placeholder="Search" />
					<Button variant="outline-success">Search</Button>
				</Form>
				<CardDeck className="justify-content-center">
					{props.data.map((each, i) => {
						return (
							<div key={i}>
								<Col className="mt-5" md={4}>
									<Card style={{ width: "18rem" }}>
										<Card.Header>{each.properties.BUSNAME}</Card.Header>
										<Card.Body>
											<Card.Text>{each.properties.BUSADDR}</Card.Text>
											<ButtonToolbar
												className="justify-content-between"
												aria-label="Toolbar with Button groups">
												<Link to={`/businessDetails/${i}`}>
													<Button variant="success">Create Prospect</Button>
												</Link>

												<Link>
													<Button variant="outline-success">
														<i className="far fa-save" />
													</Button>
												</Link>
											</ButtonToolbar>
										</Card.Body>
									</Card>
								</Col>
							</div>
						);
					})}
				</CardDeck>
			</Container>

			<Pagination className="mt-5 justify-content-center">
				<Pagination.Item>1</Pagination.Item>
				<Pagination.Item>2</Pagination.Item>
				<Pagination.Item>3</Pagination.Item>
				<Pagination.Item>4</Pagination.Item>
			</Pagination>
		</div>
	);
};
Home.propTypes = {
	data: PropTypes.any
};
