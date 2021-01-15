import React, { Component, useContext } from "react";
import { Container } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import "../../styles/index.scss";
import { Context } from "../store/appContext";

export const Footer = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5 base-color mt-auto">
			<Container className="d-flex justify-content-between">
				{/* <div className="footer-social">
					<i className="fab fa-facebook" />
					<i className="fab fa-instagram" />
					<i className="fab fa-twitter" />
				</div> */}
			</Container>
			<p>© EZ Prospect, Inc. All rights reserved</p>
		</div>
	);
};
