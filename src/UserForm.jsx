import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import "./UserForm.css";


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
        setMessage(''); // Clear the input field after sending the message
    };

    const handleLogOut = () =>{
        localStorage.removeItem('token');
        navigate('/', {replace: true})
    }

  /*  useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data);
            setMessages(prevMessages => [...prevMessages, data]);
        });
    }, []);*/
    useEffect(() => {
        socket.on("receive_message", (data) => {
            // Check if the message is already in the state
            const isMessageAlreadyPresent = messages.some(
                (msg) => msg.text === data.text && msg.sender === data.sender
            );

            // If the message is not already present, add it to the state
            if (!isMessageAlreadyPresent) {
                setMessages((prevMessages) => [...prevMessages, data]);
            }
        });
    }, [messages]); // Include messages in the dependency array to ensure useEffect runs when messages change



    return (

        <div className="UserForm" id={theme}>
            <button className="log-out-button" onClick={handleLogOut}>Log out</button>
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
                    <ul>
                        {messages.map((msg, index) => (
                            <li
                                key={index}
                                className={`${msg.sender === username ? "sent" : "received"}`}
                            >
                                {`${msg.sender}: ${msg.text}`}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="input">
                <input
                    className="messages"
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
