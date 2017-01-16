import React from "react";
import User from '../components/User';

import UserService from '../components/UserService';
import BookService from '../components/BookService';

export class Home extends React.Component {

    constructor(){
        super();
        this.state = {
            users: [],
            books: [],
            searchValue: '',
            searchType: 'name',
            activeSort: {
                direction: 'desc',
                column: ''
            }
        };
        this.addNewUser = this.addNewUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.updateUser = this.updateUser.bind(this);

    }

    /* Capitalize first letter */
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    /*  */
    componentDidMount(){
        UserService.getAllUsers().then(response => {
            this.setState({
                users: response.data
            });
        });

        BookService.getAllBooks().then(response => {
            this.setState({
                books: response.data
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
            this.setState(state => {
                state.users.push(addedUser)
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
    removeUser(userId){
        let message = confirm("If you delete user, you also delete user book(s)!");
        if (message == true) {
            let newStateUser = this.state.users.filter((user) => {
                return user.id != userId;
            });

            this.state.books.forEach((book) => {
                if(book.userId == userId){
                    BookService.deleteBook(book.id);
                }
            });

            UserService.deleteUser(userId);
            /* updateovan state posle remove-a korisnika */
            this.setState({
                users: newStateUser
            });
        }
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


    /* Sorting */
    sorting(thing){
        let dir;
        if(thing == this.state.activeSort.column) {
            dir = this.state.activeSort.direction == 'asc' ? 'desc' : 'asc';
        }
        let sorts = this.state.users.sort((a,b) => {
            if(dir == 'asc') {
                return a[thing] < b[thing]
            } else {
                return a[thing] > b[thing]
            }
        });

        this.setState({
            users: sorts,
            activeSort: {
                column: thing,
                direction: dir
            }
        })
    }

    /* Sort by age */
    sortByAge(){
        let dir;
        if('writerAge' == this.state.activeSort.column) {
            dir = this.state.activeSort.direction == 'asc' ? 'desc' : 'asc';
        }

        let getSortYear = this.state.users.sort((a, b) => {
            if(dir == 'asc') {
                return a.age + b.age
            } else {
                return a.age - b.age
            }
        });

        this.setState({
            users: getSortYear,
            activeSort: {
                column: 'writerAge',
                direction: dir
            }
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
            <div className="homePage col-lg-10 col-lg-offset-1 col-sm-12">
                <div className="form-horizontal ">

                    <div className="description">
                        <h4>Description</h4>
                        <p>
                            This web application is used for adding a writer in list of users/writers,
                            where you can editing existing writer, remove him or adding books for specific writer. <br/>
                            Also, you can sort writers and books or searching them by typing the first few letter.
                        </p>
                    </div>

                    <h4> Add new writer: </h4> <br/>
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
                                className="btn btn-default"
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
                                    onClick={this.sorting.bind(this, 'name')}>
                                </button>
                            </th>
                            <th>
                                Last Name
                                <button
                                    className="btn btn-default glyphicon glyphicon-sort btn btn-default btn-xs"
                                    style={buttonSort}
                                    onClick={this.sorting.bind(this, 'lastName')}>
                                </button>
                            </th>
                            <th>
                                Books
                                <button
                                    className="btn btn-default glyphicon glyphicon-sort btn btn-default btn-xs"
                                    style={buttonSort}
                                    onClick={this.sortByAge.bind(this)}>
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