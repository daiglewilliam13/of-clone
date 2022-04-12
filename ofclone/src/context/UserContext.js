import React, { createContext } from 'react';

export const data = localStorage.getItem('userData');

export const UserContext = React.createContext(data);
