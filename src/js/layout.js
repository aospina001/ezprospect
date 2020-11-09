import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import { BusinessDetails } from "./views/businessDetails";
import { Prospects } from "./views/prospects";
import injectContext from "./store/appContext";
import { ProspectDetails } from "./views/prospectDetails";

import { NavigationBar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<NavigationBar />
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/businessDetails">
							<BusinessDetails />
						</Route>
						<Route exact path="/prospects">
							<Prospects />
						</Route>
						<Route exact path="/prospectDetails">
							<ProspectDetails />
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
