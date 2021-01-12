import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Container, CardDeck, Form, FormControl, Button, ButtonToolbar, Col, Alert } from "react-bootstrap";
import "../../styles/home.scss";
import { Link, Redirect } from "react-router-dom";
import { Context } from "../store/appContext";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [show, setShow] = useState(false);
	const [prospectLoaded, setProspectLoaded] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [searchTerm, setSearchTerm] = useState(null);
	const [searchResults, setSearchResults] = useState([]);
	const [editContact, setContact] = useState("info");
	const locale = "en";
	const [today, setDate] = useState(new Date());

	React.useEffect(() => {
		const timer = setInterval(() => {
			setDate(new Date());
		}, 60 * 1000);
		return () => {
			clearInterval(timer);
		};
	}, []);

	const day = today.toLocaleDateString(locale, { weekday: "long" });
	const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, { month: "long" })}\n\n`;

	const hour = today.getHours();
	const wish = `Good ${(hour < 12 && "Morning") || (hour < 17 && "Afternoon") || "Evening"}, `;

	const time = today.toLocaleTimeString(locale, { hour: "numeric", hour12: true, minute: "numeric" });

	useEffect(() => {
		if (store.prospect.length == 0) getProspects();
	}, []);

	const handleChange = e => {
		if (e.target.value == "") {
			setSearchTerm(null);
			handleClose();
		} else {
			handleShow();
			setSearchTerm(e.target.value);
		}
	};

	const getProspects = async () => {
		await actions.loadProspects();
		setProspectLoaded(true);
	};

	useEffect(
		() => {
			const results = store.business.filter(each => each.properties.BUSNAME.toLowerCase().includes(searchTerm));
			setSearchResults(results);
		},
		[searchTerm]
	);

	return (
		<div>
			{store.token == null ? <Redirect to="/" /> : ""}

			{/* Search in Miami Dade New prospects--------------------------*/}

			{/* Search new prospects */}
			<Form inline className="justify-content-center mt-2" md={12} value={searchTerm} onChange={handleChange}>
				<FormControl type="text" placeholder="Search" />
				<FontAwesomeIcon icon={faHome} />
			</Form>
			<Container md={12} show={show} onHide={handleClose} backdrop="static" keyboard={false}>
				<CardDeck className="justify-content-center">
					{searchTerm == null
						? ""
						: searchResults.map((each, i) => {
								const account2 = each.properties.ACCOUNTNO;
								let count = 0;
								return (
									<Col className="mt-5" md={4} key={i}>
										<Card style={{ width: "18rem" }}>
											<Card.Header>{each.properties.BUSNAME}</Card.Header>
											<Card.Body>
												<Card.Text>{each.properties.BUSADDR}</Card.Text>
												<Card.Text>{each.properties.ACCOUNTNO}</Card.Text>
												<ButtonToolbar
													className="justify-content-between"
													aria-label="Toolbar with Button groups">
													{store.prospect.map(x => {
														if (x.account == account2) {
															count = +1;
															return (
																<Link
																	to={`/prospectDetails/${
																		each.properties.ACCOUNTNO
																	}/${editContact}`}>
																	<Button variant="dark">View</Button>
																</Link>
															);
														}
													})}

													{count == 0 ? (
														<Link
															to={`/businessDetails/${
																each.properties.ACCOUNTNO
															}/${editContact}`}>
															<Button variant="success">Create Prospect</Button>
														</Link>
													) : (
														""
													)}
												</ButtonToolbar>
											</Card.Body>
										</Card>
									</Col>
								);
						  })}
				</CardDeck>
			</Container>

			{/*-------------------------------- Show the user prospects -------------------------------*/}
			<Container className="mt-5">
				<h3>{`${wish} ${store.user_name}`}</h3>
				<p>{`${date} | ${time}`}</p>
				{store.prospect.length == 0 ? (
					<Alert variant="success">
						<Alert.Heading>Sorry, no prospect created yet</Alert.Heading>
						<p>
							If you want to create a new prospect please go to the main page to analyze the future
							prospects we have.
						</p>
					</Alert>
				) : searchTerm == null ? (
					<div>
						<CardDeck className="justify-content-center">
							{store.prospect.map((each, i) => {
								return (
									<Col className="mt-5" md={4} key={i}>
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
													<Link to={`/prospectDetails/${each.id}/${editContact}`}>
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
				) : (
					""
				)}
			</Container>
		</div>
	);
};
