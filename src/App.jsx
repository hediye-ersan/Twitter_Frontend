// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Tweets from './components/Tweets';
import Register from './components/Register';

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/tweets" component={Tweets} />
                    <Route path="/" exact>
                        <h1>Welcome! Please login or signup.</h1>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;