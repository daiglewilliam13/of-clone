import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Post.css';
import axios from 'axios';

const tOptions = {
	year: 'numeric',
	month: 'short',
	day: '2-digit',
	hour: 'numeric',
	minute: '2-digit',
};
const Posts = () => {
	const [postData, setPostData] = useState([]);
	
	useEffect(() => {
		let isMounted = true;
		axios.get('https://wondering-shipments.run-us-west2.goorm.io/data').then(res => {
			if(isMounted) setPostData(res.data);
		})
		return () => {isMounted = false};
	}, []);

	return (
		<>
			{postData.map((posts, index) => (
				<div className="post-wrapper" key={index}>
					<div className="post-header">
						<div className="post-profile-picture">
							<img src="../images/profilepicturesample.jpg" alt=""></img>
						</div>
						<div className="username">
							<p>{posts.username}</p>
						</div>
						<div className="post-date">
							<p>{new Date(posts.createdAt).toLocaleDateString('en-us', tOptions)}</p>
						</div>
						<div className="post-title">
							<h3>{posts.postTitle}</h3>
						</div>
					</div>
					<div className="post-content">
						<div className="post-text">
							<p>{posts.postText}</p>
						</div>
						<div className="post-image">
							<img src={posts.postPicture} alt=""></img>
						</div>
					</div>
				</div>
			))}
		</>
	);
};
export default Posts;