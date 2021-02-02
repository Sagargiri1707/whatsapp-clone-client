import React, { useEffect, useState } from 'react';
import queryString from "query-string";
import io from 'socket.io-client'
import InfoBar from '../Infobar/infobar';
import Input from '../Input/input';
import Messages from '../messages/messages'
import TextContainer from '../TextContainer/TextContainer';
require('./chat.css')
var connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", 
    "timeout" : 10000,                  
    "transports" : ["websocket"]
};
let socket
function Chat({location}) {
    const [name,setName]=useState('')
    const [room,setRoom]=useState('')
    const [message,setMessage]=useState('')
    const [messages,setMessages]=useState([])
    const [users, setUsers] = useState('');
    useEffect(()=>{
        const {name,room}=queryString.parse(location.search)
        socket=io('localhost:5000',connectionOptions)
        setRoom(room)
        setName(name)
        socket.emit('join',{name,room},(err)=>{if(err)alert(err)})
        
    },[location.search])

    useEffect(()=>{
        socket.on('message',(message)=>{
            setMessages(messages=>[...messages,message])
        })
        socket.on("roomData", ({ users }) => {
            setUsers(users);
          });
    },[ ])

    const sendMessage=(event)=>{
        event.preventDefault()
        if(message){
            socket.emit('sendMessage',message,()=>setMessage(''))
        }
    }
    console.log(message,messages);
    return (
        <div className="outerContainer">
            <div className="container">

                {/* <input 
                value={(message)}
                onChange={(event)=>{setMessage(event.target.value)}}
                onKeyPress={e=>e.key==='Enter'?sendMessage(e):null}/> */}

            <InfoBar room={room} />
            <Messages messages={messages} name={name} />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users}/>
        </div>
    );
}

export default Chat;