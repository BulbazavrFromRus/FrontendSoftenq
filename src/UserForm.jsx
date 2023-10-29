import React from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserForm() {
    const navigate = useNavigate();


    const token = localStorage.getItem('token');

    if(token)
    {
        Axios.defaults.headers.common['Authorization'] = 'Bearer ${token}';
    }
    else
    {
        navigate("/", {replace: true});
        console.log("No token provided!")
    }


    return (
        <div>
            <h2>Successful User</h2>
        </div>
    );
}

export default UserForm;