import React from 'react';
import { render } from 'react-dom';

import { Root } from "./components/Root";
import { Home } from "./components/Home";

//import {Router, Route, browserHistory, IndexRoute} from "react-router";

class App extends React.Component {

    render() {
        return (
            <Root>
                <Home></Home>
            </Root>
         );
    }
}

render(<App />, window.document.getElementById('app'));