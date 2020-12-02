import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import { BusinessDetails } from "./views/businessDetails";
import { Prospects } from "./views/prospects";
import injectContext, { Context } from "./store/appContext";
import { ProspectDetails } from "./views/prospectDetails";

import { NavigationBar } from "./component/navbar";
import { Footer } from "./component/footer";
import { useContext } from "react";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";

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
					<Landing />
					{store.business.length == 0 ? (
						<div className="d-flex justify-content-center mt-5">
							<Spinner animation="border" role="status" variant="primary">
								<span className="sr-only justify-content-center">Loading...</span>
							</Spinner>
						</div>
					) : (
						<Switch>
							{/* <Route exact path="/">
								<Home data={store.business} />
							</Route> */}
							<Route exact path="/businessDetails/:id">
								<BusinessDetails data={store.business} />
							</Route>
							<Route exact path="/prospects">
								<Prospects />
							</Route>
							<Route exact path="/prospectDetails/:id">
								<ProspectDetails />
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
