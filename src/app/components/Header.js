import React from "react";
import {Link} from "react-router"

export const Header = (props) => {

    const activePage = { background: '#286090', color: 'white'};

    return (
        <nav className="navbar-default">
            <ul className="nav nav-pills">
                <li className="navbar-brand"> LIST OF USERS </li>
                <div className="pull-right nav nav-pills">

                    <li role="presentation">
                        <Link to={"/home"} activeStyle={activePage} >HOME</Link>
                    </li>

                    <li role="presentation">
                        <Link to={"/books"} activeStyle={activePage} >BOOKS</Link>
                    </li>

                </div>
            </ul>
        </nav>
    );
};

