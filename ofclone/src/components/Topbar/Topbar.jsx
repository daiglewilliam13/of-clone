import React from 'react';
import '../../fonts.css';
import './topbar.css';
import {useHistory} from 'react-router-dom';
import {handleLogout} from '../../handlers';

const Topbar = () => {
	let history = useHistory();
	const handleClick = (e) => {
		history.push("/home");
	}
	return (
		<div className="topbar-nav">
			<div className="topbar-link-wrapper">
				<i className="fas fa-unlock-alt topbar-logo"></i>
				<span className="topbar-sitename" >Trulyfans</span>
				<button className="topbar-nav-link" onClick={handleClick}>Home</button>
				<button className="topbar-nav-link" onClick={()=> handleLogout()}>Logout</button>
				<button className="topbar-search-submit" type="submit">
					Search
				</button>
				<input type="text" placeholder="search" className="search-input"></input>
			</div>
		</div>
	);
};
export default Topbar;