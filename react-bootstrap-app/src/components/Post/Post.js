import React, { useState, useEffect } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Post.css';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import Comments from '../Comments/Comments';

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
				likedBy: userId
			}
		}).then((res)=>{
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
									const username = res.data.username;
									post.likedBy.includes(props.user._id) ? post.isLiked=true : post.isLiked=false;
									post.username = username;
									post.profilePicture = "../../images/default-profile-photo.jpg";
									
								})
						)
					).then(()=>{
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
		<div className="posts">
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
						<p><Button className="like-button" onClick={handleLike} objectid={posts._id}>{posts.isLiked? <HeartFill /> : <Heart />} {posts.likes}</Button></p>
						</div>
						<div className="post-comments">
						<p>{posts.comments.length} Comments</p>
						<Comments 
							post={{...posts}}
							user={{...props.user}}/>
						</div>
					</div>
				</div>
			))}
		</div>
		</>
	) : (
		<p className="loading-status">Loading Posts...</p>
	);
};
export default Posts;