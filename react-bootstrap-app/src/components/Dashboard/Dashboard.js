import React from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import NavigationBar from '../Navigationbar/NavigationBar';
import SideBar from '../Sidebar/SideBar';


const Dashboard = (props) => {

	return(
	<>
	<Container>
		<NavigationBar user={{...props.user}} />
		<SideBar user={{...props.user}}/>
	</Container>
	</>
	)
}

export default Dashboard;
