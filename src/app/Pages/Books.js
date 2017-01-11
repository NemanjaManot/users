import React from "react";
import BookForm from '../components/BookForm';

import BookService from '../components/BookService';
import UserService from '../components/UserService';



export class Books extends React.Component{

    constructor(){
        super();
        this.state = {
            books: [],
            users: [],
            activeSort: {
                direction: 'desc',
                column: ''
            }
        };
        this.addNewBook = this.addNewBook.bind(this);
        this.updateBook = this.updateBook.bind(this);
        this.removeBook = this.removeBook.bind(this);
    }

    componentDidMount(){
        BookService.getAllBooks().then(response => {
            this.setState({
                books: response.data
            });
        });

        UserService.getAllUsers().then(response => {
            this.setState({
                users: response.data
            });
        });

    }

    /* Capitalize first letter */
    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

        /* ADD new book input */
    addNewBook() {
        let element = document.getElementById("inputTitle");
        let elementValue = Number(element.value);

        let newBook = {
            title: this.capitalize(this.state.newBookTitle),
            publisher: this.capitalize(this.state.newBookPublisher),
            year: this.state.newBookYear,
            userId: elementValue
        };
        BookService.addNewBook(newBook).then(response => {
            const addedBook = response.data;
            this.setState(state => {
                state.books.push(addedBook)
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
    removeBook(id){
        let newState = this.state.books.filter((index) => {
            return index.id !==id;
        });
        BookService.deleteBook(id);
        this.setState({
            books: newState
        });
    }

    updateBook(updatedDataBook){
        this.setState(state => {
            for(let i = 0; i < state.books.length; i++){
                if(state.books[i].id === updatedDataBook.id){
                    state.books[i] = updatedDataBook;
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
        let sorts = this.state.books.sort((a,b) => {
            if(dir == 'asc') {
                return a[thing] < b[thing]
            } else {
                return a[thing] > b[thing]
            }
        });

        this.setState({
            books: sorts,
            activeSort: {
                column: thing,
                direction: dir
            }
        })
    }


    sortingOnlyUser(){
        let dir;
        if('writerName' == this.state.activeSort.column) {
            dir = this.state.activeSort.direction == 'asc' ? 'desc' : 'asc';
        }

        let sortedUserBooks = this.state.books.sort((a, b) => {
            const firstUser = this.state.users.find((user) => {
                return a.userId == user.id
            });
            const secondUser = this.state.users.find((user) => {
                return b.userId == user.id
            });
            if(dir == 'asc') {
                return firstUser.name > secondUser.name;
            } else {
                return firstUser.name < secondUser.name;
            }
        });

        this.setState({
            books: sortedUserBooks,
            activeSort: {
                column: 'writerName',
                direction: dir
            }
        })
    }


    /* Sort by age */
    sortByYear(){
        let dir;
        if('writerAge' == this.state.activeSort.column) {
            dir = this.state.activeSort.direction == 'asc' ? 'desc' : 'asc';
        }

        let getSortYear = this.state.books.sort((a, b) => {
            if(dir == 'asc') {
                return a.year + b.year
            } else {
                return a.year - b.year
            }
        });

        this.setState({
            books: getSortYear,
            activeSort: {
                column: 'writerAge',
                direction: dir
            }
        })
    }



    render(){
        /* CSS */
        const buttonSort = {
            marginLeft: 8
        };

        /* Select user - Users from user-page */
        const options = this.state.users.map((user, index) => {
            return (<option key={index} value={user.id}> {user.name + ' ' + user.lastName} </option>);
        });

        let booksList = this.state.books.map((book) => {
            return (
                <BookForm
                    key={book.id}
                    title={book.title}
                    publisher={book.publisher}
                    year={book.year}
                    id={book.id}
                    userId={book.userId}
                    removeBook={this.removeBook}
                    updateBook={this.updateBook}
                    usersList={this.state.users}
                />
            )
        });


        return (
            <div>
                <h4> Books of users: </h4> <br/>

                <div className="form-horizontal">
                    <div className="form-group">
                        <label htmlFor="inputTitle" className="col-sm-2 control-label">Select User</label>
                        <div className="col-sm-10">
                            <select
                                className="btn btn-default"
                                id="inputTitle"
                            >
                                { options }
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputTitle" className="col-sm-2 control-label">Title</label>
                        <div className="col-sm-10">
                            <input
                                onChange={this.addInput.bind(this, 'newBookTitle')}
                                type="text"
                                className="form-control"
                                id="inputTitle"
                                placeholder="Set title of book"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputPublisher" className="col-sm-2 control-label">Publisher</label>
                        <div className="col-sm-10">
                            <input
                                onChange={this.addInput.bind(this, 'newBookPublisher')}
                                type="text"
                                className="form-control"
                                id="inputPublisher"
                                placeholder="Set publisher of book"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputYear" className="col-sm-2 control-label">Year (published)</label>
                        <div className="col-sm-10">
                            <input
                                onChange={this.addInput.bind(this, 'newBookYear')}
                                type="number"
                                className="form-control"
                                id="inputYear"
                                placeholder="Set year"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-primary" onClick={this.addNewBook}>
                                Add
                            </button>
                        </div>
                    </div>
                </div>

                <hr/>

                <div>
                    <h4> Books: </h4>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>
                                    User
                                    <button
                                        className="btn btn-default glyphicon glyphicon-sort btn btn-default btn-xs"
                                        style={buttonSort}
                                        onClick={this.sortingOnlyUser.bind(this)}
                                        >
                                    </button>
                                </th>
                                <th>
                                    Book
                                    <button
                                        className="btn btn-default glyphicon glyphicon-sort btn btn-default btn-xs"
                                        style={buttonSort}
                                        onClick={this.sorting.bind(this, 'title')}
                                    >
                                    </button>
                                </th>
                                <th>
                                    Publisher
                                    <button
                                        className="btn btn-default glyphicon glyphicon-sort btn btn-default btn-xs"
                                        style={buttonSort}
                                        onClick={this.sorting.bind(this, 'publisher')}
                                    >
                                    </button>
                                </th>
                                <th>
                                    Published
                                    <button
                                        className="btn btn-default glyphicon glyphicon-sort btn btn-default btn-xs"
                                        style={buttonSort}
                                        onClick={this.sortByYear.bind(this)}
                                    >
                                    </button>
                                </th>
                                <th>Edit</th>
                                <th>Remove</th>
                            </tr>
                        </thead>

                        <tbody>
                            {booksList}
                        </tbody>
                    </table>


                </div>

            </div>
        )
    }
}
