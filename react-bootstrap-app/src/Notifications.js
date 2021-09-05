import React from 'react';
import {Container} from 'react-bootstrap';
import './content-wrapper.css';

const Notifications = (props) => {
	return(
		<Container>
		<div className="content-wrapper">
			<div className="header-bar">
				<h3>{props.content}</h3>
			</div>
		</div>
		</Container>
	)
}

export default Notifications;

