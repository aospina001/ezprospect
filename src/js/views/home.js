import React from "react";
import { Card, Container, CardDeck, Form, FormControl, Button, ButtonToolbar, Col, Pagination } from "react-bootstrap";
import "../../styles/home.scss";
import { Link } from "react-router-dom";

export const Home = () => (
	<Container className="mt-5">
		<Form inline className="justify-content-center">
			<FormControl type="text" placeholder="Search" />
			<Button variant="outline-primary">Search</Button>
		</Form>

		<CardDeck>
			<Col className="mt-5" md={4}>
				<Card style={{ width: "18rem" }}>
					<Card.Body>
						<Card.Title>Business Name</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">Business Class</Card.Subtitle>
						<Card.Text>Business Direction</Card.Text>
						<Card.Text>Business Description etc...</Card.Text>
						<ButtonToolbar className="justify-content-between" aria-label="Toolbar with Button groups">
							<Link to="/businessDetails">
								<Button variant="primary">Prospect</Button>
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

			<Col className="mt-5" md={4}>
				<Card style={{ width: "18rem" }}>
					<Card.Body>
						<Card.Title>Business Name</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">Business Class</Card.Subtitle>
						<Card.Text>Business Direction</Card.Text>
						<Card.Text>Business Description etc...</Card.Text>
						<ButtonToolbar className="justify-content-between" aria-label="Toolbar with Button groups">
							<Link to="/businessDetails">
								<Button variant="primary">Prospect</Button>
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

			<Col className="mt-5" md={4}>
				<Card style={{ width: "18rem" }}>
					<Card.Body>
						<Card.Title>Business Name</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">Business Class</Card.Subtitle>
						<Card.Text>Business Direction</Card.Text>
						<Card.Text>Business Description etc...</Card.Text>
						<ButtonToolbar className="justify-content-between" aria-label="Toolbar with Button groups">
							<Link to="/businessDetails">
								<Button variant="primary">Prospect</Button>
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

			<Col className="mt-5" md={4}>
				<Card style={{ width: "18rem" }}>
					<Card.Body>
						<Card.Title>Business Name</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">Business Class</Card.Subtitle>
						<Card.Text>Business Direction</Card.Text>
						<Card.Text>Business Description etc...</Card.Text>
						<ButtonToolbar className="justify-content-between" aria-label="Toolbar with Button groups">
							<Link to="/businessDetails">
								<Button variant="primary">Prospect</Button>
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

			<Col className="mt-5" md={4}>
				<Card style={{ width: "18rem" }}>
					<Card.Body>
						<Card.Title>Business Name</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">Business Class</Card.Subtitle>
						<Card.Text>Business Direction</Card.Text>
						<Card.Text>Business Description etc...</Card.Text>
						<ButtonToolbar className="justify-content-between" aria-label="Toolbar with Button groups">
							<Link to="/businessDetails">
								<Button variant="primary">Prospect</Button>
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

			<Col className="mt-5" md={4}>
				<Card style={{ width: "18rem" }}>
					<Card.Body>
						<Card.Title>Business Name</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">Business Class</Card.Subtitle>
						<Card.Text>Business Direction</Card.Text>
						<Card.Text>Business Description etc...</Card.Text>
						<ButtonToolbar className="justify-content-between" aria-label="Toolbar with Button groups">
							<Link to="/businessDetails">
								<Button variant="primary">Prospect</Button>
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
		</CardDeck>
		<Pagination className="mt-5 justify-content-center">
			<Pagination.Item>1</Pagination.Item>
			<Pagination.Item>2</Pagination.Item>
			<Pagination.Item>3</Pagination.Item>
			<Pagination.Item>4</Pagination.Item>
		</Pagination>
	</Container>
);
