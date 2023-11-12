import React, {useEffect,useRef, useState} from 'react';
import Axios from 'axios';
import {useLocation, useNavigate} from 'react-router-dom';
//import WebSocket from "ws";

function UserForm() {
    const navigate = useNavigate();
    const location = useLocation();

    const token = localStorage.getItem('token');

    const {token1, username} = location.state;




    if(token)
    {
        //Axios.defaults.headers.common['Authorization'] = 'Bearer ${token}';
        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    }
    else
    {
        navigate("/", {replace: true});
        console.log("No token provided!")
    }


    return (
        <div>
            <h2>{username} successfully signed in </h2>
        </div>
    );
}

export default UserForm;