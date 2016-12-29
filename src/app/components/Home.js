import React from "react";
import User from './User';

import UserService from './UserService';

export class Home extends React.Component {

    constructor(){
        super();
        this.state = {
            users: [],
            searchValue: '',
            searchType: 'name'
        };
        this.addNewUser = this.addNewUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.updateUser = this.updateUser.bind(this);

    }

    /* Capitalize first letter */
    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    /*  */
    componentDidMount(){
        UserService.getAllUsers().then(response => {
            this.setState({
                users: response.data
            });
        });
    }

    /* ADD USER BUTTON */
    addNewUser() {
        let newUser = {
            name: this.capitalize(this.state.newUserName),
            lastName: this.capitalize(this.state.newLastName),
            age: this.state.newUserAge
        };
        UserService.addNewUser(newUser).then(response => {
            const addedUser = response.data;
            this.setState({
                users: this.state.users.push(addedUser)
            });
        });
    }

    /* ADD INPUT USER (for all inputs) */
    addInput(inputName, e){
        let stateObj = {};
        stateObj[inputName] = e.target.value;
        this.setState(stateObj);
    }

    /* REMOVE */
    removeUser(id){
        let newState = this.state.users.filter((index) => {
            return index.id !==id;
        });
        UserService.deleteUser(id);
        /* updateovan state posle remove-a korisnika */
        this.setState({
            users: newState
        });
    }

    updateUser(updatedData){
        this.setState(state => {
            for(let i = 0; i < state.users.length; i++){
                if(state.users[i].id === updatedData.id){
                    state.users[i] = updatedData;
                }
            }
        });
    }

    /* Sort by name */

    // sortingAll(sorting){
    //     let stateObj = {};
    //     stateObj[sorting] = this.state.users.sort((a, b) => {
    //         return a.name > b.name;
    //     });
    //     this.setState(stateObj);
    // }

    sortByName(){
       let getSortName = this.state.users.sort((a, b) => {
            return a.name > b.name;
       });

        this.setState({
            users: getSortName
        })
    }

    /* Sort by Last name */
    sortByLastName(){
        let getSortLast = this.state.users.sort((a, b) => {
            return a.lastName > b.lastName;
        });

        this.setState({
            users: getSortLast
        })
    }

    /* Sort by age */
    sortByAge(){
        let getSortAge = this.state.users.sort((a, b) => {
            return a.age < b.age;
        });

        this.setState({
            users: getSortAge
        })
    }

        /* input search */
    updateSearch(e){
        this.setState({
            searchValue: e.target.value
        })
    }

    updateSelectSearch(e) {
        this.setState({
            searchType: e.target.value
        })
    }

    render() {
        const filteredUsers = this.state.users.filter((user) => {
            return user[this.state.searchType].toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;
        });

        let userList = filteredUsers.map((user) => {
            return (
                <User
                    key={user.id}
                    name={user.name}
                    lastName={user.lastName}
                    age={user.age}
                    id={user.id}
                    removeUser={this.removeUser}
                    updateUser={this.updateUser}
                />
            )
        });

        /* CSS */
        const buttonSort = {
            marginLeft: 8
        };

        return (
            <div>
                <h4> Add new user: </h4> <br/>

                <div className="form-horizontal">
                    <div className="form-group">
                        <label htmlFor="inputName" className="col-sm-2 control-label">First name</label>
                        <div className="col-sm-10">
                            <input
                                onChange={this.addInput.bind(this, 'newUserName')}
                                type="text"
                                className="form-control"
                                id="inputName"
                                placeholder="Set name"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputLast" className="col-sm-2 control-label">Last name</label>
                        <div className="col-sm-10">
                            <input
                                onChange={this.addInput.bind(this, 'newLastName')}
                                type="text"
                                className="form-control"
                                id="inputLast"
                                placeholder="Set last name"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAge" className="col-sm-2 control-label">Age</label>
                        <div className="col-sm-10">
                            <input
                                onChange={this.addInput.bind(this, 'newUserAge')}
                                type="number"
                                className="form-control"
                                id="inputAge"
                                placeholder="Set your age"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-primary" onClick={this.addNewUser}>
                                Add
                            </button>
                        </div>
                    </div>
                </div>

                <hr/>

                <div>
                          {/* SEARCH */}
                    <div className="col-xs-5">
                        <div className="form-group">
                            <label htmlFor="selectSearch">Search by (select one):</label>
                            <select
                                className="btn btn-primary"
                                style={buttonSort}
                                id="selectSearch"
                                onChange={this.updateSelectSearch.bind(this)}
                            >
                                <option value="name">Name</option>
                                <option value="lastName">Last name</option>
                                <option value="age">Age</option>
                            </select>
                        </div>

                        <input
                            type="text"
                            id="searchInput"
                            className="form-control"
                            onChange={this.updateSearch.bind(this)}
                        />
                        <br/>
                    </div>

                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>
                                First Name
                                <button
                                    className="btn btn-default glyphicon glyphicon-sort btn btn-default btn-xs"
                                    style={buttonSort}
                                    onClick={this.sortByName.bind(this)}>
                                </button>
                            </th>
                            <th>
                                Last Name
                                <button
                                    className="btn btn-default glyphicon glyphicon-sort btn btn-default btn-xs"
                                    style={buttonSort}
                                    onClick={this.sortByLastName.bind(this)}>
                                </button>
                            </th>
                            <th>
                                Age
                                <button
                                    className="btn btn-default glyphicon glyphicon-sort btn btn-default btn-xs"
                                    style={buttonSort}
                                    onClick={this.sortByAge.bind(this)}>
                                </button>
                            </th>
                            <th>Edit</th>
                            <th>Remove</th>
                        </tr>
                        </thead>
                        <tbody>
                            {userList}
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}
