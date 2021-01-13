import React, { useState, useEffect, useContext } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { Container, Jumbotron, ButtonToolbar, Button, Tab, Tabs, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { MyMap } from "../component/maps";

import "../../styles/demo.scss";
import { Context } from "../store/appContext";

export const BusinessDetails = () => {
	const { account } = useParams();
	const { store, actions } = useContext(Context);
	const [editContact, setContact] = useState("info");
	let history = useHistory();

	const onSubmit = async data => {
		let prospect_id = await actions.addProspect(data);
		await actions.loadProspects();
		history.push(`/prospectDetails/${prospect_id}/${editContact}`);
	};

	return (
		<Container className="mt-2">
			{store.token == null ? <Redirect to="/" /> : ""}
			{store.business.map((each, i) => {
				if (each.properties.ACCOUNTNO == account) {
					return (
						<Jumbotron style={{ background: "white" }}>
							<Row>
								<Col md={6}>
									<h1>{each.properties.BUSNAME}</h1>
									<p>Address -- {each.properties.BUSADDR}</p>
									<p>Folio -- {each.properties.FOLIO}</p>
									<p>Account -- {each.properties.ACCOUNTNO}</p>
									<p>Status -- {each.properties.ACCSTATUS}</p>
									<p>Class Code -- {each.properties.CLASSCODE}</p>
									<p>Class Description -- {each.properties.CLASSDESC}</p>
									<p>Mail Address -- {each.properties.MAILADDR}</p>
									<p>Owner Name -- {each.properties.OWNERNAME}</p>
									<p>Phone Number -- {each.properties.PHONENO}</p>
									<Button variant="success" onClick={() => onSubmit(each.properties)}>
										Add Prospect
									</Button>
								</Col>
								<Col md={6}>
									<MyMap lat={each.properties.LAT} lon={each.properties.LON} />
								</Col>
							</Row>
						</Jumbotron>
					);
				}
			})}
		</Container>
	);
};

// BusinessDetails.propTypes = {
// 	data: PropTypes.any
// };
