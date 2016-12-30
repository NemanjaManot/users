import React from "react";
import BookForm from '../components/BookForm';


export class Books extends React.Component{

    constructor(){
        super();
        this.state = {
            books: []
        };
        this.addNewBook = this.addNewBook.bind(this);
        this.updateBook = this.updateBook.bind(this);

    }

    componentDidMount(){
        this.setState({
            books: [
                {
                    id: 1,
                    title: "Some book",
                    publisher: "Vulkan",
                    year: 2008
                },
                {
                    id: 2,
                    title: "Very gooood book",
                    publisher: "CET",
                    year: 2010
                }
            ],
            lastId: 2
        })
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
            year: this.state.newBookYear,
            id: this.getNewUserId()
        };
        this.state.users.push(newBook);

        this.setState({
            users: this.state.users
        });
    }

    /* ADD INPUT USER (for all inputs) */
    addInput(inputName, e){
        let stateObj = {};
        stateObj[inputName] = e.target.value;
        this.setState(stateObj);
    }

    /* New user ID generate */
    getNewUserId(){
        let lastId = this.state.lastId+1;
        this.setState({
            lastId
        });
        return lastId;
    }

    updateBook(updatedUser, id){
        this.state.books.forEach((user) => {
            if (user.id === id) {
                user.title = this.capitalize(updatedUser.title);
                user.publisher = this.capitalize(updatedUser.publisher);
                user.year = updatedUser.year;
            }
        });
        this.setState({
            users: this.state.books
        })
    }


    render(){

        /* CSS */
        const buttonSort = {
            marginLeft: 8
        };

        let booksList = this.state.books.map((user) => {
            return (
                <BookForm
                    key={user.id}
                    title={user.title}
                    publisher={user.publisher}
                    year={user.year}
                    id={user.id}
                    updateBook={this.updateBook}
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
                                <option value="a">user1</option>
                                <option value="b">user2</option>
                                <option value="c">user3</option>
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
