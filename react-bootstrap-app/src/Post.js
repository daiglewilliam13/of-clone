import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Post.css';
import axios from 'axios';
import {Button} from 'react-bootstrap';

const tOptions = {
	year: 'numeric',
	month: 'short',
	day: '2-digit',
	hour: 'numeric',
	minute: '2-digit',
};



const Posts = (props) => {
	const [postData, setPostData] = useState([
		{
			username: '',
			profilePicture: '',
		},
	]);
	
	const [hasLoaded, setHasLoaded] = useState(false);
	const handleLike = (e) => {
		e.preventDefault();
		let userId = props.user._id;
		let postId = e.target.getAttribute('objectId');
		axios({
			method: 'post',
			url: 'https://wondering-shipments.run-us-west2.goorm.io/getLikes',
			data: {
				id: postId,
				likedBy: props.user._id
			}
		}).then((res)=>{
			console.log(res);
			getNewPosts();
		})
	}
	const getNewPosts = () => {
			let posts = [];
			axios
				.get('https://wondering-shipments.run-us-west2.goorm.io/posts')
				.then((res) => {
					posts = res.data;
				})
				.then(() =>
					Promise.all(
						posts.map((post) =>
							axios({
								method: 'post',
								url:
									'https://wondering-shipments.run-us-west2.goorm.io/getUserInfo',
								data: {
									id: post.author,
								},
							})
								.then((res) => {
									console.log(res.data);
									console.log(posts.includes(post.author));
									const username = res.data.username;
									const likes = res.data.likes;
									const comments = res.data.comments;
									post.username = username;
									post.profilePicture = "../../images/default-profile-photo.jpg";
									
								})
						)
					).then(()=>{
				posts.forEach((arr)=>{console.log(arr.likedBy)})
				setPostData(posts);
				setHasLoaded(true);
			})
				);
		};

	useEffect(() => {
		getNewPosts();
	}, []);
	return hasLoaded ? (
		<>
			{postData.map((posts, index) => (
				<div className="post-wrapper" key={posts._id} >
					<div className="post-header">
						<div className="post-profile-picture">
							<img src={posts.profilePicture} alt=""></img>
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
						<div className="post-likes">
						<p><Button onClick={handleLike} objectId={posts._id}>Likes: {posts.likes}</Button> </p>
						</div>
						<div className="post-comments">
						<p>Comments: {posts.comments}</p>
						</div>
					</div>
				</div>
			))}
		</>
	) : (
		<p>Loading Posts...</p>
	);
};
export default Posts;