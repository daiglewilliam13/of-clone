import React from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Comments/comments.css';

const IndividualComment = (props) => {
	return (
		<>
		<div className="comment-wrapper">
			<p>
				By {props.commentData.author.username} at {props.commentData.createdAt}
			</p>
			<p>{props.commentData.commentText}</p>
		</div>
		</>
	);
};

export default IndividualComment;