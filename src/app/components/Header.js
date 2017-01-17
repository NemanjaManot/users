import React from "react";
import {Link} from "react-router"

export const Header = (props) => {

    return (
        <nav className="navbar">
            <ul className="nav nav-pills">
                    <li className="navbar-brand"> Writers and books </li>
                <div className="pull-right nav nav-pills">

                    <li role="presentation">
                        <Link to={"/home"} activeStyle={{ backgroundColor: '#ecf0f1', color: '#646f7f' }}>HOME</Link>
                    </li>

                    <li role="presentation">
                        <Link to={"/books"} activeStyle={{ backgroundColor: '#ecf0f1', color: '#646f7f' }}>BOOKS</Link>
                    </li>

                </div>
            </ul>
        </nav>
    );
};

