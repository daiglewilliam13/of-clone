import React, {useState} from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import {Link, Switch, Route, useHistory} from 'react-router-dom';
import './NavigationBar.css';
import About from '../About/About';
import { ShieldLock } from 'react-bootstrap-icons';

function NavigationBar(props) {
	const userData = JSON.parse(localStorage.getItem('userData'));
	let history = useHistory(); 
	const handleLogout = () => {
		localStorage.clear();
		history.push("/auth/login");
	}
	const [expanded, setExpanded] = useState(false);
	return(
	<Container>
	<Navbar expanded={expanded} collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
			<Navbar.Brand href="#" className="brand-logo"><ShieldLock /> TRULYFANS- Welcome, {userData.username} </Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
			<Navbar.Collapse id="responsive-navbar-nav" className="nav-links">
				<Nav>
				<Nav.Link as={Link} to="/dashboard/about" onClick={() => setExpanded(false)}>About</Nav.Link>
					<Button className="logout-button" onClick={handleLogout}>Logout</Button>
				<Form className="d-flex">
					<FormControl
						type="search"
						placeholder="Search"
						className="mr-2"
						aria-label="Search"
					/>
					<Button variant="outline-success">Search</Button>
				</Form>	
				</Nav>
			</Navbar.Collapse>
	</Navbar>
	<Switch>
		<Route exact path="/dashboard/about">
			<About content="About"/>
		</Route>
	</Switch>
	</Container>
	)
}

export default NavigationBar;