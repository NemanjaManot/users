import React from "react";

class BookForm extends React.Component {

    constructor(){
        super();

        this.state = {
            editing: false
        };
    }

    componentDidMount() {
        this.setState({
            newTitle: this.props.title,
            newPublisher: this.props.publisher,
            newYear: this.props.year
        });
    }

    /* EDIT BUTTON */
    editBooks(){
        this.setState({
            editing: true
        })
    }


    /* SAVE BUTTON */
    saveBook(){
        const updatedUser = {
            title: this.state.newTitle,
            publisher: this.state.newPublisher,
            year: this.state.newYear
        };
        this.props.updateBook(updatedUser, this.props.id);

        this.setState({
            editing: false
        })
    }

    onChangeInput(inputName, e){
        let stateObj = {};
        stateObj[inputName] = e.target.value;
        this.setState(stateObj);
    }


    /* Render normal */
    renderNormal(){
        return (
            <tr>
                <td>User...</td>
                <td>{this.props.title}</td>
                <td>{this.props.publisher}</td>
                <td>{this.props.year}</td>
                <td>
                    <button
                        onClick={this.editBooks.bind(this)}
                        className="btn btn-primary btn-xs"
                    >
                        EDIT
                    </button>
                </td>
            </tr>
        );
    }

    /* Render form on EDIT click */
    renderForm(){
        return (
            <tr>
                <td>
                    User...
                </td>
                <td>
                    <input
                        className="input xs"
                        type="text"
                        defaultValue={this.props.title}
                        onChange={this.onChangeInput.bind(this, 'newTitle')}
                    />
                </td>
                <td>
                    <input
                        className="input xs"
                        type="text"
                        defaultValue={this.props.publisher}
                        onChange={this.onChangeInput.bind(this, 'newPublisher')}
                    />
                </td>
                <td>
                    <input
                        className="input xs"
                        type="number"
                        defaultValue={this.props.year}
                        onChange={this.onChangeInput.bind(this, 'newYear')}
                    />
                </td>
                <td>
                    <button
                        onClick={this.saveBook.bind(this)}
                        className="btn btn-success btn-xs" >
                        Save
                    </button>
                </td>
            </tr>

        );
    }

    render() {

        if(this.state.editing){
            return this.renderForm();
        } else {
            return this.renderNormal();
        }
    }
}

export default BookForm;











