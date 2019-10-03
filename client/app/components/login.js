import React from 'react';
import '../styles/login.scss';
import  axios from 'axios';
const Login = ()=>{
	const clickHandler=()=>{
		window.location.href='/api/login'
	}
	return <div className="container is-narrow-fullhd login">
				<div className="box login-button-container">
					<button className="button is-medium is-dark is-center" onClick={()=>clickHandler()}>
			    		<span>Login With GitHub</span>
  					</button>
				</div>
  			</div>
}

export default Login; 