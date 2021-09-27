import React, {useState, useEffect} from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import NavigationBar from '../Navigationbar/NavigationBar';
import SideBar from '../Sidebar/SideBar';
import axios from 'axios';


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
