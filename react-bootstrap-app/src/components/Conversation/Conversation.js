import React, { useState, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import '../Sidebar/content-wrapper.css';
import '../Messages/messages.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const Conversation = (props) => {
	let history = useHistory();
	const [messageDetails, setMessageDetails] = useState({});
	const [click, setClick] = useState(false);
	const [expanded, setExpanded] = useState(false);
	const [hasLoaded, setHasLoaded] = useState(false);
	const [convoDetails, setConvoDetails] = useState([{}]);
	const conversation = props.conversation;
	const toggleExpand = () => {
		setExpanded((expanded) => !expanded);
	};
	const triggerRefresh = () => {
		props.triggerRefresh();
	}
	
	const recipientEl = useRef();
	const message = useRef();
		const handleSubmit = (e) => {
		e.preventDefault();
		console.log('sent');
		const messageData = {
			recipient: recipientEl.current.value,
			messageTitle: messageDetails.messageTitle,
			createdAt: Date.now(),
			author: props.user.id,
			messageText: messageDetails.messageText,
		};
		axios
			.post(
				'https://wondering-shipments.run-us-west2.goorm.io/sendMessage',
				messageData,
				props.axiosConfig
			)
			.then((res) => {
				message.current.value = "";
				triggerRefresh();
			});
	};
	return  (
		<>
			<div>
				<div>
					<hr></hr>
					<span onClick={toggleExpand}>
						Conversation with{' '}
						{conversation.members[0] == props.user.username
							? conversation.members[1]
							: conversation.members[0]}
					</span>
					{props.conversation.messages.map((message, index) => (
						<ul className={`${expanded ? 'expanded' : 'hidden'}`}>
							<li>
								{message.sentBy}: {message.text}
							</li>
						</ul>
					))}
					<div className={`${expanded ? 'expanded' : 'hidden'}`}>
						Reply:
					<div className="message-create-form">
							<form>
								<label className="recipient">
									<input
										type="text"
										name="Send To"
										defaultValue={`${
											conversation.members[0] == props.user.username
												? conversation.members[1]
												: conversation.members[0]
										}`}
										ref={recipientEl}
									/>
								</label>
								<label>
									Text:
									<textarea
										type="text"
										name="postText"
										ref={message}
										onChange={(e) =>
											setMessageDetails({
												...messageDetails,
												messageText: e.target.value,
											})
										}
									/>
								</label>
								<input type="submit" value="Submit" onClick={handleSubmit} />
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Conversation;