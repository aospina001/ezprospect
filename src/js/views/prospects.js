import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Container, Jumbotron, CardDeck, Col, Card, Table, Image, Row } from "react-bootstrap";

export const Prospects = () => {
	return (
		<Container className="mt-5">
			<Jumbotron style={{ background: "ghostwhite" }}>
				<h1>Business Details</h1>
				<p>Here will be all the info from the public data Miami Dade..</p>
				<p>EIN</p>
				<p>Address</p>
				<p>Business Phone</p>
				<p>Email</p>

				<CardDeck>
					<Col className="mt-5" md={4}>
						<Card style={{ width: "18rem" }}>
							<Card.Body>
								<Card.Title>Name</Card.Title>
								<Card.Subtitle className="mb-2 text-muted">Occupation</Card.Subtitle>
								<Card.Text>Address</Card.Text>
								<Card.Text>Personal Email</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col className="mt-5" md={4}>
						<Card style={{ width: "18rem" }}>
							<Card.Body>
								<Card.Title>Name</Card.Title>
								<Card.Subtitle className="mb-2 text-muted">Occupation</Card.Subtitle>
								<Card.Text>Address</Card.Text>
								<Card.Text>Personal Email</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col className="mt-5" md={4}>
						<Card style={{ width: "18rem" }}>
							<Card.Body>
								<Card.Title>Name</Card.Title>
								<Card.Subtitle className="mb-2 text-muted">Occupation</Card.Subtitle>
								<Card.Text>Address</Card.Text>
								<Card.Text>Personal Email</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</CardDeck>
			</Jumbotron>
			<Jumbotron style={{ background: "ghostwhite" }}>
				<h1>Financial Information</h1>
				<Table striped bordered hover size="sm">
					<thead>
						<tr>
							<th />
							<th>2018</th>
							<th>%</th>
							<th>2019</th>
							<th>%</th>
						</tr>
					</thead>

					<tbody>
						<tr>
							<td>Revenues</td>
							<td>xxxxxxxxx</td>
							<td>100.0</td>
							<td>xxxxxxxxx</td>
							<td>100.0</td>
						</tr>

						<tr>
							<td>COGS</td>
							<td>xxxxxxxxx</td>
							<td>100.0</td>
							<td>xxxxxxxxx</td>
							<td>100.0</td>
						</tr>

						<tr>
							<td>Gross Profit</td>
							<td>xxxxxxxxx</td>
							<td>100.0</td>
							<td>xxxxxxxxx</td>
							<td>100.0</td>
						</tr>
						<tr>
							<td>@SG&A</td>
							<td>xxxxxxxxx</td>
							<td>100.0</td>
							<td>xxxxxxxxx</td>
							<td>100.0</td>
						</tr>

						<tr>
							<td>Interest</td>
							<td>xxxxxxxxx</td>
							<td>100.0</td>
							<td>xxxxxxxxx</td>
							<td>100.0</td>
						</tr>

						<tr>
							<td>Depreciation</td>
							<td>xxxxxxxxx</td>
							<td>100.0</td>
							<td>xxxxxxxxx</td>
							<td>100.0</td>
						</tr>

						<tr>
							<td>Amortization</td>
							<td>xxxxxxxxx</td>
							<td>100.0</td>
							<td>xxxxxxxxx</td>
							<td>100.0</td>
						</tr>

						<tr>
							<td>EBITDA</td>
							<td>xxxxxxxxx</td>
							<td>100.0</td>
							<td>xxxxxxxxx</td>
							<td>100.0</td>
						</tr>

						<tr>
							<td>Net Income</td>
							<td>xxxxxxxxx</td>
							<td>100.0</td>
							<td>xxxxxxxxx</td>
							<td>100.0</td>
						</tr>

						<tr>
							<td>Distributions</td>
							<td>xxxxxxxxx</td>
							<td>100.0</td>
							<td>xxxxxxxxx</td>
							<td>100.0</td>
						</tr>
					</tbody>
				</Table>
			</Jumbotron>
			<Row className="justify-content-md-center">
				<Col xs={12} sm={4} md={4}>
					<Image
						src=" https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRA8H-FmoP01FDPRNao8dog2FKtHUWlcgEldg&usqp=CAU"
						fluid
					/>
				</Col>
				<Col xs={12} sm={4} md={4}>
					<Image
						src="https://lh3.googleusercontent.com/proxy/Zqs8a7jSlm-liTXFKL925lIyKhAd1AFAuIozcYsyNXd7t1u5VkZ60QQ44SMZPO2popf4l1WtXA1a7Xf4Tl94PucZSlSgJ17yNHyI1Cf0mciHCgXEHgUi5vTRDs5CYeeoQe0bFFRurM64swiN6qSyxdkzAJzvxnNHToamxJ7f"
						fluid
					/>
				</Col>
			</Row>
		</Container>
	);
};
