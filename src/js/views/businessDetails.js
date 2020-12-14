import React, { useState, useEffect, useContext } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { Container, Jumbotron, ButtonToolbar, Button, Tab, Tabs, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

import "../../styles/demo.scss";
import { Context } from "../store/appContext";

export const BusinessDetails = () => {
	const { account } = useParams();
	const { store, actions } = useContext(Context);
	let history = useHistory();

	const onSubmit = async data => {
		let new_prostect = await actions.addProspect(data);
		actions.loadProspects();
		history.push(`/prospectDetails/${new_prostect}`);
	};

	return (
		<Container className="mt-2">
			{store.token == null ? <Redirect to="/" /> : ""}
			{store.business.map((each, i) => {
				if (each.properties.ACCOUNTNO == account) {
					return (
						<div>
							<Jumbotron>
								<Col className="d-flex justify-content-rigth">
									<Button variant="success" onClick={() => onSubmit(each.properties)}>
										Add Prospect
									</Button>
								</Col>
								<h1 className="mt-2">{each.properties.BUSNAME}</h1>
								<p>Address -- {each.properties.BUSADDR}</p>
								<p>Folio -- {each.properties.FOLIO}</p>
								<p>Account -- {each.properties.ACCOUNTNO}</p>
								<p>Status -- {each.properties.ACCSTATUS}</p>
								<p>Class Code -- {each.properties.CLASSCODE}</p>
								<p>Class Description -- {each.properties.CLASSDESC}</p>
								<p>Mail Address -- {each.properties.MAILADDR}</p>
								<p>Owner Name -- {each.properties.OWNERNAME}</p>
								<p>Phone Number -- {each.properties.PHONENO}</p>
							</Jumbotron>
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
