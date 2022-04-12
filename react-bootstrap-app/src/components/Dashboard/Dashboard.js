import React from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import NavigationBar from '../Navigationbar/NavigationBar';
import SideBar from '../Sidebar/SideBar';
import { ShieldLock } from 'react-bootstrap-icons';


const Dashboard = (props) => {

	return(
	<>
		<NavigationBar user={{...props.user}} />
		<SideBar user={{...props.user}}/>
		<ShieldLock className="background-icon" />
	</>
	)
}

export default Dashboard;
