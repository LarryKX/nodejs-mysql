import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Explore from './pages/Explore';
import UserMgmt from './pages/UserMgmt';
import RunSQL from './pages/RunSQL';

import TopBanner from './components/TopBanner';

import './styles/style.less';

class App extends React.Component {
    render() {
        return (
            <div className="main">
                <header>
                    <TopBanner/>
                </header>
                <main>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/home" component={Home}/>
                        <Route path="/explore" component={Explore}/>
                        <Route path="/run_sql" component={RunSQL}/>
                        <Route path="/user" component={UserMgmt}/>
                    </Switch>
                </main>
            </div>
        );
    }
};

class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <p>Dashboard</p>
            </div>
        );
    }
};


// ref https://segmentfault.com/q/1010000009616045/a-1020000009618728
render((
    <BrowserRouter>
        <Route path="/" component={App} />
    </BrowserRouter>
), document.querySelector('#app'));
