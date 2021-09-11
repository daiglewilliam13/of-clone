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

// const foundPosts = async () => {
// 	let result = await getNewPosts();
// 	return result.data;
// };

// const postArr = async () => {
// 	let results = foundPosts()
// 		.then((arr) => {
// 		let newArrPromise = arr.map(obj => ({...obj, username:postUsername(obj.author)}));
// 		const results = Promise.all(newArrPromise);
// 		return results;
// 	})
// 	return results;
// };

// const postUsername = async (id) => {
// 	let username = await getUsername(id)
// 	.then(res =>{
// 		return res
// 	})
// 	return username
// }
// const getUsername = async (id) => {
// 	return new Promise((resolve, reject) => {
// 				axios({
// 				method: 'post',
// 				url: 'https://wondering-shipments.run-us-west2.goorm.io/getUserInfo',
// 				data: {
// 					id:id
// 				},
// 			}).then(res =>{
// 				resolve(res.data.username);
// 			})
// 	})
// };



const Posts = () => {
	const [postData, setPostData] = useState([
		{
			username: '',
			profilePicture: '',
		},
	]);
	const [hasLoaded, setHasLoaded] = useState(false);
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
			{postData.map((posts, index) => (
				<div className="post-wrapper" key={index}>
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
					</div>
				</div>
			))}
		</>
	) : (
		<p>Loading Posts...</p>
	);
};
export default Posts;