import React from 'react';
import {
    Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import history from './pages/history'
import {BindAddr} from './pages/bindAddr'
import Airdrop from './pages/airdrop'
import { IndexRoute } from 'react-router'
class App extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <Router  history={history}>
                <Switch>
                    <Route path="/airdrop" exact component={BindAddr}/>
                    <Route path="/airdrop/activity" component={Airdrop}/>
                    <Redirect to="/airdrop"/>
                </Switch>
            </Router>
           

        );
    }
}
export default App