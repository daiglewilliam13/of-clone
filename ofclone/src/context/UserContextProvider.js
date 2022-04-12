import React, {useContext} from 'react';
import {UserContext} from './UserContext';

 export const UserContextProvider = ({user, children}) => {
	 const currentUser = useContext(UserContext);
	return(
	<UserContext.Consumer value={currentUser}>
	{(value)=><span>{children}</span>}
	</UserContext.Consumer>
	)
}