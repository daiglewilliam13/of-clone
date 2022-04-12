import React from 'react';
import "./message.css";


export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="message-wrapper">
        <img
          className="message-img"
          src="../../images/default-profile-photo.jpg"
          alt=""
        />
        <p className="message-text">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
      </div>
      <div className="message-ago">10 min ago</div>
    </div>
  );
}