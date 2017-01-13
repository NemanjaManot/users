import React from "react";
import UserService from './UserService';
import BookService from './BookService';

class User extends React.Component {

     constructor(){
         super();

         this.state = {
             editing: false,
             books: []
         };
     }

     componentDidMount() {
         this.setState({
             newName: this.props.name,
             newLastName: this.props.lastName,
             newAge: this.props.age
         });

         BookService.getAllBooks().then(response => {
             this.setState({
                 books: response.data
             });
         });
     }

     /* EDIT BUTTON */
     editUsers(){
         this.setState({
             editing: true
         })
     }


     /* SAVE BUTTON */
     saveEditedUser(){
         const updatedUser = {
             id: this.props.id,
             name: this.capitalize(this.state.newName),
             lastName: this.capitalize(this.state.newLastName),
             age: this.state.newAge
         };
         UserService.updateUser(updatedUser).then(response => {
             this.props.updateUser(response.data);
             this.setState({
                 editing: false
             })
         });
     }

     onChangeInput(inputName, e){
         let stateObj = {};
         stateObj[inputName] = e.target.value;
         this.setState(stateObj);
     }

     /* Capitalize first letter */
     capitalize(string) {
         return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
     }

     countBooks(){
         let fil = this.state.books.filter((book) => {
             return book.userId == this.props.id;
         });

         console.log(fil.length);
     }

     /* Render normal */
     renderNormal(){

         let numberOfBooks = this.state.books.filter((book) => {
             return book.userId == this.props.id;
         }).length;

         return (
             <tr>
                 <td>{this.props.name}</td>
                 <td>{this.props.lastName}</td>
                 <td>{numberOfBooks}</td>
                 <td>{this.props.age}</td>
                 <td>
                     <button
                         //onClick={this.editUsers.bind(this)}
                         onClick={this.countBooks.bind(this)}
                         className="btn btn-primary btn-xs"
                     >
                         EDIT
                     </button>
                 </td>
                 <td>
                     <button
                         className="btn btn-danger btn-xs "
                         onClick={this.props.removeUser.bind(this, this.props.id)}
                     >
                         X
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
                     <input
                         name="newText"
                         className="input xs"
                         type="text"
                         defaultValue={this.props.name}
                         onChange={this.onChangeInput.bind(this, 'newName')}
                    />
                 </td>
                 <td>
                     <input
                         className="input xs"
                         type="text"
                         defaultValue={this.props.lastName}
                         onChange={this.onChangeInput.bind(this, 'newLastName')}
                     />
                 </td>
                 <td>
                     <input
                         className="input xs"
                         type="text"
                         id="inputNumberBook"
                         defaultValue={this.props.numberBook}
                         onChange={this.onChangeInput.bind(this, 'newLastName')}
                     />
                 </td>
                 <td>
                     <input
                         className="input xs"
                         type="number"
                         defaultValue={this.props.age}
                         onChange={this.onChangeInput.bind(this, 'newAge')}
                     />
                 </td>

                 <td>
                     <button
                         onClick={this.saveEditedUser.bind(this)}
                         className="btn btn-success btn-xs" >
                         Save
                     </button>
                 </td>
                 <td>

                 </td>
             </tr>

         );
     }

    render() {
        if(this.state.editing){
            return this.renderForm();
        }else {
            return this.renderNormal();
        }
    }
}

export default User;











