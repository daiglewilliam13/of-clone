import React from 'react'
import './pagenotfound.css';
import {Link} from 'react-router-dom';

const PageNotFound = () => {
	return(
		<div className="wrapper">
		<h1 className="header">404</h1>
		<h3>Page Not Found</h3>
		<Link to="/">Go Back</Link>
		</div>
	)
}

export default PageNotFound;