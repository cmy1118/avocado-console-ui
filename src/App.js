import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";


import { NotFound, Main } from "./pages";

const App = (()=>{
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/" component={Main}/>
					<Route component={NotFound}/>
				</Switch>
			</BrowserRouter>
		);
})

export default App;