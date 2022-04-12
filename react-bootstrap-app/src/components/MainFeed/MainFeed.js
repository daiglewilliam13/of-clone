import React from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import '../Sidebar/content-wrapper.css';
import  Posts from '../Post/Post';


const MainFeed = (props) => {

	return(
		<div className="content-wrapper">
			<div className="header-bar">
			<h3>Recent Posts</h3>
			</div>
			<div className="post-container">
			<Posts user={{...props.user}}/>
			</div>
		</div>	
	)
}


export default MainFeed;