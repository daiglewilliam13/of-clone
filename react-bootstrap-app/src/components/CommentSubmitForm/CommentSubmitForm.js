import React, { useState, useRef } from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './comment-submit-form.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const CommentSubmitForm = (props) => {
	const [commentDetails, setCommentDetails] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();
		const commentId = {id:props.post._id}
		const commentData = {
			parent: props.post._id,
			author:{
				id:props.user._id,
				username:props.user.username
			},
			createdAt: Date.now(),
			commentText: commentDetails.commentText,
			likes: 1,
			likedBy: [props.user._id],
		};
		console.log(commentData);
		axios.post(
			'https://wondering-shipments.run-us-west2.goorm.io/addComment',
			commentData,
			props.axiosConfig
		).then((res)=>{
			console.log(res)
		})
	};
	const commentEl = useRef();
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="comment-parent"
					className="comment-parent"
					defaultValue={props.post._id}
					disabled
				/>
				<textarea
					type="text"
					name="postText"
					placeHolder="Add a comment..."
					onChange={(e) =>
						setCommentDetails({ ...commentDetails, commentText: e.target.value })
					}
					required
				/>
				<input type="submit" value="Comment" className="add-comment-button" />
			</form>
		</div>
	);
};

export default CommentSubmitForm;