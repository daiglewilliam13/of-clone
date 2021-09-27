import React, { useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import '../Sidebar/content-wrapper.css';
import './messages.css';
import axios from 'axios';
import Conversation from '../Conversation/Conversation';

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
		console.log(hasSent);
	}



	const getConversations = () => {
		const userId = { id: userData.id };
		let foundConvos = [];
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
				console.log(conversations);
				setHasLoaded(true);
			});
	};
	useEffect(() => {
		getConversations();
		//TODO: add websockets for real-time updates without polling
	}, [hasSent]);

	return (
		<>
		<Container>
			<div className="content-wrapper">
				<div className="header-bar">
					<h3>{props.content}</h3>
				</div>
				<div>
					<p>Conversations:</p>
				</div>
				<div className={`${hasLoaded ? 'expanded' : 'hidden'}`}>
					{conversations.map((conversations, index) => (
						<ul>
							<li>
								<Conversation
									conversation={{ ...conversations }}
									user={{ ...userData }}
									axiosConfig={{...axiosConfig}}
									triggerRefresh={triggerRefresh}
									key={conversations._id}
								/>
						
							</li>
						</ul>
					))}
				</div>

			</div>
		</Container>
		<p className={`${hasLoaded ? 'hidden' : 'expanded'} loading-status`}>Loading Messages....</p>
	</>
	);
	
};

export default Messages;