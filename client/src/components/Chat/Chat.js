import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css'
import InfoBar from '../Infobar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

let socket;

const Chat = () => {
    const [name,setName]=useState('');
    const [room,setRoom]=useState('');
    const [message,setMessage]=useState(''); 
    const [messages,setMessages]=useState([]);
    const [users,setUsers]=useState([]);
    const ENDPOINT='localhost:5000';
    const location = useLocation()
    useEffect(() => {
        const {name,room} = queryString.parse(location.search);

        socket=io(ENDPOINT,{transports: ['websocket', 'polling', 'flashsocket']});

        setName(name);
        setRoom(room);

        socket.emit('join',{name,room},()=>{

        });
        
        return ()=>{
            socket.emit('disconnect');

            socket.off();
        }
    },[ENDPOINT,location.search]);

    useEffect(() =>{
        socket.on('message', (message)=>{
            setMessages([...messages,message]);
        })

        socket.on('roomData',(users)=>{
            setUsers(users);
        })
    },[messages])

    

    const sendMessage=(event)=>{
        event.preventDefault();

        if(message){
            socket.emit('sendMessage',message,()=>setMessage(''));
        }
    }

    // console.log( message);
    // console.log( messages);

    return (
      <div className="outerContainer">
        <div className="container">
            <InfoBar room={room}/>
            <Messages messages={messages} name={name}/>
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
        </div>
        {/* <TextContainer users={users}/> */}
      </div>
    );
}

export default Chat;