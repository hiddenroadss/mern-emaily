import axios from 'axios';

import { FETCH_USER, LOGOUT_USER } from './types';


export const fetchUser = () => async dispatch => {
    const {data} = await axios.get('/auth/current-user');
    dispatch({type: FETCH_USER, payload: data});
}

export const logoutUser = () => async dispatch => {
    await axios.get('/auth/logout');
    dispatch({type: LOGOUT_USER});
}