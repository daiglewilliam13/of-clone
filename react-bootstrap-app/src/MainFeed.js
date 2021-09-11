import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import './MainFeed.css';
import  Posts from './Post';


const MainFeed = (props) => {

	return(
	<Container>
		<div className="main-feed">
			<div className="header-bar">
			<h3>Recent Posts</h3>
			</div>
			<div className="posts">
			<Posts />
			</div>
		</div>	
	</Container>
	)
}


export default MainFeed;