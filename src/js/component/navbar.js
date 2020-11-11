import React from "react";
import { Link } from "react-router-dom";
import { Button, Navbar, Dropdown, Nav, FormControl, Container, Image, NavLink } from "react-bootstrap";

export const NavigationBar = () => {
	let value = null;
	return (
		<Container fluid={true}>
			<Navbar bg="light" className="mt-3">
				<Link to="/">
					<Navbar.Brand>EZ Prospect</Navbar.Brand>
				</Link>
				<Navbar.Collapse className="justify-content-end">
					<Link to="/prospects">
						<Button variant="primary" className="mx-3">
							My Prospect
						</Button>
					</Link>

					<Dropdown drop="down">
						<Dropdown.Toggle variant="primary" id="dropdown-basic">
							<i className="fas fa-bars" />
						</Dropdown.Toggle>

						<Dropdown.Menu align="right">
							<Dropdown.Item>Saved</Dropdown.Item>
							<Dropdown.Divider />
							<Dropdown.Item href="#action/3.4">Log out</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Navbar.Collapse>
			</Navbar>
			<Image src="https://www.liferemodeled.com/wp-content/uploads/2017/09/Financials-Banner-1.jpg" fluid />
		</Container>
	);
};
