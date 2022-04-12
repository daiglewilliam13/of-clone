import React, { useState, useRef, useEffect } from 'react';
import '../Sidebar/content-wrapper.css';
import '../Messages/messages.css';
import '../Conversation/conversation.css';
import axios from 'axios';

const Conversation = (props) => {
	return (
		<>
			<div className="conversation-wrapper">
				<img 
					className="conversation-img"
					src="../../images/default-profile-photo.jpg"></img>
				<span className="conversation-username">John Doe</span>
			</div>
		</>
	);
};

export default Conversation;