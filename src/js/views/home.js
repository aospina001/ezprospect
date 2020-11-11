import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Container, CardDeck, Form, FormControl, Button, ButtonToolbar, Col, Pagination } from "react-bootstrap";
import "../../styles/home.scss";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Home = props => {
	return (
		<Container className="mt-5">
			<Form inline className="justify-content-center" md={12}>
				<FormControl type="text" placeholder="Search" />
				<Button variant="outline-primary">Search</Button>
			</Form>
			<CardDeck>
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
												<Button variant="primary">Create Prospect</Button>
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
						</div>
					);
				})}
			</CardDeck>
			<Pagination className="mt-5 justify-content-center">
				<Pagination.Item>1</Pagination.Item>
				<Pagination.Item>2</Pagination.Item>
				<Pagination.Item>3</Pagination.Item>
				<Pagination.Item>4</Pagination.Item>
			</Pagination>
		</Container>
	);
};
Home.propTypes = {
	data: PropTypes.any
};
