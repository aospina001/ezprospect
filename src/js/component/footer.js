import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import "../../styles/index.scss";

export const Footer = () => (
	<div className="text-center mt-5 base-color">
		<Container className="d-flex justify-content-between">
			<ul className="footer-links">
				<li>About Us</li>
				<li>Contact Us</li>
			</ul>
			<div className="footer-social">
				<i className="fab fa-facebook" />
				<i className="fab fa-instagram" />
				<i className="fab fa-twitter" />
			</div>
		</Container>
		<p>© EZ Prospect, Inc. All rights reserved</p>
	</div>
);
