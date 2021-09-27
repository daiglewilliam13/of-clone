import React from 'react';
import {Container} from 'react-bootstrap';
import '../Sidebar/content-wrapper.css';

const More = (props) => {
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

export default More;
