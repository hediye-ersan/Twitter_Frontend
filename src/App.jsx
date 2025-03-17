// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Login from './components/Login';
import Tweets from './components/Tweets';
import Register from './components/Register';
import './App.css';

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/tweets" component={Tweets} />
                    <Route path="/" component={Login} exact/>
                </Switch>
            </div>
        </Router>
    );
};

export default App;