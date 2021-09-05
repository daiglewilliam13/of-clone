import React from 'react';
import './content-wrapper.css'
import {Container} from 'react-bootstrap';

const About = (props) => {
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

export default About;