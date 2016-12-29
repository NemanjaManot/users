import React from "react";

export const Header = (props) => {
    return (
        <nav className="navbar-default">
            <ul className="nav nav-pills">
                <li className="navbar-brand"> LIST OF USERS </li>
                <div className="pull-right nav nav-pills">
                    <li role="presentation"><a href="#">HOME</a></li>
                    <li role="presentation"><a href="#">PROFILE</a></li>
                </div>
            </ul>
        </nav>
    );
}

