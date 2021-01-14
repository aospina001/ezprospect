import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, Redirect } from "react-router-dom";
import { Context } from "../store/appContext";
import { Card, Container, CardDeck, Form, FormControl, Button, ButtonToolbar, Col, Alert } from "react-bootstrap";

export const Prospects = () => {
	const { store, actions } = useContext(Context);

	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	const handleChange = e => {
		setSearchTerm(e.target.value);
	};

	useEffect(() => {
		actions.loadProspects();
	}, []);

	React.useEffect(
		() => {
			const results = store.prospect.filter(each => each.name.toLowerCase().includes(searchTerm));
			setSearchResults(results);
		},
		[searchTerm]
	);

	return (
		<Container className="mt-3">
			{store.prospect.length == 0 ? (
				<Alert variant="success">
					<Alert.Heading>Sorry, no prospect created yet</Alert.Heading>
					<p>
						If you want to create a new prospect please go to the main page to analyze the future prospects
						we have.
					</p>
				</Alert>
			) : (
				<div>
					<Form inline className="justify-content-center">
						<FormControl type="text" placeholder="Search" value={searchTerm} onChange={handleChange} />

						<Button variant="outline-success">Search</Button>
					</Form>
					<div>
						<CardDeck className="justify-content-center">
							{searchResults.map((each, i) => {
								return (
									<Col className="mt-3 mb-3" md={4} key={i}>
										<Card style={{ width: "18rem" }}>
											<Card.Body>
												<Card.Title>{each.name}</Card.Title>
												<Card.Subtitle className="mb-2 text-muted">
													{each.industry}
												</Card.Subtitle>
												<Card.Text>{each.address1}</Card.Text>
												<ButtonToolbar
													className="justify-content-between"
													aria-label="Toolbar with Button groups">
													<Link to={`/prospectDetails/${each.account}`}>
														<Button variant="success">View</Button>
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
