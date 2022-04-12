import React, { createContext } from 'react';

export const data = JSON.parse(localStorage.getItem('userData'));

export const UserContext = React.createContext(data);
