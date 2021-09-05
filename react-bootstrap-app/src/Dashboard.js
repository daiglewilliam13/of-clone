import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import SideBar from './SideBar';


const Dashboard = (props) => {
	return(
	<>
	<Container>
		<NavigationBar user={{...props.user}} />
		<SideBar user={{...props.user}}/>
	</Container>
	<div>
	<ul>
	<p></p>
	</ul>
	</div>
	</>
	)
}

export default Dashboard;
