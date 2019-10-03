import React from 'react';
import Login from './components/login'
import Layout from './layout/index'
import {Route,BrowserRouter as Router,Switch} from 'react-router-dom'
export default ()=>{
	
	return <React.Fragment>
				<Router>
					<Layout>
						<Switch>
							<Route path='/' exact component={Login}></Route>	
						</Switch>
					</Layout>
				</Router>
			</React.Fragment>

}