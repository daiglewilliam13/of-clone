import React from "react";
import axios from 'axios';



export default class ButtonSample extends React.Component {

constructor() {
	  super();
	  this.state = {
		  data: []
	  };
	  this.handleClick = this.handleClick.bind(this);
  }
	
handleClick(){
	axios.get('https://wondering-shipments.run-us-west2.goorm.io/data')
	.then((res)=>{
		let users = res.data;
		let usernames = users.map(a => a.username );
		this.setState({data:usernames});
		console.log(this.state);
		console.log(usernames);
	});

}


  render() {
	const displaynames = this.state.data.map((username, i) =>
		<React.Fragment>
		<li key={i}>{username}</li>
		</React.Fragment>
	);
    return (
      <div className="container-fluid" >
        <div className="row">
          <div className="col-xs-12" >
            <button
              className="btn btn-primary"
              onClick={this.handleClick}
            >
              Click
            </button>
			 <div>
				 <ul>
				 {displaynames}
				</ul>
			  </div>
          </div>
        </div>
      </div>
    );
  }
}