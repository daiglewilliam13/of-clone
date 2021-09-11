import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import './content-wrapper.css';
import './create.css';
import axios from 'axios';

const Create = (props) => {
	const [postDetails, setPostDetails] = useState({});
	const handleSubmit = (e) => {
		e.preventDefault();
		const userData = JSON.parse(localStorage.getItem('userData'));
		console.log(userData);
		const token = userData.token;
		console.log(token)
		const axiosConfig = {
			headers: {
			'Content-Type': 'application/json',
			'x-access-token': token,
			}
		};
		const postData = {
			postText: postDetails.postText,
			postTitle: postDetails.postTitle,
			createdAt: Date.now(),
			author: userData.id,
		};
		axios
			.post('https://wondering-shipments.run-us-west2.goorm.io/posts', postData, axiosConfig)
			.then((response) => {
				console.log(response);
			});
	};
	return (
		<Container>
			<div className="content-wrapper">
				<div className="header-bar">
					<h3>{props.content}</h3>
				</div>
				<div className="post-create-form">
					<form>
						<label>
							Title:
							<input
								type="text"
								name="title"
								onChange={(e) =>
									setPostDetails({ ...postDetails, postTitle: e.target.value })
								}
							/>
						</label>
						<label>
							Text:
							<textarea
								type="text"
								name="postText"
								onChange={(e) =>
									setPostDetails({ ...postDetails, postText: e.target.value })
								}
							/>
						</label>
						<input type="submit" value="Submit" onClick={handleSubmit} />
					</form>
				</div>
			</div>
		</Container>
	);
};

export default Create;