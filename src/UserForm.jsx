/*import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:8001");

function UserForm() {
    const navigate = useNavigate();
    const location = useLocation();

    const token = localStorage.getItem('token');
    const [message, setMessage] = useState('');
    const [messageReceived, setMessageReceived] = useState('');

    const { username } = location.state;


    if (token) {
        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        navigate("/", { replace: true });
        console.log("No token provided!");
    }


    const sendMessage = () => {
        socket.emit("send_message", message);
        console.log('Sent message:', message);
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data)
            setMessageReceived(data);
        });
    }, []);

    return (
        <div>
            <h2>{username} successfully signed in </h2>
            <div className="UserForm">
                <input
                    placeholder="Message..."
                    onChange={(event) => setMessage(event.target.value)}
                />
                <button onClick={sendMessage}>Send message</button>
                <h1>Message:</h1>
                <div className="messages">
                    {messageReceived}
                </div>
            </div>
        </div>
    );
}

export default UserForm;*/

import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:8001");

function UserForm() {
    const navigate = useNavigate();
    const location = useLocation();

    const token = localStorage.getItem('token');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]); // New state for messages
    const { username } = location.state;

    const[theme, setTheme] = useState("light");

    const switchTheme = ()=>{
        setTheme((cur)=>(cur === "light"?"dark":"light"))
    }


    if (token) {
        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        navigate("/", { replace: true });
        console.log("No token provided!");
    }

    const sendMessage = () => {

        const messageData = { text: message, username: username };
        socket.emit("send_message", messageData);
        setMessages(prevMessages => [...prevMessages, { text: message, sender: username }]);
        //setMessage(''); // Clear the input field after sending the message
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data);
            setMessages(prevMessages => [...prevMessages, data]);
        });
    }, []);


    return (
        <div className="UserForm" id={theme}>
            <input onChange={switchTheme} type="checkbox" id="toggle-btn"/>
            <label htmlFor="toggle-btn" className="toggle-label"></label>
            <h2 style={{color: theme === "light" ? "black" : "yellow"}} className="heading">
                User: {username}
            </h2>
            <h1 style={{color: theme === "light" ? "black" : "blue"}}>
                Chat
            </h1>

            {/*Messages*/}
            <div className="chat-container">
                <div style={{color: theme === "light" ? "black" : "yellow"}} className="messages">
                    <ul >
                        {messages.map((msg, index) => (
                            <li key={index} className={msg.sender === username ? "sent" : "received"}>
                                {`${msg.sender}: ${msg.text}`}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="input">
                <input
                    placeholder="Message..."
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                />
                <button onClick={sendMessage}>Send message</button>
            </div>

        </div>
    );
}

export default UserForm;
