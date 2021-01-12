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
	Alert,
	InputGroup
} from "react-bootstrap";
import "../../styles/home.scss";
import { Link, Redirect } from "react-router-dom";
import { Context } from "../store/appContext";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faSearch, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faSearch, faCheck);

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
			<Container>
				<h3>{`${wish} ${store.user_name}`}</h3>
				<p>{`${date} | ${time}`}</p>
			</Container>
			<Form inline className="justify-content-center mt-2" md={12} value={searchTerm} onChange={handleChange}>
				<FormControl type="text" placeholder="Search New Business" />
				<FontAwesomeIcon icon="search" style={{ color: "DarkGray " }} className="fa-lg ml-2 align-middle" />
			</Form>

			<Container md={12} show={show} onHide={handleClose} backdrop="static" keyboard={false}>
				<CardDeck className="justify-content-center">
					{searchTerm == null
						? ""
						: searchResults.map((each, i) => {
								console.log(each);
								const account2 = each.properties.ACCOUNTNO;
								let count = 0;
								return (
									<Col className="mt-5" md={4} key={i}>
										<Card style={{ width: "18rem", height: "22rem" }}>
											<Card.Header>
												<b>{each.properties.BUSNAME}</b>
											</Card.Header>
											<Card.Body>
												<Card.Text>
													<b>Address:</b>
													{` ${each.properties.BUSADDR}, ${each.properties.BUSCITY}, ${
														each.properties.BUSSTATE
													} ${each.properties.ZIPCODE}`}
												</Card.Text>
												<Card.Text>
													<b>Owner Name:</b>
													{` ${each.properties.OWNERNAME}`}
												</Card.Text>
												<Card.Text>
													<b>Account Number:</b>
													{` ${each.properties.ACCOUNTNO}`}
												</Card.Text>
												<ButtonToolbar
													className="justify-content-between"
													aria-label="Toolbar with Button groups">
													{store.prospect.map(x => {
														if (x.account == account2) {
															count = +1;
															return (
																<Link to={`/prospectDetails/${x.id}/${editContact}`}>
																	<FontAwesomeIcon
																		icon="check"
																		style={{ color: "#03989e" }}
																		className="fa-lg ml-2 align-middle"
																	/>
																	{` View Details`}
																</Link>
															);
														}
													})}

													{count == 0 ? (
														<Link
															to={`/businessDetails/${
																each.properties.ACCOUNTNO
															}/${editContact}`}>
															<Button variant="success" className="align-text-bottom">
																Create Prospect
															</Button>
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
									<Col className="mt-2" md={4} key={i}>
										<Card style={{ width: "18rem", height: "20rem" }}>
											<Card.Header>
												<b>Business Name:</b>
												{` ${each.name}`}
											</Card.Header>
											<Card.Body>
												<Card.Subtitle className="mb-2 text-muted">
													{`Business Code: ${each.industry}`}
												</Card.Subtitle>
												<Card.Text>
													<b>Address:</b>
													{` ${each.address1} ${each.city}, ${each.state} ${each.zipCode} `}
												</Card.Text>
												<Card.Text>
													<b>Phone Number</b>
													{` ${each.phone_number}`}
												</Card.Text>
												<Card.Text>
													<b>Phone Number</b>
													{` ${each.account}`}
												</Card.Text>
												<ButtonToolbar
													className="align-text-bottom"
													aria-label="Toolbar with Button groups">
													<Link to={`/prospectDetails/${each.id}/${editContact}`}>
														<Button variant="dark outline-success">View</Button>
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
