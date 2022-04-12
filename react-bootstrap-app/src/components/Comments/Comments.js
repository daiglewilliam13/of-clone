import React, { useState, useEffect } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import CommentSubmitForm from '../CommentSubmitForm/CommentSubmitForm';
import IndividualComment from '../IndividualComment/IndividualComment';

const Comments = (props) => {
	const [commentData, setCommentData] = useState({});
	const [commentsLoaded, setCommentsLoaded] = useState(false);
	const userData = JSON.parse(localStorage.getItem('userData'));
	const axiosConfig = {
		headers: {
			'Content-Type': 'application/json',
			'x-access-token': userData.token,
		},
	};

	const getComments = () => {
		let postComments = props.post.comments;
		let foundComment;
		Promise.all(
			postComments.map((comment, i) => {
				const commentId = { _id: comment };
				return axios
					.post(
						'https://wondering-shipments.run-us-west2.goorm.io/getCommentData',
						commentId,
						axiosConfig
					)
					.then((res) => {
						foundComment = res.data;
						return foundComment;
					});
			})
		).then((results)=>{
			setCommentData(results);
			setCommentsLoaded(true);
		})
	};

	useEffect(() => {
		getComments();
	}, []);
	return commentsLoaded ? (
		<div>
			{console.log(commentData)}
			<div>
				{commentData.map((comment, i)=> (
				<IndividualComment commentData={comment} />
				))}
			</div>
			<CommentSubmitForm
				user={{ ...props.user }}
				post={{ ...props.post }}
				axiosConfig={{ ...axiosConfig }}
			/>
		</div>
	) : (<p>loading</p>)
};

export default Comments;