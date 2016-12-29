import React from 'react';
import { render } from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from "react-router";

import { Root } from "./components/Root";
import { Home } from "./Pages/Home";
import { Profile } from "./Pages/Profile";

class App extends React.Component {

    render() {
        return (
            <Router history={browserHistory}>
                <Route path={"/"} component={Root}>
                    <IndexRoute component={Home} />
                    <Route path={"home"} component={Home} />
                    <Route path={"profile"} component={Profile} />
                </Route>
            </Router>
         );
    }
}

render(<App />, window.document.getElementById('app'));