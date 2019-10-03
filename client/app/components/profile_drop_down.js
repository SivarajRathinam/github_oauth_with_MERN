import React from 'react';
import '../styles/profile.scss';

export default (props)=>{
	if (props.isVisible && props.userData){
		let userData = props.userData
		let data = <div>
					<span>you signed in as </span>
					<span>{userData.login}</span>
					</div>
		return <div className="profile-popup">
					{data}
				</div>
	}
	return null
}