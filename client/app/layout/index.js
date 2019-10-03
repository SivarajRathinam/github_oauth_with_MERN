import React from 'react';
import Header from './header';

export default (props)=>{
	return <div className="container is-marginless is-fullhd">
				<Header/>
				{props.children}
			</div>
}