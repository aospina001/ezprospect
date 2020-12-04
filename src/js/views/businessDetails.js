import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { Container, Jumbotron, ButtonToolbar, Button, Tab, Tabs, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

import "../../styles/demo.scss";
import { Context } from "../store/appContext";

export const BusinessDetails = () => {
	const { id } = useParams();
	const { store, actions } = useContext(Context);
	const { register, handleSubmit } = useForm();
	let history = useHistory();
	console.log(store.business[id]);

	const onSubmit = async () => {
		const objectId = store.business[id].properties.OBJECTID;
		await actions.addProspect(objectId, store.business[id]);
		history.push(`/prospectDetails/${objectId}`);
	};

	return (
		<Container className="mt-2">
			{store.business.map((each, i) => {
				if (i == id) {
					return (
						<div>
							<Jumbotron style={{ background: "white" }} className="mt-2" s>
								<Col className="d-flex justify-content-rigth">
									<form onSubmit={handleSubmit(onSubmit())}>
										<Button variant="success" type="submit">
											Add Prospect
										</Button>
									</form>
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
