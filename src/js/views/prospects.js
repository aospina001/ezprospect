import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, Redirect } from "react-router-dom";
import { Context } from "../store/appContext";
import { Card, Container, CardDeck, Form, FormControl, Button, ButtonToolbar, Col, Alert } from "react-bootstrap";

const people = ["Siri", "Alexa", "Google", "Facebook", "Twitter", "Linkedin", "Sinkedin"];

export const Prospects = () => {
	const { store, actions } = useContext(Context);

	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const handleChange = e => {
		setSearchTerm(e.target.value);
	};

	React.useEffect(
		() => {
			const results = store.prospect.filter(each =>
				each.data.properties.BUSNAME.toLowerCase().includes(searchTerm)
			);
			setSearchResults(results);
		},
		[searchTerm]
	);

	return (
		<Container className="mt-5">
			{store.token == null ? <Redirect to="/" /> : ""}
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
