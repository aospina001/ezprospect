import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Container, CardDeck, Form, FormControl, Button, ButtonToolbar, Col, Alert } from "react-bootstrap";
import "../../styles/home.scss";
import { Link, Redirect } from "react-router-dom";
import { Context } from "../store/appContext";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [searchTerm, setSearchTerm] = useState(null);
	const [searchProspect, setSearchProspect] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [searchResultsProspect, setSearchResultsProspect] = useState([]);
	const [loading, setLoading] = useState(true);

	const handleChange = e => {
		if (e.target.value == "") {
			setSearchTerm(null);
			handleClose();
		} else {
			handleShow();
			setSearchTerm(e.target.value);
		}
	};

	const handleChangeProspect = e => {
		setSearchProspect(e.target.value);
	};

	useEffect(() => {
		actions.loadProspects();
	}, []);

	useEffect(
		() => {
			actions.loadData();
			setLoading(false);
			const results = store.business.filter(each => each.properties.BUSNAME.toLowerCase().includes(searchTerm));
			setSearchResults(results);
		},
		[searchTerm]
	);

	useEffect(
		() => {
			const results = store.prospect.filter(each => each.name.toLowerCase().includes(searchProspect));
			setSearchResultsProspect(results);
		},
		[searchProspect]
	);
	return (
		<div>
			{store.token == null ? <Redirect to="/" /> : console.log(store.token)}

			{/* Search new prospects */}
			<Form inline className="justify-content-center" md={12} value={searchTerm} onChange={handleChange}>
				<FormControl type="text" placeholder="Search" />
				<Button variant="outline-success">Search</Button>
			</Form>
			<Container md={12} show={show} onHide={handleClose} backdrop="static" keyboard={false}>
				<CardDeck className="justify-content-center">
					{searchTerm == null
						? ""
						: searchResults.map((each, i) => {
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
													<Link to={`/businessDetails/${each.properties.ACCOUNTNO}`}>
														<Button variant="success">Create Prospect</Button>
													</Link>
												</ButtonToolbar>
											</Card.Body>
										</Card>
									</Col>
								);
						  })}
				</CardDeck>
			</Container>

			{/* Show the prospects */}
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
						<Form inline>
							<FormControl
								type="text"
								placeholder="Search"
								value={searchProspect}
								onChange={handleChangeProspect}
							/>
							<Button variant="outline-success">Search</Button>
						</Form>
						<CardDeck className="justify-content-center">
							{searchResultsProspect.map((each, i) => {
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
				) : (
					""
				)}
			</Container>
		</div>
	);
};
// Home.propTypes = {
// 	data: PropTypes.any
// };
