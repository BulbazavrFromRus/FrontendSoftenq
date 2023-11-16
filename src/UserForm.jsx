import React, {useEffect,useRef, useState} from 'react';
import Axios from 'axios';
import {useLocation, useNavigate} from 'react-router-dom';
import io from 'socket.io-client'
//import {useEffect} from 'react'

const socket =io.connect("http://localhost:8001")


function UserForm() {
    const navigate = useNavigate();
    const location = useLocation();

    const token = localStorage.getItem('token');

    const[message, setMessage] = useState("")
    const[messageReceived, setMessageReceived] = useState("")

    //we find 'username' in localStorage
    //state - состояние
    const {username} = location.state;


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


    //we create function after that we will send message
    //by putting on the button we will send message
    const sendMessage = ()=>{
        socket.emit("send_message", message)
        console.log("DDJKKGHKJL", message);
    };

    useEffect(() => {
    //
    //     socket.on("receive_message", (data) => {
    //         setMessageReceived(data.message);
    //     });
    // }, [socket]);
        console.log("fgesdfsds");
    socket.on("connection", () => {
            if(socket.connected){
                console.log("Everything is good")
            }
            socket.emit("send_message", "AASAAAAAAAA")
            console.log("conioecewfw");
        });
    }, [socket]);



    return (
        <div>
            <h2>{username} successfully signed in </h2>
            <div className = "UserForm">
                <input placeholder="Message..." onChange= {(event)=>
                setMessage(event.target.value)
                }/>
                <button onClick={sendMessage}>Send message</button>
                <h1>Message:</h1>
                {messageReceived}
            </div>
        </div>
    );
}

export default UserForm;