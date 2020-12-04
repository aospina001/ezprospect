import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import { BusinessDetails } from "./views/businessDetails";
import { Prospects } from "./views/prospects";
import injectContext, { Context } from "./store/appContext";
import { ProspectDetails } from "./views/prospectDetails";
import { Landing } from "./views/landing";

import { NavigationBar } from "./component/navbar";
import { Footer } from "./component/footer";
import { useContext } from "react";
import { useEffect } from "react";
import { Spinner, Container } from "react-bootstrap";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	const { store, actions } = useContext(Context);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		actions.loadData();
		setLoading(false);
	}, []);

	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<NavigationBar />
					{store.business.length == 0 ? (
						<div className="mt-5 text-center">
							<Spinner animation="border" role="status" variant="success">
								<span className="sr-only justify-content-center">Loading...</span>
							</Spinner>
						</div>
					) : (
						<Switch>
							<Route exact path="/">
								<Landing />
							</Route>
							<Route exact path="/logged">
								<Home />
							</Route>
							<Route exact path="/businessDetails/:id">
								<BusinessDetails data={store.business} />
							</Route>
							<Route exact path="/prospects">
								<Prospects />
							</Route>
							<Route exact path="/prospectDetails/:id">
								<ProspectDetails data={store.business} />
							</Route>
							<Route>
								<h1>Not found!</h1>
							</Route>
						</Switch>
					)}
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
