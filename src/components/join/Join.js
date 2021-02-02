import React, { useState } from 'react';
import { Link } from 'react-router-dom';
require('./join.css')
function Joins(props) {
    const [name,setName]=useState('')
    const [room,setRoom]=useState('')
    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div>Name:-<input placeholdere="Name" value={name} type="text" className="joinInput" onChange={(e)=>setName(e.target.value)} /></div>
                <div>Room Id:<input placeholdere="Room" vlaue={room} type="text" className="joinInput mt-20" onChange={(e)=>setRoom(e.target.value)} /></div>
                <Link onClick={(event)=>(!name || !room)?event.preventDefault():null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">
                        Signin
                    </button>
                </Link>
            </div>
            
        </div>
    );
}

export default Joins;