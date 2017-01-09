import React from "react";
import BookForm from '../components/BookForm';

import BookService from '../components/BookService';
import UserService from '../components/UserService';



export class Books extends React.Component{

    constructor(){
        super();
        this.state = {
            books: [],
            users: []
        };
        this.addNewBook = this.addNewBook.bind(this);
        this.updateBook = this.updateBook.bind(this);

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
        let newBook = {
            title: this.capitalize(this.state.newBookTitle),
            publisher: this.capitalize(this.state.newBookPublisher),
            year: this.state.newBookYear
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

    updateBook(updatedData){
        this.setState(state => {
            for(let i = 0; i < state.books.length; i++){
                if(state.books[i].id === updatedData.id){
                    state.books[i] = updatedData;
                }
            }
        });
    }



    render(){

        /* CSS */
        const buttonSort = {
            marginLeft: 8
        };

        let booksList = this.state.books.map((book, index) => {
            return (
                <BookForm
                    key={book.id}
                    title={book.title}
                    publisher={book.publisher}
                    year={book.year}
                    id={book.id}
                    updateBook={this.updateBook}
                />
            )
        });

        /* Select user - Users from user-page */
        const options = this.state.users.map((user, index) => {
            return (<option key={index}> {user.name + ' ' + user.lastName} </option>);
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
                                placeholder="Set your age"
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
                                        >
                                    </button>
                                </th>
                                <th>
                                    Book
                                    <button
                                        className="btn btn-default glyphicon glyphicon-sort btn btn-default btn-xs"
                                        style={buttonSort}
                                    >
                                    </button>
                                </th>
                                <th>
                                    Publisher
                                    <button
                                        className="btn btn-default glyphicon glyphicon-sort btn btn-default btn-xs"
                                        style={buttonSort}
                                    >
                                    </button>
                                </th>
                                <th>
                                    Published
                                    <button
                                        className="btn btn-default glyphicon glyphicon-sort btn btn-default btn-xs"
                                        style={buttonSort}
                                    >
                                    </button>
                                </th>
                                <th>Edit</th>
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
