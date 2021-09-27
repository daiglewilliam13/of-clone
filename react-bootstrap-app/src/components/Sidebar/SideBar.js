import React, {useState, useEffect} from 'react';
import '../../App.css';
import './SideBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
import { HouseFill, ChatSquareTextFill, BellFill, BookmarkFill, ThreeDots,PlusSquareFill, PersonCircle } from 'react-bootstrap-icons';
import { Link, Switch, Route, useParams} from 'react-router-dom';
import Messages from '../Messages/Messages';
import MainFeed from '../MainFeed/MainFeed';
import Saved from '../Saved/Saved';
import Notifications from '../Notifications/Notifications';
import More from '../More/More';
import Create from '../Create/Create';
import Profile from '../Profile/Profile';
import axios from 'axios';


function SideBar(props) {
	const [profileData, setProfileData] = useState({});
	let userData = JSON.parse(localStorage.getItem('userData'));
	useEffect(() =>{
		
		axios({
			method: 'post',
			url: 'https://wondering-shipments.run-us-west2.goorm.io/getUserInfo',
			headers: {
				'x-access-token': userData.token ,
			},
			data: {
				id:userData.id,
			},
		}).then(response => {
			setProfileData(response.data);
		})
	},[]);
	return(
		
        <>
            <Nav 
			className="d-md-block bg-dark sidebar"
            activeKey="/home"
            >
                <div className="sidebar-sticky"></div>
            <Nav.Item>
                <Nav.Link as={Link} to="/dashboard/home/" className="nav-link"><HouseFill /><span className="sidebar-link-text">Home</span></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link}to="/dashboard/messages" className="nav-link"><ChatSquareTextFill /><span className="sidebar-link-text">Messages</span></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/dashboard/notifications" className="nav-link"><BellFill /><span className="sidebar-link-text">Notifications</span></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/dashboard/saved" className="nav-link"><BookmarkFill /><span className="sidebar-link-text">Saved Posts</span></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/dashboard/more" className="nav-link"><ThreeDots /><span className="sidebar-link-text">More</span></Nav.Link>
            </Nav.Item>
			<Nav.Item>
                <Nav.Link as={Link} to="/dashboard/create" className="nav-link"><PlusSquareFill /><span className="sidebar-link-text">Create</span></Nav.Link>
            </Nav.Item>
			<Nav.Item>
                <Nav.Link as={Link} to="/dashboard/profile" className="nav-link"><PersonCircle /><span className="sidebar-link-text">Profile</span></Nav.Link>
            </Nav.Item>
            </Nav> 
			<Switch>
				<Route path="/dashboard/messages" >
					<Messages content="Messages" />
				</Route>
				<Route path="/dashboard/home/" >
					<MainFeed content="Main Feed" user={{...profileData}}/>
				</Route>
				<Route path="/dashboard/saved" >
					<Saved content="Saved" />
				</Route>
				<Route  path="/dashboard/notifications" >
					<Notifications content="Notifications" />
				</Route>
				<Route path="/dashboard/more" >
					<More content="More"/>
				</Route>
				<Route path="/dashboard/create" >
					<Create content="Create a post" user={{...profileData}}/>
				</Route>
				<Route path="/dashboard/profile" >
					<Profile content="Your Profile" user={{...profileData}}/>
				</Route>
			</Switch>
        </>

	)
}

export default SideBar;