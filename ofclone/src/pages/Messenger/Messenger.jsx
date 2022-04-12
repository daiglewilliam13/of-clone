import React, {useEffect, useRef} from 'react';
import '../../fonts.css';
import './messenger.css';
import Topbar from '../../components/Topbar/Topbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Conversation from '../../components/Conversation/Conversation';
import Message from '../../components/Message/Message';
import OnlineFriends from '../../components/OnlineFriends/OnlineFriends';



const Messenger = () => {
	
const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
	return (
		<>
			<Topbar />
			<Sidebar />
			<div className="messenger-wrapper">
				<div className="conversations-wrapper">
					<input
						type="text"
						className="conversation-search-input "
						placeholder="search for conversation"
					></input>
					<Conversation />
					<Conversation />
					<Conversation />
					<Conversation />
					<Conversation />
				</div>
				<div className="chatbox">
					<div className="chatbox-wrapper">
						<div className="chatbox-top" >
						<div  ref={scrollRef}>
							<Message />
						</div>
						<div  ref={scrollRef}>
							<Message />
						</div>	
						<div  ref={scrollRef}>
							<Message />
						</div>
							<Message own={true} />
						</div>
						<div className="chatbox-bottom">
							<textarea className="chat-reply-input" placeholder=""></textarea>
							<button className="chat-submit-button">Reply</button>
						</div>
					</div>
				</div>
				<div className="online-friends-wrapper">
				<div className="online-friends-header">
				<p>Online Friends</p>
				</div>
					<OnlineFriends />
					<OnlineFriends />
					<OnlineFriends />
				</div>
			</div>
		</>
	);
};

export default Messenger;