import React from 'react';
import { BrowserRouter,Route } from 'react-router-dom';
import Chat from './components/chat/Chat';
import Joins from './components/join/Join';

function App(props) {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Joins}/>
            <Route path="/chat" exact component={Chat}/>
        </BrowserRouter>
    );
}

export default App;