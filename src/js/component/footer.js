import React, { Component } from "react";
import { Container } from "react-bootstrap";

export const Footer = () => (
	<Container className="text-center mt-5">
		<p>
			Made with <i className="fa fa-heart text-danger" /> by{" "}
			<a href="http://www.4geeksacademy.com">EZ Prospect</a>
		</p>
	</Container>
);
