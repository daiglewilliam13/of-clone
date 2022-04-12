import React, {useState, useRef, useEffect, useContext } from 'react';
import '../../fonts.css';
import './sidebar.css';
import {Link} from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Sidebar = () => {
	const [sidebarExpanded, setSidebarExpanded] = useState(true);
	const [notification, setNotification] = useState(true);
	const sidebarRef = useRef(null);
	 useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (sidebarExpanded && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
		setSidebarExpanded(false)
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [sidebarExpanded]);
	return (
		<div ref={sidebarRef} className={`sidebar-nav ${sidebarExpanded ? 'sidebar-expand' : 'sidebar-hidden'}`} >
			<div className="sidebar-link-wrapper ">
				{notification ? <i className="fas fa-exclamation sidebar-notification"></i> : <span></span>}
				<i className={`fas fa-angle-double-right sidebar-toggle ${sidebarExpanded ? 'expanded-toggle' : 'collapsed-toggle'}`}
					onClick={()=>setSidebarExpanded((oldState)=>!oldState)}></i>
				<img className="sidebar-profile-picture"
					 src="../../images/profilepicturesample.jpg"
					 alt=""></img>
				<span className="sidebar-username">Jane Doe</span>
				<Link to="/">
				<button className="sidebar-nav-link">Feed</button>
				</Link>
				<Link to="/messenger">
					<button className="sidebar-nav-link">Messages</button>
				</Link>
				<button className="sidebar-nav-link">Friends</button>
				<button className="sidebar-nav-link">Profile</button>
				<button className="sidebar-nav-link">Settings</button>
			</div>
		</div>
	);
};
export default Sidebar;