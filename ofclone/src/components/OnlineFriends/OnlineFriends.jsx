import React from 'react';
import './onlinefriends.css';

const OnlineFriends = (props) => {
	return (
		<>
			<div className="conversation-wrapper">
			
				<img 
					className="conversation-img"
					src="../../images/profilepicturesample.jpg"></img>
				<span className="conversation-username">Jane Doe</span>
			</div>
		</>
	);
};

export default OnlineFriends;