import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { Container, Jumbotron, ButtonToolbar, Button, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

import "../../styles/demo.scss";
import { Context } from "../store/appContext";

export const BusinessDetails = props => {
	const { id } = useParams();
	const { store, actions } = useContext(Context);
	const { register, handleSubmit } = useForm();
	let history = useHistory();

	const onSubmit = async formData => {
		const vari = props.data[id];
		const objectId = vari.properties.OBJECTID;
		await actions.addProspect(formData, objectId, props.data[id]);

		history.push(`/prospectDetails/${objectId}`);
	};

	return (
		<Container className="mt-5">
			{props.data.map((each, i) => {
				if (i == id) {
					return (
						<div>
							<Jumbotron style={{ background: "ghostwhite" }}>
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
							</Jumbotron>
							<Jumbotron style={{ background: "ghostwhite" }}>
								<h1>Here We have to enter the financial info (create the form for that)</h1>
								<p>Revenues</p>
								<p>Total OPEX</p>
								<p>Total assets</p>
								<p>Total Liabilities</p>
							</Jumbotron>
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="form-group">
									<label>Full Name</label>
									<input
										type="text"
										className="form-control"
										placeholder="Full Name"
										name="full_name"
										ref={register}
									/>
								</div>

								<Button variant="primary" type="submit" className="form-control">
									Create Prospect
								</Button>
							</form>
						</div>
					);
				}
			})}
		</Container>
	);
};

BusinessDetails.propTypes = {
	data: PropTypes.any
};
