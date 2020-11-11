import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Jumbotron, CardDeck, Col, Card, Table, Image, Row } from "react-bootstrap";
import PropTypes from "prop-types";

import "../../styles/demo.scss";
import { Context } from "../store/appContext";

export const ProspectDetails = () => {
	const { store, actions } = useContext(Context);
	const { id } = useParams();

	return (
		<Container className="mt-5">
			{store.prospect.map((each, i) => {
				if (each.objectId == id) {
					return (
						<div>
							<Jumbotron style={{ background: "ghostwhite" }}>
								<h1>{each.data.properties.BUSNAME}</h1>
								<p>Address -- {each.data.properties.BUSADDR}</p>
								<p>Folio -- {each.data.properties.FOLIO}</p>
								<p>Account -- {each.data.properties.ACCOUNTNO}</p>
								<p>Status -- {each.data.properties.ACCSTATUS}</p>
								<p>Class Code -- {each.data.properties.CLASSCODE}</p>
								<p>Class Description -- {each.data.properties.CLASSDESC}</p>
								<p>Mail Address -- {each.data.properties.MAILADDR}</p>
								<p>Owner Name -- {each.data.properties.OWNERNAME}</p>
								<p>Phone Number -- {each.data.properties.PHONENO}</p>
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
										src=" https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRA8H-FmoP01FDPRNao8dog2FKtHUWlcgEldg&usqp=CAU"
										fluid
									/>
								</Col>
							</Row>
						</div>
					);
				}
			})}
		</Container>
	);
};

// BusinessDetails.propTypes = {
// 	data: PropTypes.any
// };
