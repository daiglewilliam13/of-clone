import React, { useState, useEffect } from 'react';
import '../Sidebar/content-wrapper.css';
import './messages.css';
import axios from 'axios';
import Conversation from '../Conversation/Conversation';
import Message from '../Message/Message';

const Messages = (props) => {
	const [hasSent, setHasSent] = useState(false);
	const [conversations, setConversations] = useState([]);
	const [hasLoaded, setHasLoaded] = useState(false);
	const userData = JSON.parse(localStorage.getItem('userData'));
	const token = userData.token;
	const axiosConfig = {
		headers: {
			'Content-Type': 'application/json',
			'x-access-token': token,
		},
	};
	const triggerRefresh = () => {
		setHasSent((hasSent) => !hasSent);
		const messageBody = document.querySelector('.conversation-box');
		messageBody.scrollTop = messageBody.scrollHeight;
	};

	const getConversations = () => {
		const userId = { id: userData.id };
		let foundConvos = [];
		let updatedConvos = [];
		axios
			.post(
				'https://wondering-shipments.run-us-west2.goorm.io/getConversations',
				userId,
				axiosConfig
			)
			.then((res) => {
				foundConvos = res.data;
				console.log(foundConvos);
			})
			.then(() =>
				Promise.all(
					foundConvos.map((convo, i) =>
						Promise.all(
							convo.members.map((member, i) =>
								axios({
									method: 'post',
									url:
										'https://wondering-shipments.run-us-west2.goorm.io/getUsername',
									data: {
										id: member,
									},
								}).then((res) => {
									const username = res.data;
									convo.messages.map((message) => {
										if (message.sentBy === convo.members[i]) {
											message.sentBy = username;
										}
									});
									convo.members[i] = username;
								})
							)
						)
					)
				)
			)
			.then(() => {
				setConversations(foundConvos);
				setHasLoaded(true);
			});
	};
	useEffect(() => {
		getConversations();
		//TODO: add websockets for real-time updates without polling
	}, [hasSent]);

	return (
		<>
				<div className="messages-wrapper">
					<div className="conversations-box">
						<div className="conversations-box-wrapper">
							<div>
								<p>Online Friends/conversations</p>
							</div>
							<Conversation />
							<Conversation />
							<Conversation />
							<Conversation />
						</div>
					</div>
					<div className="chatbox">
						<div className="chatbox-wrapper">
							<div className="chatbox-top">
								<Message own={true} />
								<Message />
								<Message />
								<Message />
							</div>
							<div className="chatbox-bottom">
								<textarea
									className="chat-message-input"
									placeholder="...say something!"
								></textarea>
								<button className="message-send-button">Send</button>
							</div>
						</div>
					</div>
				</div>
		</>
	);
};

export default Messages;