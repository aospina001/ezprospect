import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Jumbotron, ButtonToolbar, Button, Col } from "react-bootstrap";

import "../../styles/demo.scss";

export const BusinessDetails = () => {
	return (
		<Container className="mt-5">
			<Jumbotron>
				<h1>Business Details</h1>
				<p>Here will be all the info from the public data Miami Dade..</p>
			</Jumbotron>
			<Jumbotron>
				<h1>Here We have to enter the financial info (2 years comparation)</h1>
				<p>Revenues</p>
				<p>Total OPEX</p>
				<p>Total assets</p>
				<p>Total Liabilities</p>
			</Jumbotron>

			<ButtonToolbar aria-label="Toolbar with Button groups" className="justify-content-center">
				<Link to="">
					<Button variant="primary">Save</Button>
				</Link>
				<Button variant="primary" className="ml-5">
					Clear
				</Button>
			</ButtonToolbar>
		</Container>
	);
};
