import React, {useRef, useState} from 'react';
import Axios from 'axios';
import {useLocation, useNavigate} from 'react-router-dom';
import {WebSocket} from "vite";

function UserForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const socket= useRef();
    const [username]= userState('')
    const[value, setValue] = useState('')
    const[messages, setMessages] = useState([])
    //create condition which will display weither we connected to server or not
    const [connected, setConnected] = useState(false)

    const token = localStorage.getItem('token');

    const {token1, username1} = location.state;

    if(token)
    {
        Axios.defaults.headers.common['Authorization'] = 'Bearer ${token}';
    }
    else
    {
        navigate("/", {replace: true});
        console.log("No token provided!")
    }



    //create 'connect' function to connect to our websocket server
    function connect(){
        socket.current = new WebSocket('ws://localhost:3000')

        socket.current.onopen=()=>{
            setConnected(true)
            console.log("Connection happened")

            const message ={
                event: 'connection',
                username,
                id:Date.now()
            }
            socket.current.send(JSON.stringify(message))
        }

        socket.current.onmessage=(event)=>{
             const message = JSON.parse(event.data)
             setMessages(prev=>[message, ...prev])
        }

        socket.current.onclose =()=>{
            console.log("Socket is closed")
        }

        socket.current.onerror = ()=>{
            console.log("Error happened")
        }
    }

    const sendMessage = async () => {
        const message ={
            username:value,
            id: Date.now(),
            event:'message'
        }
        socket.current.send(JSON.stringify(message))
        setValue('')
    }



    return (
        <div className="center">
            <h2>{username1} successfully signed in </h2>
            <div>
                <div className="form">
                    <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
                    <button onClick={sendMessage}>Отправить</button>
                </div>
                <div className="messages">
                    {messages.map(mess =>
                        <div key={mess.id}>
                            {mess.event === 'connection'
                                ? <div className="connection_message">
                                    Пользователь {mess.username} подключился
                                </div>
                                : <div className="message">
                                    {mess.username}. {mess.message}
                                </div>
                            }
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}

export default UserForm;